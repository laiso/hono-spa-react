import { createLazyFileRoute } from "@tanstack/react-router";
import NotionLikeEditor from "@/components/ui/notion-like-editor";

export const Route = createLazyFileRoute("/editor")({
  component: Index,
});

function Index() {
  return (
    <NotionLikeEditor />
  );
}

