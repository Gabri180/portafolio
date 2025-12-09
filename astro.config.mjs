import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://Gabri180.github.io',
  base: process.env.NODE_ENV === 'production' ? '/portafolio' : '/',
});
