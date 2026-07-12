"use client";

import { useState } from "react";
import styles from "./ProjectMenu.module.css";

const storageKey = "investment-research-dashboard:saved-analysis";

function asText(analysis) {
  const finance = analysis.finance || {};
  const news = (analysis.news || [])
    .map((item) => `- ${item.title} (${item.source || "Unknown source"})`)
    .join("\n");
  const list = (items) =>
    items?.length ? items.map((item) => `- ${item}`).join("\n") : "No data available.";

  return `${analysis.company || "Company"} - Investment Research\n\nRecommendation: ${analysis.recommendation || "N/A"}\nConfidence: ${analysis.confidence ?? "N/A"}%\nRisk Level: ${analysis.riskLevel || "N/A"}\nTarget Price: ${analysis.targetPrice || "N/A"}\nExpected Return: ${analysis.expectedReturn || "N/A"}\nInvestment Horizon: ${analysis.timeHorizon || "N/A"}\n\nSUMMARY\n${analysis.summary || "No summary available."}\n\nFINANCIAL OVERVIEW\nCurrent Price: ${finance.currentPrice || "N/A"}\nMarket Cap: ${finance.marketCap || "N/A"}\nP/E Ratio: ${finance.peRatio || "N/A"}\nEPS: ${finance.eps || "N/A"}\n52 Week High: ${finance.fiftyTwoWeekHigh || "N/A"}\n52 Week Low: ${finance.fiftyTwoWeekLow || "N/A"}\n\nPROS\n${list(analysis.pros)}\n\nCONS\n${list(analysis.cons)}\n\nLATEST NEWS\n${news || "No recent news available."}`;
}

function reportFilename(analysis, extension) {
  const company = (analysis.company || "research")
    .replace(/[^a-z0-9]/gi, "-")
    .toLowerCase();
  return `${company}-research.${extension}`;
}

export default function ProjectMenu({ analysis, onRestore }) {
  const [message, setMessage] = useState("");
  const [hasSavedResearch, setHasSavedResearch] = useState(
    () => typeof window !== "undefined" && Boolean(window.localStorage.getItem(storageKey))
  );

  function unavailable() {
    setMessage("Analyze a company first.");
  }

  function downloadText() {
    if (!analysis) return unavailable();
    const file = new Blob([asText(analysis)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = reportFilename(analysis, "txt");
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Text file downloaded.");
  }

  async function downloadPdf() {
    if (!analysis) return unavailable();

    try {
      setMessage("Preparing PDF report...");
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const margin = 18;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const lineHeight = 5.5;
      let y = margin;

      pdf.setProperties({
        title: `${analysis.company || "Company"} Investment Research`,
        subject: "AI investment research report",
      });
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Investment Research Report", margin, y);
      y += 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      const lines = pdf.splitTextToSize(asText(analysis), contentWidth);
      lines.forEach((line) => {
        if (y > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      });

      pdf.save(reportFilename(analysis, "pdf"));
      setMessage("PDF report downloaded.");
    } catch (error) {
      console.error("PDF download failed:", error);
      setMessage("Unable to create the PDF report. Please try again.");
    }
  }

  function saveResearch() {
    if (!analysis) return unavailable();
    window.localStorage.setItem(storageKey, JSON.stringify(analysis));
    setHasSavedResearch(true);
    setMessage("Research saved on this device.");
  }

  function restoreResearch() {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return setMessage("No saved research found.");
    onRestore(JSON.parse(saved));
    setMessage("Saved research opened.");
  }

  return (
    <details className={styles.menu}>
      <summary className={styles.trigger} aria-label="Open Anisha project menu">
        <span className={styles.avatar}>A</span>
        <span className={styles.identity}><strong>Anisha</strong><small>Research workspace</small></span>
        <span className={styles.chevron}>⌄</span>
      </summary>

      <div className={styles.panel}>
        <p className={styles.title}>Research tools</p>
        <p className={styles.hint}>{analysis ? `${analysis.company} analysis is ready` : "Run an analysis to unlock exports"}</p>
        <button type="button" onClick={downloadPdf}>Download PDF report</button>
        <button type="button" onClick={downloadText}>Download text report</button>
        <button type="button" onClick={saveResearch}>Save to this device</button>
        {hasSavedResearch && <button type="button" onClick={restoreResearch}>Open saved research</button>}
        {message && <p className={styles.message} role="status">{message}</p>}
      </div>
    </details>
  );
}
