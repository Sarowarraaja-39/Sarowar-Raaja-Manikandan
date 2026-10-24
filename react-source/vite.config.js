import { defineConfig } from 'vite';
export default defineConfig({base:'./',server:{allowedHosts:['terminal.local']},esbuild:{jsx:'automatic'},build:{chunkSizeWarningLimit:650,rollupOptions:{output:{manualChunks:{react:['react','react-dom']}}}}});
