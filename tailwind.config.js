module.exports = {
  theme: {
    extend: {
      keyframes: {
        waveBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }, // up 10px
        },
      },
      animation: {
        'wave-bounce': 'waveBounce 2s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {
      animation: ['responsive', 'hover', 'focus', 'group-hover'],
    },
  },
  plugins: [],
};