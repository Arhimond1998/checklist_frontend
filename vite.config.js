import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  preview: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 3000
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 3000
    }
  }
});
