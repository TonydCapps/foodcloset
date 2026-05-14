/**
 * APP.JS - Main Application Logic
 * 
 * This file handles:
 * - Initializing the map
 * - Managing search and filters
 * - Displaying resources on the map
 * - Handling user interactions
 * - Adding and editing resources from the page
 */

class FoodClosetApp {
    constructor() {
        // Initialize map centered on Kitsap County, Washington
        this.mapCenter = [47.6269, -122.6334];
        this.map = null;
        this.markers = [];
        this.resources = this.loadResources();
        this.filteredResources = [...this.resources];
        this.isAdmin = this.checkAdminStatus();

        // Initialize the app
        this.init();
    }

    init() {
        this.initializeMap();
        this.setupEventListeners();
        this.updateAdminUI();
        this.renderResources();
        this.addMarkersToMap();
    }

    /**
     * Load resources from localStorage or sample data if none exist
     */
    loadResources() {
        try {
            const stored = window.localStorage.getItem('foodClosetResources');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Unable to load saved resources:', error);
        }
        return resources.map(resource => ({ ...resource }));
    }

    /**
     * Check if user is logged in as admin
     */
    checkAdminStatus() {
        return window.localStorage.getItem('foodClosetAdmin') === 'true';
    }

    /**
     * Update the UI based on admin status
     */
    updateAdminUI() {
        const loginBtn = document.getElementById('showLoginForm');
        const adminControls = document.getElementById('adminControls');

        if (this.isAdmin) {
            loginBtn.textContent = 'Logout';
            adminControls.classList.remove('hidden');
        } else {
            loginBtn.textContent = 'Login';
            adminControls.classList.add('hidden');
        }

        // Re-render resources to show/hide edit buttons
        this.renderResources();
    }

    /**
     * Handle admin login
     */
    handleAdminLogin(password) {
        // Simple password check - change this to your desired password
        if (password === 'admin123') {
            this.isAdmin = true;
            window.localStorage.setItem('foodClosetAdmin', 'true');
            this.updateAdminUI();
            this.closeLoginForm();
            return true;
        }
        return false;
    }

    /**
     * Handle admin logout
     */
    handleAdminLogout() {
        this.isAdmin = false;
        window.localStorage.removeItem('foodClosetAdmin');
        this.updateAdminUI();
        this.closeResourceForm();
        this.closeDetailPopup();
    }

    /**
     * Show the login form
     */
    showLoginForm() {
        document.getElementById('loginForm').classList.remove('hidden');
    }

    /**
     * Close the login form
     */
    closeLoginForm() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('adminPassword').value = '';
    }

    /**
     * Initialize the Leaflet map
     */
    initializeMap() {
        this.map = L.map('map').setView(this.mapCenter, 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(this.map);
    }

    /**
     * Set up event listeners for search, filters, and form actions
     */
    setupEventListeners() {
        document.getElementById('searchInput').addEventListener('input', () => {
            this.applyFilters();
        });

        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        document.getElementById('closePopup').addEventListener('click', () => {
            this.closeDetailPopup();
        });

        const detailPopup = document.getElementById('detailPopup');
        const detailContent = document.getElementById('detailContent');

        detailPopup.addEventListener('click', (e) => {
            if (!detailContent.contains(e.target)) {
                this.closeDetailPopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDetailPopup();
            }
        });

        this.map.on('click', () => {
            this.closeDetailPopup();
        });

        // Admin login/logout events
        document.getElementById('showLoginForm').addEventListener('click', () => {
            if (this.isAdmin) {
                this.handleAdminLogout();
            } else {
                this.showLoginForm();
            }
        });

        document.getElementById('cancelLogin').addEventListener('click', () => {
            this.closeLoginForm();
        });

        document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            if (!this.handleAdminLogin(password)) {
                alert('Incorrect password');
            }
        });

        document.getElementById('showMapView').addEventListener('click', () => {
            this.showMapView();
        });

        document.getElementById('showListView').addEventListener('click', () => {
            this.showListView();
        });

        // Resource form events
        document.getElementById('openAddForm').addEventListener('click', () => {
            this.openResourceForm('add');
        });

        document.getElementById('cancelForm').addEventListener('click', () => {
            this.closeResourceForm();
        });

        document.getElementById('resourceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    /**
     * Handle search functionality and filters together
     */
    applyFilters() {
        const checkedTypes = Array.from(
            document.querySelectorAll('.filter-checkbox:checked')
        ).map(checkbox => checkbox.value);

        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        this.filteredResources = this.resources.filter(resource => {
            const matchesType = checkedTypes.includes(resource.type);
            const matchesSearch = (
                resource.name.toLowerCase().includes(searchTerm) ||
                resource.address.toLowerCase().includes(searchTerm) ||
                resource.description.toLowerCase().includes(searchTerm)
            );
            return matchesType && matchesSearch;
        });

        this.renderResources();
        this.updateMarkersOnMap();
    }

    /**
     * Render the list of resources in the side panel
     */
    renderResources() {
        const listResources = document.getElementById('listResources');
        listResources.innerHTML = '';

        if (this.filteredResources.length === 0) {
            listResources.innerHTML = '<p style="color: #999; text-align: center;">No resources found</p>';
            return;
        }

        this.filteredResources.forEach(resource => {
            listResources.appendChild(this.createResourceListItem(resource));
        });
    }

    /**
     * Create a resource card for the list panel
     */
    createResourceListItem(resource) {
        const typeInfo = resourceTypes[resource.type];
        const container = document.createElement('div');
        container.className = 'resource-card';

        const actionsHtml = this.isAdmin ? `
            <div class="resource-actions">
                <button class="small-btn edit-btn" data-id="${resource.id}">Edit</button>
                <button class="small-btn delete-btn" data-id="${resource.id}">Delete</button>
            </div>
        ` : '';

        const websiteHtml = resource.website ? `
            <a href="${resource.website}" target="_blank" rel="noopener noreferrer" class="resource-link">Visit Website</a>
        ` : '';

        container.innerHTML = `
            <div class="resource-summary">
                <div>
                    <h4>${typeInfo.emoji} ${resource.name}</h4>
                    <p>${resource.address}</p>
                    <span class="resource-type">${typeInfo.label}</span>
                    <p class="resource-description">${resource.description}</p>
                    <div class="resource-extra">
                        <span class="resource-hours">Hours: ${resource.hours}</span>
                        ${websiteHtml}
                    </div>
                </div>
                ${actionsHtml}
            </div>
        `;

        container.addEventListener('click', (event) => {
            if (event.target.closest('.resource-actions')) {
                return;
            }

            this.showResourceDetail(resource);
            this.centerMapOnResource(resource);
            this.openMarkerPopup(resource.id);
        });

        if (this.isAdmin) {
            container.querySelector('.edit-btn').addEventListener('click', () => {
                this.openResourceForm('edit', resource);
            });

            container.querySelector('.delete-btn').addEventListener('click', () => {
                this.deleteResource(resource.id);
            });
        }

        return container;
    }

    /**
     * Add markers to the map for all visible resources
     */
    addMarkersToMap() {
        this.updateMarkersOnMap();
    }

    /**
     * Show the map view and hide the list panel
     */
    showMapView() {
        document.getElementById('listPanel').classList.add('hidden');
        document.getElementById('showMapView').classList.add('active');
        document.getElementById('showListView').classList.remove('active');

        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 200);
        }
    }

    /**
     * Show the list panel next to the map
     */
    showListView() {
        document.getElementById('listPanel').classList.remove('hidden');
        document.getElementById('showMapView').classList.remove('active');
        document.getElementById('showListView').classList.add('active');

        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 200);
        }
    }

    /**
     * Open the popup for the resource marker on the map
     */
    openMarkerPopup(resourceId) {
        const marker = this.markers.find(marker => marker.resourceId === resourceId);
        if (marker) {
            marker.openPopup();
        }
    }

    /**
     * Update markers based on filtered resources
     */
    updateMarkersOnMap() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        this.filteredResources.forEach(resource => {
            const typeInfo = resourceTypes[resource.type];
            const icon = L.divIcon({
                html: `<div style="
                    background: ${typeInfo.color};
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    cursor: pointer;
                ">${typeInfo.emoji}</div>`,
                iconSize: [40, 40],
                className: 'custom-marker'
            });

            const marker = L.marker([resource.latitude, resource.longitude], { icon })
                .bindPopup(this.createPopupContent(resource))
                .addTo(this.map);

            marker.resourceId = resource.id;

            marker.addEventListener('click', () => {
                this.showResourceDetail(resource);
            });

            this.markers.push(marker);
        });
    }

    /**
     * Create HTML content for marker popup
     */
    createPopupContent(resource) {
        return `
            <div class="marker-popup">
                <strong>${resource.name}</strong><br>
                ${resource.address}<br>
                <small>${resource.hours}</small>
                ${resource.website ? `<br><a href="${resource.website}" target="_blank" rel="noopener noreferrer" style="color: #2ecc71;">Website</a>` : ''}
            </div>
        `;
    }

    /**
     * Show detailed information about a resource
     */
    showResourceDetail(resource) {
        const detailContent = document.getElementById('detailContent');
        const typeInfo = resourceTypes[resource.type];

        detailContent.innerHTML = `
            <h2>${typeInfo.emoji} ${resource.name}</h2>
            <div class="detail-section">
                <p>
                    <span class="detail-label">📍 Address:</span><br>
                    <span class="detail-value">${resource.address}</span>
                </p>
            </div>
            <div class="detail-section">
                <p>
                    <span class="detail-label">🕐 Hours:</span><br>
                    <span class="detail-value">${resource.hours}</span>
                </p>
            </div>
            <div class="detail-section">
                <p>
                    <span class="detail-label">📞 Phone:</span><br>
                    <span class="detail-value">
                        <a href="tel:${resource.phone.replace(/\D/g, '')}" style="color: #2ecc71;">
                            ${resource.phone}
                        </a>
                    </span>
                </p>
            </div>
            ${resource.website ? `
            <div class="detail-section">
                <p>
                    <span class="detail-label">🔗 Website:</span><br>
                    <span class="detail-value">
                        <a href="${resource.website}" target="_blank" rel="noopener noreferrer" style="color: #2ecc71;">
                            ${resource.website}
                        </a>
                    </span>
                </p>
            </div>
            ` : ''}
            <div class="detail-section">
                <p>
                    <span class="detail-label">📝 About:</span><br>
                    <span class="detail-value">${resource.description}</span>
                </p>
            </div>
            <div class="detail-section">
                <p>
                    <span class="detail-label">ℹ️ Notes:</span><br>
                    <span class="detail-value">${resource.notes}</span>
                </p>
            </div>
            ${this.isAdmin ? `
            <div class="detail-section detail-actions">
                <button id="editResourceButton" class="small-btn edit-btn">Edit</button>
                <button id="deleteResourceButton" class="small-btn delete-btn">Delete</button>
            </div>
            ` : ''}
            <div class="detail-section">
                <a href="https://www.google.com/maps/search/${encodeURIComponent(resource.address)}" 
                   target="_blank" 
                   style="color: #2ecc71; text-decoration: none; font-weight: bold;">
                   → Get Directions
                </a>
            </div>
        `;

        document.getElementById('detailPopup').classList.remove('hidden');

        if (this.isAdmin) {
            document.getElementById('editResourceButton').addEventListener('click', () => {
                this.openResourceForm('edit', resource);
            });
            document.getElementById('deleteResourceButton').addEventListener('click', () => {
                this.deleteResource(resource.id);
            });
        }
    }

    /**
     * Show the add/edit resource form
     */
    openResourceForm(mode, resource = null) {
        const formTitle = document.getElementById('formTitle');
        formTitle.textContent = mode === 'edit' ? 'Edit Resource' : 'Add Resource';

        if (resource) {
            document.getElementById('resourceId').value = resource.id;
            document.getElementById('resourceType').value = resource.type;
            document.getElementById('resourceName').value = resource.name;
            document.getElementById('resourceAddress').value = resource.address;
            document.getElementById('resourcePhone').value = resource.phone;
            document.getElementById('resourceWebsite').value = resource.website || '';
            document.getElementById('resourceLatitude').value = resource.latitude;
            document.getElementById('resourceLongitude').value = resource.longitude;
            document.getElementById('resourceHours').value = resource.hours;
            document.getElementById('resourceDescription').value = resource.description;
            document.getElementById('resourceNotes').value = resource.notes;
        } else {
            document.getElementById('resourceId').value = '';
            document.getElementById('resourceType').value = 'food-box';
            document.getElementById('resourceName').value = '';
            document.getElementById('resourceAddress').value = '';
            document.getElementById('resourcePhone').value = '';
            document.getElementById('resourceWebsite').value = '';
            document.getElementById('resourceLatitude').value = '';
            document.getElementById('resourceLongitude').value = '';
            document.getElementById('resourceHours').value = '';
            document.getElementById('resourceDescription').value = '';
            document.getElementById('resourceNotes').value = '';
        }

        document.getElementById('resourceFormContainer').classList.remove('hidden');
    }

    /**
     * Close the add/edit form
     */
    closeResourceForm() {
        document.getElementById('resourceFormContainer').classList.add('hidden');
    }

    /**
     * Handle submit from the add/edit form
     */
    handleFormSubmit() {
        const idValue = document.getElementById('resourceId').value;
        const resourceData = {
            id: idValue ? Number(idValue) : this.getNextId(),
            type: document.getElementById('resourceType').value,
            name: document.getElementById('resourceName').value.trim(),
            address: document.getElementById('resourceAddress').value.trim(),
            phone: document.getElementById('resourcePhone').value.trim(),
            website: document.getElementById('resourceWebsite').value.trim(),
            latitude: Number(document.getElementById('resourceLatitude').value),
            longitude: Number(document.getElementById('resourceLongitude').value),
            hours: document.getElementById('resourceHours').value.trim(),
            description: document.getElementById('resourceDescription').value.trim(),
            notes: document.getElementById('resourceNotes').value.trim(),
        };

        const existingIndex = this.resources.findIndex(r => r.id === resourceData.id);
        if (existingIndex >= 0) {
            this.resources[existingIndex] = resourceData;
        } else {
            this.resources.push(resourceData);
        }

        this.saveResources();
        this.applyFilters();
        this.closeResourceForm();
    }

    /**
     * Generate the next available ID for new resources
     */
    getNextId() {
        return this.resources.length > 0
            ? Math.max(...this.resources.map(resource => resource.id)) + 1
            : 1;
    }

    /**
     * Delete a resource from the list
     */
    deleteResource(resourceId) {
        if (!window.confirm('Delete this resource?')) {
            return;
        }

        this.resources = this.resources.filter(resource => resource.id !== resourceId);
        this.saveResources();
        this.applyFilters();
        this.closeDetailPopup();
    }

    /**
     * Close the detail popup
     */
    closeDetailPopup() {
        document.getElementById('detailPopup').classList.add('hidden');
    }

    /**
     * Center map on a specific resource
     */
    centerMapOnResource(resource) {
        this.map.setView([resource.latitude, resource.longitude], 15);
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FoodClosetApp();
});
