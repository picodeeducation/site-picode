import { useEffect, useState } from "react";

interface TypewriterOnceProps {
  initial: string;
  target: string;
  /** delay before starting deletion (ms) */
  startDelay?: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetween?: number;
  className?: string;
}

/**
 * Deletes `initial` then types `target`. Runs ONCE per mount (per page load).
 */
export function TypewriterOnce({
  initial,
  target,
  startDelay = 1400,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseBetween = 250,
  className,
}: TypewriterOnceProps) {
  const [text, setText] = useState(initial);
  const [phase, setPhase] = useState<"idle" | "deleting" | "pausing" | "typing" | "done">("idle");

  useEffect(() => {
    const t = setTimeout(() => setPhase("deleting"), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("typing"), pauseBetween);
      return () => clearTimeout(t);
    }
    if (phase === "typing") {
      if (text.length < target.length) {
        const t = setTimeout(() => setText(target.slice(0, text.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      }
      setPhase("done");
    }
  }, [phase, text, target, deletingSpeed, typingSpeed, pauseBetween]);

  return (
    <span className={className}>
      {text}
      {phase !== "done" && (
        <span className="tw-cursor" aria-hidden>
          |
        </span>
      )}
      <span className="sr-only">{target}</span>
    </span>
  );
}
