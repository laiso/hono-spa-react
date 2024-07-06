import { createLazyFileRoute } from "@tanstack/react-router";
import "../style.css";
import NotionLikeEditor from "../components/notion-like-editor";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <NotionLikeEditor />
  );
}
