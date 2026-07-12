"use client";

import styles from "./Chart.module.css";

export default function Chart({ analysis }) {

  return (

    <div className={styles.chart}>

      <h3>Growth Overview</h3>

      <div className={styles.bar}>
        <div
          style={{
            width: analysis.confidence + "%",
          }}
        />
      </div>

      <p>
        AI Confidence Based Investment Score
      </p>

    </div>

  );

}