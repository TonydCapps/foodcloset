import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Flex, Container } from '../UI';
import { MapPin, Users, Settings, LogOut, User } from 'lucide-react';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.gradientSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceLight};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

const Nav = styled.nav`
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    transform: scale(1.05);
    transition: transform ${({ theme }) => theme.animations.fast};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.animations.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.animations.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const Dropdown = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
  min-width: 150px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  opacity: ${({ show }) => show ? 1 : 0};
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};
  transform: translateY(${({ show }) => show ? 0 : -10}px);
  transition: all ${({ theme }) => theme.animations.fast};
  z-index: 1000;
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.animations.fast};

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <HeaderContainer>
      <Container>
        <Nav>
          <Flex justify="between" align="center">
            <Logo to="/">
              <MapPin size={24} />
              Food Closet
            </Logo>

            <NavLinks>
              <NavLink to="/map">
                <MapPin size={16} />
                Map
              </NavLink>
              <NavLink to="/resources">
                <Users size={16} />
                Resources
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/admin">
                  <Settings size={16} />
                  Admin
                </NavLink>
              )}
            </NavLinks>

            <Flex align="center" gap="1rem">
              {isAuthenticated ? (
                <UserMenu>
                  <UserButton onClick={() => setShowDropdown(!showDropdown)}>
                    <User size={16} />
                    {user?.name}
                  </UserButton>
                  <Dropdown show={showDropdown}>
                    <DropdownItem onClick={() => { navigate('/profile'); setShowDropdown(false); }}>
                      <User size={14} />
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      <LogOut size={14} />
                      Logout
                    </DropdownItem>
                  </Dropdown>
                </UserMenu>
              ) : (
                <Button variant="primary" onClick={() => navigate('/login')}>
                  Login
                </Button>
              )}
            </Flex>
          </Flex>
        </Nav>
      </Container>
    </HeaderContainer>
  );
};

export default Header;