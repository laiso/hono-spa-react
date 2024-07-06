import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import appCss from "../style.css?url";

export const Route = createRootRoute({
  links: () => [{ rel: "stylesheet", href: appCss }],
  component: () => (
    <div>
      <div id="header" className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <Link
              to="/"
              className="text-white hover:text-blue-400 mx-2 [&.active]:font-bold"
            >
              Hono SPA React
            </Link>
            |
            <Link
              to="/about"
              className="text-white hover:text-blue-400 mx-2 [&.active]:font-bold"
            >
              About
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-4 bg-gray-900 min-h-screen relative">
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
