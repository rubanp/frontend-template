export default {
  base: './',
  root: './src',
  build: {
    outDir: '../docs/',
  },
  rollupOptions: {
    external: /^lit/,
  },
};
