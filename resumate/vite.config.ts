import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';

export default defineConfig({
  ...(process.env.VITE_ENV !== 'dev' && { base: "http://10.10.248.116/public/client" }),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    modules: {}
  },
  define: {
    "__REACT_APP_API_URL__": `"${process.env.VITE_REACT_APP_API_URL}"`,
    "__REACT_APP_GOOGLE_CLIENT_ID__": `"${process.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}"`
  }
})
