export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: '#F0F4F8',
      100: '#D9E3ED',
      200: '#B3C8DC',
      300: '#85A8C8',
      400: '#5384B1',
      500: '#2D6193',
      600: '#204C77',
      700: '#183B5E',
      800: '#132F4B',
      900: '#0F2A47', // Main Navy
      950: '#081729',
      DEFAULT: '#0F2A47',
    },
    accent: {
      50: '#FCF9F1',
      100: '#F7F1DE',
      200: '#EFE1BC',
      300: '#E5CD95',
      400: '#DAB86C',
      500: '#C9A24B', // Main Gold
      600: '#B08A38',
      700: '#8E6D2B',
      800: '#735726',
      900: '#5F4824',
      DEFAULT: '#C9A24B',
    },
    neutral: {
      background: '#FAFAF8',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      border: '#E8E6E1',
      borderLight: '#F1EFEA',
      muted: '#64748B',
      text: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
    },
    feedback: {
      success: '#16A34A',
      danger: '#DC2626',
      warning: '#F59E0B',
      info: '#0284C7',
    },
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadows: {
    soft: '0 2px 10px -2px rgba(15, 42, 71, 0.05), 0 1px 3px -1px rgba(15, 42, 71, 0.04)',
    card: '0 4px 20px -4px rgba(15, 42, 71, 0.07), 0 2px 6px -2px rgba(15, 42, 71, 0.04)',
    elevated: '0 12px 32px -8px rgba(15, 42, 71, 0.12), 0 4px 12px -2px rgba(15, 42, 71, 0.06)',
  },
  typography: {
    fontFamily: "'Vazirmatn Variable', 'Vazirmatn', system-ui, sans-serif",
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.8',
    },
  },
} as const;
