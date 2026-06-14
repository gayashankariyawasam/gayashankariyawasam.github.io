"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  Command as CommandIcon,
  Compass,
  CornerDownLeft,
  FileText,
  Layers,
  Mail,
  Newspaper,
  Search,
  Sparkles,
  Terminal,
  TrendingUp,
} from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon, ScholarIcon } from "@/components/ui/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<{ className?: string }>;

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Connect" | "More";
  icon: IconType;
  keywords?: string;
  run: () => void;
};

/** Custom event names so other parts of the app can open these surfaces. */
export const OPEN_PALETTE_EVENT = "cmdk:open";
export const OPEN_TERMINAL_EVENT = "gkos:open";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const goTo = useCallback((hash: string) => {
    setOpen(false);
    // Match the site's anchor-link behaviour (works with the Lenis setup).
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash);
    } else {
      // Section isn't on this page (e.g. /about) — jump to the home anchor.
      window.location.href = `/${hash}`;
    }
  }, []);

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      { id: "top", label: "Top", group: "Navigate", icon: ArrowUp, keywords: "home hero start", run: () => goTo("#top") },
      { id: "about", label: "About", group: "Navigate", icon: Sparkles, keywords: "bio who", run: () => goTo("#about") },
      { id: "experience", label: "Experience", group: "Navigate", icon: TrendingUp, keywords: "career timeline jobs", run: () => goTo("#experience") },
      { id: "work", label: "Selected Work", group: "Navigate", icon: Layers, keywords: "projects portfolio", run: () => goTo("#work") },
      { id: "research", label: "Research & Writing", group: "Navigate", icon: FileText, keywords: "papers ieee publications", run: () => goTo("#research") },
      { id: "stack", label: "Stack", group: "Navigate", icon: Compass, keywords: "tools technologies", run: () => goTo("#stack") },
      { id: "contact", label: "Contact", group: "Navigate", icon: Mail, keywords: "hire email reach talk", run: () => goTo("#contact") },
      { id: "github", label: "GitHub", group: "Connect", icon: GithubIcon, keywords: "code open source repos", run: () => openExternal(profile.socials.github) },
      { id: "linkedin", label: "LinkedIn", group: "Connect", icon: LinkedinIcon, keywords: "connect message dm", run: () => openExternal(profile.socials.linkedin) },
      { id: "scholar", label: "Google Scholar", group: "Connect", icon: ScholarIcon, keywords: "citations research papers", run: () => openExternal(profile.socials.scholar) },
      { id: "newsletter", label: "Newsletter — From Code to AI Strategy", group: "Connect", icon: Newspaper, keywords: "subscribe writing", run: () => openExternal(profile.socials.newsletter) },
      { id: "ieee", label: "IEEE Paper", group: "Connect", icon: FileText, keywords: "publication computer vision", run: () => openExternal(profile.socials.ieee) },
      { id: "terminal", label: "Launch gk-os terminal", group: "More", icon: Terminal, keywords: "konami easter egg shell bash", run: () => { setOpen(false); window.dispatchEvent(new Event(OPEN_TERMINAL_EVENT)); } },
    ],
    [goTo, openExternal]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        (c.keywords?.includes(q) ?? false)
    );
  }, [commands, query]);

  // Open via ⌘K / Ctrl+K, or a custom event from elsewhere (e.g. the navbar).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Reset + lock scroll while open.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      cancelAnimationFrame(id);
    };
  }, [open]);

  // Keep the active row in range as the filtered list changes.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  // Scroll the active row into view within the list.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 p-4 pt-[14vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-bg-2/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Jump to a section, link or command…"
                spellCheck={false}
                autoComplete="off"
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-sm text-text outline-none placeholder:text-text-subtle"
              />
              <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-border bg-surface/60 px-1.5 py-0.5 font-mono text-[10px] text-text-subtle sm:inline-flex">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-text-subtle">
                  No matches for “{query}”.
                </div>
              )}

              {(["Navigate", "Connect", "More"] as const).map((group) => {
                const items = filtered.filter((c) => c.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-subtle">
                      {group}
                    </div>
                    {items.map((c) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const isActive = idx === active;
                      const Icon = c.icon;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          data-idx={idx}
                          onMouseMove={() => setActive(idx)}
                          onClick={() => c.run()}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                            isActive ? "bg-white/8 text-text" : "text-text-muted"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-bg/40 transition-colors",
                              isActive && "border-border-strong text-accent-2"
                            )}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="flex-1 truncate">{c.label}</span>
                          {isActive && (
                            <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-text-subtle" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <CommandIcon className="h-3 w-3" />
                <span className="font-mono">K</span> to toggle
              </span>
              <span className="hidden items-center gap-3 sm:inline-flex">
                <span className="inline-flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  <ArrowUp className="h-3 w-3 rotate-180" /> navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" /> select
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
