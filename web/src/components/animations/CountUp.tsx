"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number;
  offset?: number;
}

export const CountUp = ({ value, duration = 2, offset = 30 }: CountUpProps) => {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
      const suffix = value.replace(/[0-9]/g, "");
      const startValue = Math.max(0, numericValue - offset);

      const controls = animate(startValue, numericValue, {
        duration,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayValue(Math.floor(v) + suffix);
        },
      });

      return () => controls.stop();
    }
  }, [value, isInView, duration, offset]);

  return <span ref={nodeRef}>{displayValue}</span>;
};
