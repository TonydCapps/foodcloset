import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Card, Button } from '../components/UI';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundContainer = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.surface} 100%);
`;

const NotFoundCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  max-width: 500px;
`;

const ErrorCode = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Container>
        <NotFoundCard
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ErrorCode>404</ErrorCode>

          <Title>Page Not Found</Title>

          <Description>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Description>

          <Actions>
            <Button as={Link} to="/" variant="primary">
              <Home size={18} />
              Go Home
            </Button>

            <Button as={Link} to="/map" variant="secondary">
              <ArrowLeft size={18} />
              View Map
            </Button>
          </Actions>
        </NotFoundCard>
      </Container>
    </NotFoundContainer>
  );
};

export default NotFound;