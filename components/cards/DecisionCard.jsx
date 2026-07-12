"use client";

import styles from "./DecisionCard.module.css";
import TiltSurface from "../ui/TiltSurface";

export default function DecisionCard({ analysis }) {

    if (!analysis) return null;

    const recommendation = analysis.recommendation?.toLowerCase();

    let color = "#3b82f6";
    let emoji = "📊";

    if (recommendation.includes("strong buy")) {
        color = "#16a34a";
        emoji = "🚀";
    }
    else if (recommendation.includes("buy")) {
        color = "#22c55e";
        emoji = "✅";
    }
    else if (recommendation.includes("hold")) {
        color = "#f59e0b";
        emoji = "⚠️";
    }
    else if (recommendation.includes("sell")) {
        color = "#ef4444";
        emoji = "❌";
    }

    return (

        <TiltSurface
            className={styles.card}
            style={{ borderLeft: `8px solid ${color}` }}
        >

            <div className={styles.header}>

                <h2>
                    {emoji} AI Investment Decision
                </h2>

                <span
                    className={styles.badge}
                    style={{ background: color }}
                >
                    {analysis.recommendation}
                </span>

            </div>

            <div className={styles.body}>

                <div className={styles.item}>
                    <h4>Confidence</h4>
                    <p>{analysis.confidence}%</p>
                </div>

                <div className={styles.item}>
                    <h4>Risk Level</h4>
                    <p>{analysis.riskLevel}</p>
                </div>

                <div className={styles.item}>
                    <h4>Expected Return</h4>
                    <p>{analysis.expectedReturn}</p>
                </div>

                <div className={styles.item}>
                    <h4>Investment Horizon</h4>
                    <p>{analysis.timeHorizon}</p>
                </div>

            </div>

            <div className={styles.summary}>

                <h3>Why?</h3>

                <p>
                    {analysis.summary}
                </p>

            </div>

        </TiltSurface>

    );

}
