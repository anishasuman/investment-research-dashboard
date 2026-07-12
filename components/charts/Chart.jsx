"use client";

import styles from "./Chart.module.css";

export default function Chart({ analysis }) {
  const confidence = Number(analysis?.confidence ?? 0);

  return (
    <div className={styles.chart}>

      <h3>AI Confidence Score</h3>

      <div className={styles.progress}>

        <div
          className={styles.fill}
          style={{
            width: `${confidence}%`
          }}
        />

      </div>

      <div className={styles.footer}>

        <span>0%</span>

        <strong>{confidence}%</strong>

        <span>100%</span>

      </div>

    </div>
  );
}