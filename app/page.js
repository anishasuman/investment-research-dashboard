"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";
import ResearchForm from "@/components/forms/ResearchForm";

export default function Home() {
  const mainRef = useRef(null);
  const [pressed, setPressed] = useState(false);

  function setCursorPosition(event) {
    const main = mainRef.current;
    if (!main) return;
    const rect = main.getBoundingClientRect();
    main.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
    main.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
  }

  return (
    <main
      ref={mainRef}
      className={`${styles.main} ${pressed ? styles.pressed : ""}`}
      onPointerMove={setCursorPosition}
      onPointerDown={(event) => { setCursorPosition(event); setPressed(true); }}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <div className={styles.overlay}></div>
      <div className={styles.cursorGlow} aria-hidden="true" />
      <div className={styles.bubbles} aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>

      <section className={styles.hero}>
        <h1>AI Investment Research Dashboard</h1>

        <p>
          Analyze any company using AI, Financial Metrics,
          Market News and Risk Analysis.
        </p>

        <ResearchForm />
      </section>
    </main>
  );
}
