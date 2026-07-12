"use client";

import styles from "./ConfidenceMeter.module.css";

export default function ConfidenceMeter({ value = 80 }) {

  return (

    <div className={styles.box}>

      <div
        className={styles.circle}
        style={{
          background: `conic-gradient(#4f8cff ${value * 3.6}deg,#263d56 0deg)`
        }}
      >
        <span>{value}%</span>
      </div>

      <p>Confidence</p>

    </div>

  );
}
