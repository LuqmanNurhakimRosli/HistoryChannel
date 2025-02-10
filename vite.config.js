import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-toastify'], // Exclude react-toastify from the bundle
      output: {
        manualChunks: {
          // Split libraries into their own chunks
          vendor: ['react', 'react-dom', 'axios'], // Example libraries to chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optionally increase the warning limit
  },
});
