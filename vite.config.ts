import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import pages from '@hono/vite-cloudflare-pages'
import { getPlatformProxy } from 'wrangler'
import path from 'path'

const resolve = {
  alias: {
    "@": path.resolve(__dirname, "./app"),
  },
}

export default defineConfig(async ({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        viteReact(),
        TanStackRouterVite({ routesDirectory: 'app/routes', generatedRouteTree: "app/routeTree.gen.ts" })],
      resolve,
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, '/api'),
          }
        },
      },
    }
  } else {
    const isDev = process.env.NODE_ENV === 'development';
    let devServerPlugin;
    if (isDev) {
      const { env, dispose } = await getPlatformProxy();
      devServerPlugin = devServer({
        entry: 'app/api/index.tsx',
        adapter: {
          env,
          onServerClose: dispose
        },
      });
    }

    return {
      plugins: [
        pages({
          entry: ['app/api/index.tsx'],
        }),
        devServerPlugin,
      ],
      resolve,
      server: {
        port: 3000,
      },
    }
  }
})