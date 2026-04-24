import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Stagger index — multiplied by 90ms when set */
  index?: number;
  /** Animation distance variant */
  variant?: "fade" | "up" | "up-sm";
  /** Once visible, stay visible (default true) */
  once?: boolean;
};

/**
 * Subtle scroll-triggered reveal. Respects prefers-reduced-motion: when the
 * user prefers reduced motion, content is shown immediately with no transform.
 */
export function Reveal({
  children,
  as,
  className,
  delay,
  index,
  variant = "up",
  once = true,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, once]);

  const totalDelay = (delay ?? 0) + (index ?? 0) * 90;

  const hiddenStyles =
    variant === "fade"
      ? "opacity-0"
      : variant === "up-sm"
        ? "opacity-0 translate-y-2"
        : "opacity-0 translate-y-4";

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: visible && totalDelay ? `${totalDelay}ms` : undefined }}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-[600ms] motion-safe:ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : hiddenStyles,
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
