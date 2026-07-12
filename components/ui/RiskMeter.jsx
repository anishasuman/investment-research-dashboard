"use client";

import styles from "./RiskMeter.module.css";

export default function RiskMeter({ level = "Medium" }) {

  const risk = level.toLowerCase();

  let width = "50%";
  let color = "#f59e0b";

  if (risk.includes("low")) {
    width = "30%";
    color = "#22c55e";
  }

  if (risk.includes("medium")) {
    width = "60%";
    color = "#f59e0b";
  }

  if (risk.includes("high")) {
    width = "100%";
    color = "#ef4444";
  }

  return (
    <div>
      <p>{level}</p>

      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{
            width,
            background: color,
          }}
        />
      </div>
    </div>
  );
}