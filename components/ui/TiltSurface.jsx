"use client";

import { useRef } from "react";

export default function TiltSurface({ children, className, style }) {
  const surface = useRef(null);

  function moveSurface(event) {
    const element = surface.current;
    if (!element || event.pointerType === "touch") return;

    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    element.style.setProperty("--rotate-x", `${(0.5 - y) * 7}deg`);
    element.style.setProperty("--rotate-y", `${(x - 0.5) * 7}deg`);
    element.style.setProperty("--glow-x", `${x * 100}%`);
    element.style.setProperty("--glow-y", `${y * 100}%`);
  }

  function resetSurface() {
    const element = surface.current;
    if (!element) return;
    element.style.setProperty("--rotate-x", "0deg");
    element.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <div
      ref={surface}
      className={className}
      style={style}
      onPointerMove={moveSurface}
      onPointerLeave={resetSurface}
      onPointerUp={resetSurface}
    >
      <span className="cardShine" aria-hidden="true" />
      {children}
    </div>
  );
}
