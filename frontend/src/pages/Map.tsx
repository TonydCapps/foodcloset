import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Container, Card, Button, Input, Flex, LoadingSpinner } from '../components/UI';
import { Search, Filter, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import axios from 'axios';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different resource types
const createCustomIcon = (type: string, verified: boolean) => {
  const color = type === 'food-box' ? '#00ffff' :
                type === 'meal-site' ? '#ffff00' : '#ff00ff';

  return L.divIcon({
    html: `
      <div style="
        background: ${verified ? color : '#666'};
        border: 2px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ${verified ? 'box-shadow: 0 0 12px ' + color + '80;' : ''}
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface Resource {
  id: string;
  name: string;
  type: 'food-box' | 'meal-site' | 'soup-kitchen';
  address: string;
  phone?: string;
  website?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hours?: string;
  description: string;
  notes?: string;
  verified: boolean;
  averageRating?: number;
}

const MapWrapper = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const Controls = styled(Card)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  min-width: 300px;
  max-width: 400px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FilterSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceLight};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  label {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResourceCard = styled(Card)`
  max-width: 300px;

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ResourceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  div {
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};

    svg {
      color: ${({ theme }) => theme.colors.primary};
      flex-shrink: 0;
      margin-top: 1px;
    }
  }
`;

const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const Map: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    'food-box': true,
    'meal-site': true,
    'soup-kitchen': true,
    verified: false
  });
  const [mapCenter, setMapCenter] = useState<[number, number]>([47.6269, -122.6334]);

  // Load resources
  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await axios.get('/resources');
        setResources(response.data.data);
        setFilteredResources(response.data.data);
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  // Filter resources
  useEffect(() => {
    let filtered = resources.filter(resource => {
      // Type filter
      if (!filters[resource.type]) return false;

      // Verified filter
      if (filters.verified && !resource.verified) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          resource.name.toLowerCase().includes(searchLower) ||
          resource.address.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    setFilteredResources(filtered);
  }, [resources, filters, searchTerm]);

  const handleFilterChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  if (loading) {
    return (
      <Container>
        <Flex justify="center" align="center" style={{ minHeight: '50vh' }}>
          <LoadingSpinner size="40px" />
        </Flex>
      </Container>
    );
  }

  return (
    <Container style={{ position: 'relative', padding: 0 }}>
      <MapWrapper>
        <MapContainer
          center={mapCenter}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController center={mapCenter} />

          {filteredResources.map((resource) => (
            <Marker
              key={resource.id}
              position={[resource.coordinates.latitude, resource.coordinates.longitude]}
              icon={createCustomIcon(resource.type, resource.verified)}
            >
              <Popup>
                <ResourceCard>
                  <h3>{resource.name}</h3>
                  <p>{resource.description}</p>

                  <ResourceInfo>
                    <div>
                      <MapPin size={14} />
                      <span>{resource.address}</span>
                    </div>

                    {resource.phone && (
                      <div>
                        <Phone size={14} />
                        <span>{resource.phone}</span>
                      </div>
                    )}

                    {resource.hours && (
                      <div>
                        <Clock size={14} />
                        <span>{resource.hours}</span>
                      </div>
                    )}

                    {resource.website && (
                      <div>
                        <ExternalLink size={14} />
                        <a href={resource.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </ResourceInfo>

                  {resource.notes && (
                    <p style={{ fontSize: '0.875rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
                      {resource.notes}
                    </p>
                  )}
                </ResourceCard>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <Controls>
          <SearchBar>
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ flex: 1 }}
            />
            <Button variant="ghost">
              <Search size={16} />
            </Button>
          </SearchBar>

          <FilterSection>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
              <Filter size={14} style={{ marginRight: '0.25rem' }} />
              Filter by Type
            </h4>

            <FilterGroup>
              <label>
                <input
                  type="checkbox"
                  checked={filters['food-box']}
                  onChange={(e) => handleFilterChange('food-box', e.target.checked)}
                />
                Food Boxes
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters['meal-site']}
                  onChange={(e) => handleFilterChange('meal-site', e.target.checked)}
                />
                Free Meals
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters['soup-kitchen']}
                  onChange={(e) => handleFilterChange('soup-kitchen', e.target.checked)}
                />
                Soup Kitchens
              </label>
            </FilterGroup>

            <FilterGroup>
              <label>
                <input
                  type="checkbox"
                  checked={filters.verified}
                  onChange={(e) => handleFilterChange('verified', e.target.checked)}
                />
                Verified Only
              </label>
            </FilterGroup>
          </FilterSection>
        </Controls>
      </MapWrapper>
    </Container>
  );
};

export default Map;