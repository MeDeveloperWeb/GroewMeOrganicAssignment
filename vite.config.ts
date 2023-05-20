import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import reactRefresh from '@vite/plugin-react-refresh';
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from one level up to handle client-side routing
      allow: ['..'],
    },
  },
});
