export const tokens = {
  space: {
    'small-xxs': '2px',
    'small-xs': '4px',
    'small-sm': '8px',
    'small-md': '12px',
    'small-lg': '16px',
    'large-xs': '20px',
    'large-sm': '24px',
    'large-md': '32px',
    'large-lg': '40px',
    'large-xl': '48px',
    'large-xxl': '64px',
  },
  size: {
    'small-xxs': '2px',
    'small-xs': '4px',
    'small-sm': '8px',
    'small-md': '12px',
    'small-lg': '16px',
    'large-xs': '20px',
    'large-sm': '24px',
    'large-md': '32px',
    'large-lg': '40px',
    'large-xl': '48px',
    'large-xxl': '64px',
  },
  emphasis: {
    full: 1,
    high: 0.9,
    medium: 0.6,
    low: 0.3,
    subtle: 0.2,
  },
  elevation: {
    xs: '2px 2px 10px 0px rgba(183, 182, 182, 0.25)',
    sm: '0px 5px 13px 0px rgba(0,0,0,0.1)',
    md: '0px 5px 13px 0px rgba(0,0,0,0.2)',
  },
  radii: { xxs: '4px', xs: '8px', full: '9999px' },
  colors: {
    blue950: '#102640',
    blue600: '#1B91DB',
    blue400: '#56B1E5',
    blue200: '#BDE3F6',
    gray400: '#4A5E74',
    gray200: '#BAC2CC',
    red600: '#E32859',
    red400: '#E66C78',
    red200: '#F4C2C3',
    white: '#fff',
    black: '#000',
  },

  transition: {
    slow: '1s',
    medium: '0.7s',
    fast: '0.4s',
    fastest: '0.2s',
  },
} as const;

export interface CustomTheme {
  tokens: typeof tokens;
}

export const theme: CustomTheme = {
  tokens,
};

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends CustomTheme {}
}
