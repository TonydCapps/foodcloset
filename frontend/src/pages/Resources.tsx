import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Card, Button, Flex, Grid, LoadingSpinner, Badge } from '../components/UI';
import { MapPin, Phone, Clock, ExternalLink, Star, Filter } from 'lucide-react';
import axios from 'axios';

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

const ResourcesContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const Filters = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FilterButtons = styled(Flex)`
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const ResourceGrid = styled(Grid)`
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ResourceCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.animations.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.5;
  }
`;

const ResourceMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  div {
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};

    svg {
      color: ${({ theme }) => theme.colors.primary};
      flex-shrink: 0;
      margin-top: 1px;
    }

    a {
      color: ${({ theme }) => theme.colors.secondary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ResourceFooter = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceLight};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const getTypeColor = (type: string) => {
  switch (type) {
    case 'food-box': return '#00ffff';
    case 'meal-site': return '#ffff00';
    case 'soup-kitchen': return '#ff00ff';
    default: return '#666';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'food-box': return 'Food Box';
    case 'meal-site': return 'Free Meal';
    case 'soup-kitchen': return 'Soup Kitchen';
    default: return type;
  }
};

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');

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

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(r => r.type === activeFilter));
    }
  }, [resources, activeFilter]);

  const filters = [
    { key: 'all', label: 'All Resources' },
    { key: 'food-box', label: 'Food Boxes' },
    { key: 'meal-site', label: 'Free Meals' },
    { key: 'soup-kitchen', label: 'Soup Kitchens' }
  ];

  if (loading) {
    return (
      <ResourcesContainer>
        <Container>
          <Flex justify="center" align="center" style={{ minHeight: '50vh' }}>
            <LoadingSpinner size="40px" />
          </Flex>
        </Container>
      </ResourcesContainer>
    );
  }

  return (
    <ResourcesContainer>
      <Container>
        <Header
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Food Resources</h1>
          <p>Find food assistance programs, meal sites, and soup kitchens in your area</p>
        </Header>

        <Filters
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FilterButtons>
            {filters.map(filter => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? 'primary' : 'secondary'}
                onClick={() => setActiveFilter(filter.key)}
              >
                <Filter size={16} />
                {filter.label}
              </Button>
            ))}
          </FilterButtons>
        </Filters>

        <ResourceGrid
          columns={{ default: 1, md: 2, lg: 3 }}
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredResources.map((resource, index) => (
            <ResourceCard
              key={resource.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Flex justify="space-between" align="flex-start" style={{ marginBottom: '0.5rem' }}>
                <Badge
                  style={{
                    background: getTypeColor(resource.type),
                    color: '#000',
                    fontSize: '0.75rem'
                  }}
                >
                  {getTypeLabel(resource.type)}
                </Badge>
                {resource.verified && (
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                )}
              </Flex>

              <h3>{resource.name}</h3>
              <p>{resource.description}</p>

              <ResourceMeta>
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
              </ResourceMeta>

              {resource.notes && (
                <p style={{ fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                  {resource.notes}
                </p>
              )}

              <ResourceFooter>
                {resource.averageRating && (
                  <Rating>
                    <Star size={14} fill="currentColor" />
                    <span>{resource.averageRating.toFixed(1)}</span>
                  </Rating>
                )}
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </ResourceFooter>
            </ResourceCard>
          ))}
        </ResourceGrid>

        {filteredResources.length === 0 && (
          <Card style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No resources found</h3>
            <p>Try adjusting your filters or check back later for new resources.</p>
          </Card>
        )}
      </Container>
    </ResourcesContainer>
  );
};

export default Resources;