"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const HELP = `Available commands:
  about        — who I am
  stack        — what I build with
  contact      — reach out
  github       — open my github
  scholar      — open my google scholar
  clear        — clear the screen
  exit         — close the terminal

Try: type a command and hit enter.`;

type Line = { kind: "out" | "in"; text: string };

export function KonamiTerminal() {
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "gk-os v1.0 — type 'help' to begin." },
  ]);

  const handleCommand = useCallback((cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    setLines((l) => [...l, { kind: "in", text: cmdRaw }]);
    if (!cmd) return;
    let out = "";
    switch (cmd) {
      case "help":
        out = HELP;
        break;
      case "about":
        out =
          "Gayashan Kariyawasam — Tech Lead & AI Engineer at Codegen International. Based in Colombo, Sri Lanka. IEEE-published researcher.";
        break;
      case "stack":
        out =
          "Python · LangChain · OpenAI · Anthropic · FastAPI · Node.js · TypeScript · AWS · Docker · Kubernetes · React · Next.js";
        break;
      case "contact":
        out = "gmkariyawasam@gmail.com";
        break;
      case "github":
        out = "Opening github.com/gayashankariyawasam …";
        window.open("https://github.com/gayashankariyawasam", "_blank");
        break;
      case "scholar":
        out = "Opening Google Scholar …";
        window.open(
          "https://scholar.google.com/citations?user=arKNy4MAAAAJ&hl=en",
          "_blank"
        );
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        setOpen(false);
        return;
      default:
        out = `command not found: ${cmd}. type 'help'.`;
    }
    setLines((l) => [...l, { kind: "out", text: out }]);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const next = [...buffer, e.key].slice(-KONAMI.length);
      setBuffer(next);
      if (next.join(",") === KONAMI.join(",")) {
        setOpen(true);
        setBuffer([]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buffer]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border-strong bg-bg-2 font-mono text-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-xs text-text-subtle">gk-os — bash</span>
            </div>
            <div className="max-h-[60vh] overflow-auto p-4 text-text">
              {lines.map((l, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {l.kind === "in" ? (
                    <span>
                      <span className="text-accent-2">gk@portfolio</span>
                      <span className="text-text-subtle">:~$ </span>
                      {l.text}
                    </span>
                  ) : (
                    <span className="text-text-muted">{l.text}</span>
                  )}
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(input);
                  setInput("");
                }}
                className="mt-2 flex items-center gap-2"
              >
                <span className="text-accent-2">gk@portfolio</span>
                <span className="text-text-subtle">:~$</span>
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-text outline-none"
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
