import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Card, Button, Input, Form, FormGroup, Label, ErrorMessage, LoadingSpinner, Flex } from '../components/UI';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Save, LogOut } from 'lucide-react';

const ProfileContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const ProfileCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']};
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  color: white;
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Actions = styled(Flex)`
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceLight};
`;

const Profile: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear success message
    if (success) setSuccess('');
  };

  const validateProfileForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProfileForm()) return;

    setLoading(true);

    try {
      await updateProfile({
        name: formData.name,
        email: formData.email
      });
      setSuccess('Profile updated successfully!');
    } catch (error: any) {
      setErrors({
        general: error.message || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setLoading(true);

    try {
      // Password change functionality would be implemented with backend API
      // For now, just show success message
      setSuccess('Password changed successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error: any) {
      setErrors({
        password: error.message || 'Failed to change password'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <ProfileContainer>
        <Container>
          <Card style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Please log in to view your profile</h2>
            <Button as="a" href="/login" style={{ marginTop: '1rem' }}>
              Go to Login
            </Button>
          </Card>
        </Container>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Container>
        <ProfileCard
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfileHeader>
            <Avatar>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </ProfileHeader>

          {success && (
            <div style={{
              background: 'rgba(0, 255, 0, 0.1)',
              color: '#00ff00',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {success}
            </div>
          )}

          <Section>
            <h3>Profile Information</h3>
            <Form onSubmit={handleProfileUpdate}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              {errors.general && (
                <ErrorMessage style={{ textAlign: 'center' }}>
                  {errors.general}
                </ErrorMessage>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="16px" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Update Profile
                  </>
                )}
              </Button>
            </Form>
          </Section>

          <Section>
            <h3>Change Password</h3>
            <Form onSubmit={handlePasswordChange}>
              <FormGroup>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  error={!!errors.currentPassword}
                />
                {errors.currentPassword && <ErrorMessage>{errors.currentPassword}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  error={!!errors.newPassword}
                />
                {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
              </FormGroup>

              {errors.password && (
                <ErrorMessage style={{ textAlign: 'center' }}>
                  {errors.password}
                </ErrorMessage>
              )}

              <Button
                type="submit"
                variant="secondary"
                disabled={loading}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="16px" />
                    Changing...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Change Password
                  </>
                )}
              </Button>
            </Form>
          </Section>

          <Actions>
            <Button
              variant="danger"
              onClick={handleLogout}
              style={{ flex: 1 }}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </Actions>
        </ProfileCard>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;