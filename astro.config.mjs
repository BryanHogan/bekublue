// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://beku.blue',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap(), svelte()],

  server: {
      host: true
    },

  legacy: {
      collections: true
  },

  adapter: cloudflare()
});