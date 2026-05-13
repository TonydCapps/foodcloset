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
        const adminLogin = document.getElementById('adminLogin');
        const adminControls = document.getElementById('adminControls');

        if (this.isAdmin) {
            adminLogin.classList.add('hidden');
            adminControls.classList.remove('hidden');
        } else {
            adminLogin.classList.remove('hidden');
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

        document.getElementById('detailPopup').addEventListener('click', (e) => {
            if (e.target.id === 'detailPopup') {
                this.closeDetailPopup();
            }
        });

        // Admin login events
        document.getElementById('showLoginForm').addEventListener('click', () => {
            this.showLoginForm();
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

        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleAdminLogout();
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
     * Render the list of resources in the sidebar
     */
    renderResources() {
        const resourcesList = document.getElementById('resourcesList');
        resourcesList.innerHTML = '';

        if (this.filteredResources.length === 0) {
            resourcesList.innerHTML = '<p style="color: #999; text-align: center;">No resources found</p>';
            return;
        }

        this.filteredResources.forEach(resource => {
            const resourceEl = document.createElement('div');
            resourceEl.className = 'resource-item';

            const actionsHtml = this.isAdmin ? `
                <div class="resource-actions">
                    <button class="small-btn edit-btn" data-id="${resource.id}">Edit</button>
                    <button class="small-btn delete-btn" data-id="${resource.id}">Delete</button>
                </div>
            ` : '';

            resourceEl.innerHTML = `
                <div class="resource-summary">
                    <div>
                        <h4>${resourceTypes[resource.type].emoji} ${resource.name}</h4>
                        <p>${resource.address}</p>
                        <span class="resource-type">${resourceTypes[resource.type].label}</span>
                    </div>
                    ${actionsHtml}
                </div>
            `;

            resourceEl.querySelector('.resource-summary').addEventListener('click', (event) => {
                if (event.target.closest('.resource-actions')) {
                    return;
                }
                this.showResourceDetail(resource);
                this.centerMapOnResource(resource);
            });

            if (this.isAdmin) {
                resourceEl.querySelector('.edit-btn').addEventListener('click', () => {
                    this.openResourceForm('edit', resource);
                });

                resourceEl.querySelector('.delete-btn').addEventListener('click', () => {
                    this.deleteResource(resource.id);
                });
            }

            resourcesList.appendChild(resourceEl);
        });
    }

    /**
     * Add markers to the map for all visible resources
     */
    addMarkersToMap() {
        this.updateMarkersOnMap();
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
