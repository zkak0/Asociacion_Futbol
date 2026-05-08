"use client";

import React, { useState, useMemo } from "react";
import StandingsTable from "../../components/StandingsTable";

export default function TablasPosicionesSection({ clubs, matches, ALL_DIVISIONES }) {
  const [activeTab, setActiveTab] = useState("General");
  const standingsData = useMemo(() => {
    // calculateStandings is in lib/standings and expected to be called from parent, but we can import here if needed
    // For simplicity, expect parent passed matches and clubs; import calculateStandings locally
    const { calculateStandings } = require("../../lib/standings");
    return calculateStandings(matches, clubs, ALL_DIVISIONES);
  }, [matches, clubs]);

  const currentStandings = activeTab === "General" ? standingsData.general : standingsData.byDivision[activeTab] || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Tablas de Posiciones</h2>
      <div className="flex flex-wrap gap-2">
        {['General', ...ALL_DIVISIONES].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${activeTab === tab ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <StandingsTable standings={currentStandings} title={`Tabla de Posiciones - ${activeTab}`} />
    </div>
  );
}
