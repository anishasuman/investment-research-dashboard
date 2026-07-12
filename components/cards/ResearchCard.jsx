"use client";

import styles from "./ResearchCard.module.css";

import RiskMeter from "../ui/RiskMeter";
import ConfidenceMeter from "../ui/ConfidenceMeter";
import Timeline from "../ui/Timeline";
import Chart from "../charts/Chart";
import TiltSurface from "../ui/TiltSurface";

export default function ResearchCard({ analysis }) {
  if (!analysis) return null;

  return (
    <TiltSurface className={styles.card}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>{analysis.company}</h2>

          <span className={styles.recommendation}>
            {analysis.recommendation}
          </span>
        </div>

        <ConfidenceMeter value={analysis.confidence} />
      </div>

      {/* Summary */}
      <p className={styles.summary}>
        {analysis.summary}
      </p>

      {/* Financial Overview */}
      <div className={styles.finance}>

        <h3>Financial Overview</h3>

        <p>
          <strong>Current Price:</strong>{" "}
          {analysis.finance?.currentPrice ?? "N/A"}
        </p>

        <p>
          <strong>Market Cap:</strong>{" "}
          {analysis.finance?.marketCap ?? "N/A"}
        </p>

        <p>
          <strong>P/E Ratio:</strong>{" "}
          {analysis.finance?.peRatio ?? "N/A"}
        </p>

        <p>
          <strong>EPS:</strong>{" "}
          {analysis.finance?.eps ?? "N/A"}
        </p>

        <p>
          <strong>52 Week High:</strong>{" "}
          {analysis.finance?.fiftyTwoWeekHigh ?? "N/A"}
        </p>

        <p>
          <strong>52 Week Low:</strong>{" "}
          {analysis.finance?.fiftyTwoWeekLow ?? "N/A"}
        </p>

      </div>

      {/* News */}
      <div className={styles.news}>

        <h3>Latest News</h3>

        {analysis.news?.length ? (

          <ul>

            {analysis.news.map((item, index) => (

              <li
                key={index}
                className={styles.newsItem}
              >

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsLink}
                >
                  {item.title}
                </a>

                <p className={styles.newsSource}>
                  {item.source} •{" "}
                  {new Date(item.publishedAt).toLocaleDateString()}
                </p>

              </li>

            ))}

          </ul>

        ) : (

          <p>No recent news available.</p>

        )}

      </div>

      {/* Metrics */}
      <div className={styles.grid}>

        <div className={styles.box}>
          <h3>Risk Level</h3>
          <RiskMeter level={analysis.riskLevel} />
        </div>

        <div className={styles.box}>
          <h3>Target Price</h3>
          <h2>{analysis.targetPrice || "N/A"}</h2>
        </div>

        <div className={styles.box}>
          <h3>Expected Return</h3>
          <h2>{analysis.expectedReturn || "N/A"}</h2>
        </div>

        <div className={styles.box}>
          <h3>Investment Horizon</h3>
          <Timeline value={analysis.timeHorizon} />
        </div>

      </div>

      {/* Chart */}
      <Chart analysis={analysis} />

      {/* Pros & Cons */}
      <div className={styles.columns}>

        <div className={styles.listBox}>

          <h3>Pros</h3>

          <ul>

            {analysis.pros?.length ? (

              analysis.pros.map((item, index) => (

                <li key={index}>{item}</li>

              ))

            ) : (

              <li>No data available.</li>

            )}

          </ul>

        </div>

        <div className={styles.listBox}>

          <h3>Cons</h3>

          <ul>

            {analysis.cons?.length ? (

              analysis.cons.map((item, index) => (

                <li key={index}>{item}</li>

              ))

            ) : (

              <li>No data available.</li>

            )}

          </ul>

        </div>

      </div>

    </TiltSurface>
  );
}
