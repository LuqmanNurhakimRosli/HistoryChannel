export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split libraries into their own chunks
          vendor: ['react', 'react-dom', 'axios'], // Example libraries to chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optionally increase the warning limit
  },
};