import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import Header from "@/components/ui/header";

import appCss from "../globals.css?url";

export const Route = createRootRoute({
  links: () => [{ rel: "stylesheet", href: appCss }],
  component: () => (
    <div>
      <Header logo="Hono SPA React" />
      <div className="max-w-2xl mx-auto p-4 min-h-screen relative">
        <Outlet />
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            Made by{" "}
            <a
              href="https://github.com/laiso/hono-spa-react"
              className="text-blue-400 hover:underline"
            >
              hono-spa-react
            </a>
          </p>
        </div>
      </footer>
      {import.meta.env.PROD ? null : <TanStackRouterDevtools />}
    </div>
  ),
});
