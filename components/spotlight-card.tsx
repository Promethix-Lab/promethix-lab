"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type SpotlightCardProps = HTMLMotionProps<"div">;

export function SpotlightCard({ className, onMouseMove, ...props }: SpotlightCardProps) {
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    onMouseMove?.(event);
  };

  return (
    <motion.div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      {...props}
    />
  );
}
