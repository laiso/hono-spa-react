import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="py-4">
      <p>
        The purpose of this site is to serve as a repository for my research.
        Please refer to the following GitHub repository for more details.
      </p>
      <a
        href="https://github.com/laiso/hono-spa-react/"
        className="text-blue-400 hover:underline"
      >
        https://github.com/laiso/hono-spa-react/
      </a>
    </div>
  );
}
