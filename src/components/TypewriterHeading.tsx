import { useEffect, useState } from "react";

type Phrase = {
  prefix: string;
  highlight: string;
};

interface TypewriterHeadingProps {
  phrases: Phrase[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}

export function TypewriterHeading({
  phrases,
  typingSpeed = 55,
  deletingSpeed = 28,
  pauseAfterType = 2000,
  pauseAfterDelete = 400,
}: TypewriterHeadingProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "next">("typing");

  const current = phrases[phraseIndex];
  const fullText = current.prefix + current.highlight;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < fullText.length) {
        timeout = setTimeout(() => setCharCount((c) => c + 1), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
      }
    } else if (phase === "deleting") {
      if (charCount > 0) {
        timeout = setTimeout(() => setCharCount((c) => c - 1), deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, charCount, fullText.length, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete, phrases.length]);

  const prefixLen = current.prefix.length;
  const shownPrefix = current.prefix.slice(0, Math.min(charCount, prefixLen));
  const shownHighlight = charCount > prefixLen ? current.highlight.slice(0, charCount - prefixLen) : "";
  const cursorInPrefix = charCount <= prefixLen;

  return (
    <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
      <span className="block">
        {shownPrefix}
        {cursorInPrefix && <span className="tw-cursor" aria-hidden>|</span>}
      </span>
      <span className="block text-gradient-blue min-h-[1.1em]">
        {shownHighlight}
        {!cursorInPrefix && <span className="tw-cursor" aria-hidden>|</span>}
      </span>
      <span className="sr-only">{fullText}</span>
    </h1>
  );
}
