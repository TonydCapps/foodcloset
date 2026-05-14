import styled from 'styled-components';
import { theme } from '../theme';

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all ${theme.animations.fast};
  cursor: pointer;
  min-height: 44px;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.gradient};
          color: ${theme.colors.background};
          border: 2px solid transparent;

          &:hover {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.glow};
          }

          &:active {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};

          &:hover {
            background: ${theme.colors.primary};
            color: ${theme.colors.background};
            box-shadow: ${theme.shadows.glow};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.background};
          border: 2px solid ${theme.colors.error};

          &:hover {
            background: transparent;
            color: ${theme.colors.error};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textSecondary};
          border: 2px solid transparent;

          &:hover {
            color: ${theme.colors.primary};
            background: rgba(0, 255, 255, 0.1);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 2px solid ${({ error }) => error ? theme.colors.error : theme.colors.surfaceLight};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  transition: all ${theme.animations.fast};

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }

  &:hover:not(:focus) {
    border-color: ${theme.colors.primary};
  }
`;

export const TextArea = styled.textarea<{ error?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 2px solid ${({ error }) => error ? theme.colors.error : theme.colors.surfaceLight};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  font-family: ${theme.fonts.primary};
  resize: vertical;
  min-height: 100px;
  transition: all ${theme.animations.fast};

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }

  &:hover:not(:focus) {
    border-color: ${theme.colors.primary};
  }
`;

export const Select = styled.select<{ error?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 2px solid ${({ error }) => error ? theme.colors.error : theme.colors.surfaceLight};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  cursor: pointer;
  transition: all ${theme.animations.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }

  &:hover:not(:focus) {
    border-color: ${theme.colors.primary};
  }

  option {
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
  }
`;

export const Card = styled.div<{ glow?: boolean }>`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.surfaceLight};
  transition: all ${theme.animations.normal};
  position: relative;
  overflow: hidden;

  ${({ glow }) => glow && `
    box-shadow: ${theme.shadows.glow};
    border-color: ${theme.colors.primary};
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary};
  }
`;

export const Container = styled.div<{ maxWidth?: string }>`
  width: 100%;
  max-width: ${({ maxWidth = '1200px' }) => maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.lg};
  }
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'stretch' | 'center' | 'start' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'start' }) => {
    switch (justify) {
      case 'between': return 'space-between';
      case 'around': return 'space-around';
      case 'evenly': return 'space-evenly';
      default: return justify;
    }
  }};
  gap: ${({ gap = theme.spacing.md }) => gap};
  flex-wrap: ${({ wrap = false }) => wrap ? 'wrap' : 'nowrap'};
`;

export const Grid = styled.div<{
  columns?: number;
  gap?: string;
  minWidth?: string;
}>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ gap = theme.spacing.md }) => gap};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  ${({ minWidth }) => minWidth && `
    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
    }
  `}
`;

export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `background: ${theme.colors.primary}; color: ${theme.colors.background};`;
      case 'secondary':
        return `background: ${theme.colors.secondary}; color: ${theme.colors.background};`;
      case 'success':
        return `background: ${theme.colors.success}; color: ${theme.colors.background};`;
      case 'warning':
        return `background: ${theme.colors.warning}; color: ${theme.colors.background};`;
      case 'error':
        return `background: ${theme.colors.error}; color: ${theme.colors.background};`;
    }
  }}
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

export const ModalContent = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin: ${theme.spacing.md};
  max-height: 90vh;
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
`;

export const LoadingSpinner = styled.div<{ size?: string }>`
  width: ${({ size = '20px' }) => size};
  height: ${({ size = '20px' }) => size};
  border: 2px solid ${theme.colors.surfaceLight};
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;