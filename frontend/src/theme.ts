import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    // Futuristic dark theme with neon accents
    primary: '#00ffff', // Cyan
    secondary: '#ff00ff', // Magenta
    accent: '#ffff00', // Yellow
    background: '#0a0a0a', // Very dark
    surface: '#1a1a1a', // Dark gray
    surfaceLight: '#2a2a2a', // Lighter gray
    text: '#ffffff', // White
    textSecondary: '#cccccc', // Light gray
    error: '#ff4444', // Red
    success: '#44ff44', // Green
    warning: '#ffaa00', // Orange

    // Gradients
    gradient: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
    gradientSecondary: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  },

  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 255, 255, 0.1)',
    md: '0 4px 6px -1px rgba(0, 255, 255, 0.1), 0 2px 4px -1px rgba(0, 255, 255, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 255, 255, 0.1), 0 4px 6px -2px rgba(0, 255, 255, 0.1)',
    glow: '0 0 20px rgba(0, 255, 255, 0.3)',
  },

  animations: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.primary};
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${theme.animations.fast};
  }

  input, textarea, select {
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.surfaceLight};
    color: ${theme.colors.text};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    transition: all ${theme.animations.fast};

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: ${theme.shadows.glow};
    }

    &::placeholder {
      color: ${theme.colors.textSecondary};
    }
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.animations.fast};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  // Futuristic glow effects
  .glow {
    box-shadow: ${theme.shadows.glow};
  }

  .glow-hover:hover {
    box-shadow: ${theme.shadows.glow};
    transform: translateY(-2px);
  }

  // Animated background
  .animated-bg {
    background: linear-gradient(-45deg, ${theme.colors.surface}, ${theme.colors.surfaceLight}, ${theme.colors.surface}, ${theme.colors.surfaceLight});
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  // Pulse animation
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  // Slide in animations
  @keyframes slideInUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .slide-in-up {
    animation: slideInUp 0.6s ease-out;
  }

  // Responsive design
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;