import React from 'react';
import styled from 'styled-components';
import { Container, Flex } from '../UI';
import { Heart, GitBranch, Mail } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.lg} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: color ${({ theme }) => theme.animations.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.animations.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceLight};
  padding-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const HeartIcon = styled(Heart)`
  color: ${({ theme }) => theme.colors.error};
  margin: 0 ${({ theme }) => theme.spacing.xs};
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <h3>Food Closet</h3>
            <p>
              Connecting communities with essential food resources through an
              interactive map and comprehensive database.
            </p>
            <p>
              Our mission is to ensure no one in Kitsap County goes hungry by
              providing easy access to food assistance programs.
            </p>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLink href="/map">Interactive Map</FooterLink>
            <FooterLink href="/resources">Resource Directory</FooterLink>
            <FooterLink href="/admin">Admin Portal</FooterLink>
            <FooterLink href="/profile">User Profile</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <p>
              For technical support or to report issues with resource information,
              please contact our support team.
            </p>
            <SocialLinks>
              <SocialLink href="mailto:support@foodcloset.org" aria-label="Email">
                <Mail size={20} />
              </SocialLink>
              <SocialLink href="https://github.com/foodcloset" target="_blank" aria-label="GitHub">
                <GitBranch size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>
            © {currentYear} Food Closet. Made with <HeartIcon size={14} fill="currentColor" /> for the community.
          </p>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;