import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
} from "react";

const MENU_ITEMS = [
  {
    id: "text",
    name: "Text",
    icon: "Aa",
    description: "Just start writing with plain text.",
  },
  {
    id: "page",
    name: "Page",
    icon: "📄",
    description: "Embed a sub-page inside this page.",
  },
  {
    id: "todo",
    name: "To-do list",
    icon: "☐",
    description: "Track tasks with a to-do list.",
  },
  {
    id: "heading1",
    name: "Heading 1",
    icon: "H1",
    description: "Big section heading.",
  },
  {
    id: "heading2",
    name: "Heading 2",
    icon: "H2",
    description: "Medium section heading.",
  },
  {
    id: "heading3",
    name: "Heading 3",
    icon: "H3",
    description: "Small section heading.",
  },
  {
    id: "table",
    name: "Table",
    icon: "▦",
    description: "Add simple tabular content to your page.",
  },
];

interface Block {
  id: number;
  content: string;
  type: string;
}

const NotionLikeEditor = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, content: "", type: "text" },
  ]);
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const refs = useRef<{ [key: number]: HTMLTextAreaElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isComposing = useRef(false);

  useEffect(() => {
    if (focusedId && refs.current[focusedId]) {
      refs.current[focusedId]?.focus();
    }
  }, [focusedId]);

  const handleContentChange = (id: number, content: string) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === id) {
          if (content.endsWith("/") && !isComposing.current) {
            setMenuOpen(true);
          } else if (menuOpen && !content.endsWith("/")) {
            setMenuOpen(false);
          }
          return { ...block, content };
        }
        return block;
      })
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, id: number) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing.current) {
      e.preventDefault();
      if (menuOpen) {
        setMenuOpen(false);
      } else {
        addNewBlock(id);
      }
    } else if (e.key === "Escape" && menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = () => {
    isComposing.current = false;
  };

  const addNewBlock = (id: number) => {
    const newBlock: Block = { id: Date.now(), content: "", type: "text" };
    setBlocks((blocks) => {
      const index = blocks.findIndex((block) => block.id === id);
      return [
        ...blocks.slice(0, index + 1),
        newBlock,
        ...blocks.slice(index + 1),
      ];
    });
    setFocusedId(newBlock.id);
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && e.target === containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const clickY = e.clientY - containerRect.top;

      let closestBlock = blocks[0];
      let minDistance = Infinity;

      blocks.forEach((block) => {
        const blockElement = refs.current[block.id];
        if (blockElement) {
          const blockRect = blockElement.getBoundingClientRect();
          const blockCenterY =
            blockRect.top + blockRect.height / 2 - containerRect.top;
          const distance = Math.abs(clickY - blockCenterY);

          if (distance < minDistance) {
            minDistance = distance;
            closestBlock = block;
          }
        }
      });

      setFocusedId(closestBlock.id);
    }
    setMenuOpen(false);
  };

  const handleMenuItemClick = (item: (typeof MENU_ITEMS)[number]) => {
    console.log(`Selected menu item: ${item.name}`);
    setMenuOpen(false);
  };

  return (
    <div
      className="max-w-2xl mx-auto p-4 bg-gray-900 min-h-screen relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {blocks.map((block, index) => (
        <div key={block.id} className="relative">
          <textarea
            ref={(el) => (refs.current[block.id] = el)}
            className="w-full py-0.5 px-1 resize-none focus:outline-none transition-colors bg-transparent text-white"
            value={block.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleContentChange(block.id, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) =>
              handleKeyDown(e, block.id)
            }
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={
              index === 0 ? "Type '/' for commands" : "Continue typing..."
            }
            rows={1}
            style={{
              minHeight: "1.5rem",
              lineHeight: "1.5rem",
              fontSize: "1rem",
            }}
          />
        </div>
      ))}
      {menuOpen && (
        <div className="absolute top-4 left-4 bg-gray-800 shadow-lg rounded-md border border-gray-700 p-2 z-10 w-64">
          <div className="text-gray-400 text-sm font-semibold mb-2 px-2">
            Basic blocks
          </div>
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex items-start p-2 hover:bg-gray-700 cursor-pointer rounded"
              onClick={() => handleMenuItemClick(item)}
            >
              <span className="mr-2 text-white bg-gray-600 rounded p-1 text-xs">
                {item.icon}
              </span>
              <div>
                <div className="text-white">{item.name}</div>
                <div className="text-gray-400 text-xs">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotionLikeEditor;
