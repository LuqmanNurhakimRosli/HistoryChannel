import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'react-toastify'], // Bundle libraries with the app
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
  },
});
