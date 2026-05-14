import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Card, Button, Flex, Grid, LoadingSpinner } from '../components/UI';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  MapPin,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Admin sub-pages
const AdminResources = () => <div>Resources Management</div>;
const AdminUsers = () => <div>Users Management</div>;
const AdminSettings = () => <div>Settings</div>;

const AdminContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const AdminLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled(Card)`
  height: fit-content;
  position: sticky;
  top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: 1024px) {
    position: static;
  }
`;

const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SidebarLink = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text};
  background: ${({ theme, active }) => active ? 'rgba(0, 255, 255, 0.1)' : 'transparent'};
  transition: all ${({ theme }) => theme.animations.fast};
  font-weight: 500;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }

  svg {
    color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  }
`;

const Content = styled.div`
  min-height: 500px;
`;

const StatsGrid = styled(Grid)`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return (
      <AdminContainer>
        <Container>
          <Card style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Access Denied</h2>
            <p>You don't have permission to access the admin panel.</p>
            <Button as={Link} to="/" style={{ marginTop: '1rem' }}>
              Go Home
            </Button>
          </Card>
        </Container>
      </AdminContainer>
    );
  }

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AdminContainer>
      <Container>
        <AdminLayout>
          <Sidebar
            as={motion.div}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SidebarTitle>Admin Panel</SidebarTitle>
            <SidebarNav>
              <SidebarLink to="/admin" active={isActive('/admin')}>
                <BarChart3 size={18} />
                Dashboard
              </SidebarLink>
              <SidebarLink to="/admin/resources" active={isActive('/admin/resources')}>
                <MapPin size={18} />
                Resources
              </SidebarLink>
              <SidebarLink to="/admin/users" active={isActive('/admin/users')}>
                <Users size={18} />
                Users
              </SidebarLink>
              <SidebarLink to="/admin/settings" active={isActive('/admin/settings')}>
                <Settings size={18} />
                Settings
              </SidebarLink>
            </SidebarNav>
          </Sidebar>

          <Content>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/resources" element={<AdminResources />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/settings" element={<AdminSettings />} />
            </Routes>
          </Content>
        </AdminLayout>
      </Container>
    </AdminContainer>
  );
};

// Dashboard Component
const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalResources: 0,
    totalUsers: 0,
    verifiedResources: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setStats({
        totalResources: 42,
        totalUsers: 156,
        verifiedResources: 38,
        activeUsers: 142
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '300px' }}>
        <LoadingSpinner size="40px" />
      </Flex>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>
        Admin Dashboard
      </h1>

      <StatsGrid columns={4}>
        <StatCard>
          <MapPin size={32} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
          <h3>{stats.totalResources}</h3>
          <p>Total Resources</p>
        </StatCard>

        <StatCard>
          <CheckCircle size={32} style={{ marginBottom: '1rem', color: 'var(--success)' }} />
          <h3>{stats.verifiedResources}</h3>
          <p>Verified Resources</p>
        </StatCard>

        <StatCard>
          <Users size={32} style={{ marginBottom: '1rem', color: 'var(--secondary)' }} />
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </StatCard>

        <StatCard>
          <BarChart3 size={32} style={{ marginBottom: '1rem', color: 'var(--accent)' }} />
          <h3>{stats.activeUsers}</h3>
          <p>Active Users</p>
        </StatCard>
      </StatsGrid>

      <Grid columns={2} gap="2rem">
        <Card>
          <h3 style={{ marginBottom: '1rem' }}>Recent Activity</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Recent resource updates and user activities will appear here.
          </p>
        </Card>

        <Card>
          <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
          <Flex direction="column" gap="0.5rem">
            <Button variant="primary" as={Link} to="/admin/resources">
              <Plus size={16} />
              Add Resource
            </Button>
            <Button variant="secondary" as={Link} to="/admin/users">
              <Users size={16} />
              Manage Users
            </Button>
          </Flex>
        </Card>
      </Grid>
    </motion.div>
  );
};

export default Admin;