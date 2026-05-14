import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Button, Flex, Card, Grid } from '../components/UI';
import { MapPin, Users, Shield, Zap, Search, Heart } from 'lucide-react';

const Hero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.surface} 100%);
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.6;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Features = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 700;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const Stats = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ theme }) => theme.colors.gradientSecondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

const CTA = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: ${({ theme }) => theme.colors.background};
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CTAText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: 0.9;
`;

const Home: React.FC = () => {
  return (
    <>
      <Hero>
        <Container>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Find Food Resources Near You
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover food banks, meal sites, and soup kitchens in Kitsap County
              through our interactive map and comprehensive resource database.
            </HeroSubtitle>
            <HeroButtons
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button variant="primary" as={Link} to="/map">
                <MapPin size={18} />
                Explore Map
              </Button>
              <Button variant="secondary" as={Link} to="/resources">
                <Search size={18} />
                Browse Resources
              </Button>
            </HeroButtons>
          </HeroContent>
        </Container>
      </Hero>

      <Features>
        <Container>
          <SectionTitle>Why Choose Food Closet?</SectionTitle>
          <Grid columns={3} gap="2rem">
            <FeatureCard
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <MapPin size={48} />
              <h3>Interactive Map</h3>
              <p>
                Navigate through Kitsap County with our intuitive map interface.
                Find resources instantly with real-time location data.
              </p>
            </FeatureCard>

            <FeatureCard
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Users size={48} />
              <h3>Community Driven</h3>
              <p>
                Powered by community contributions and verified by local experts.
                Stay updated with the latest resource information.
              </p>
            </FeatureCard>

            <FeatureCard
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Shield size={48} />
              <h3>Verified & Secure</h3>
              <p>
                All resources are verified for accuracy and safety.
                Your data is protected with enterprise-grade security.
              </p>
            </FeatureCard>
          </Grid>
        </Container>
      </Features>

      <Stats>
        <Container>
          <StatsGrid>
            <StatItem>
              <h3>50+</h3>
              <p>Food Resources</p>
            </StatItem>
            <StatItem>
              <h3>24/7</h3>
              <p>Access Available</p>
            </StatItem>
            <StatItem>
              <h3>100%</h3>
              <p>Free to Use</p>
            </StatItem>
            <StatItem>
              <h3>99.9%</h3>
              <p>Uptime</p>
            </StatItem>
          </StatsGrid>
        </Container>
      </Stats>

      <CTA>
        <Container>
          <CTATitle>Join Our Mission</CTATitle>
          <CTAText>
            Help us build a hunger-free community. Whether you're seeking resources
            or want to contribute information, we're here to help.
          </CTAText>
          <Flex justify="center" gap="1rem" wrap>
            <Button variant="secondary" as={Link} to="/resources">
              <Heart size={18} />
              Get Help
            </Button>
            <Button variant="ghost" as={Link} to="/admin">
              <Zap size={18} />
              Contribute
            </Button>
          </Flex>
        </Container>
      </CTA>
    </>
  );
};

export default Home;