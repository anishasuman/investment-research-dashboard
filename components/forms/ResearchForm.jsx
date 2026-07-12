"use client";

import { useState } from "react";

import styles from "./ResearchForm.module.css";

import ResearchCard from "../cards/ResearchCard";
import DecisionCard from "../cards/DecisionCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";
import ProjectMenu from "../ui/ProjectMenu";

export default function ResearchForm() {

  const [company, setCompany] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    if (!company.trim()) {

      setError("Please enter a company name.");

      return;

    }

    setLoading(true);

    setError("");

    setAnalysis(null);

    try {

      const response = await fetch("/api/analyze", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          company
        })

      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(data.error || "Analysis Failed");

      }

      setAnalysis(data);

    }

    catch(err){

      setError(err.message);

    }

    finally{

      setLoading(false);

    }

  }

  return (

    <div className={styles.container}>
      <ProjectMenu analysis={analysis} onRestore={setAnalysis} />

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        <input

          type="text"

          placeholder="Enter Company Name (Apple, Tesla, Microsoft...)"

          value={company}

          onChange={(e)=>setCompany(e.target.value)}

          className={styles.input}

        />

        <button

          type="submit"

          className={styles.button}

        >

          Analyze

        </button>

      </form>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {analysis && (

        <>

          <ResearchCard analysis={analysis} />

          <DecisionCard analysis={analysis} />

        </>

      )}

    </div>

  );

}
