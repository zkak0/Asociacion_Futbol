"use client";

import React, { useMemo } from "react";
import StandingsTable from "../../components/StandingsTable";

export default function TablaLiguillaSection({ clubs, matches, groups, activeGroup, activeDivision, onChangeGroup, onChangeDivision, LIGUILLA_GROUPS, ALL_DIVISIONES }) {
  const standings = useMemo(() => {
    const completed = matches.filter((match) => match.estado === "Completado" && match.grupo);
    const table = {};

    completed.forEach((match) => {
      const winner = match.resultado.split("-").map(Number);
      if (winner.some((n) => Number.isNaN(n))) return;
      const [homeGoals, awayGoals] = winner;
      [match.local, match.visitante].forEach((team) => {
        if (!table[team]) table[team] = { club: team, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dif: 0, pts: 0 };
      });
      const local = table[match.local];
      const visitor = table[match.visitante];
      local.pj += 1;
      visitor.pj += 1;
      local.gf += homeGoals;
      local.gc += awayGoals;
      visitor.gf += awayGoals;
      visitor.gc += homeGoals;
      if (homeGoals > awayGoals) {
        local.pg += 1;
        visitor.pp += 1;
        local.pts += 3;
      } else if (awayGoals > homeGoals) {
        visitor.pg += 1;
        local.pp += 1;
        visitor.pts += 3;
      } else {
        local.pe += 1;
        visitor.pe += 1;
        local.pts += 1;
        visitor.pts += 1;
      }
      local.dif = local.gf - local.gc;
      visitor.dif = visitor.gf - visitor.gc;
    });

    return Object.values(table).sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  }, [matches]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Tabla Liguilla</h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={activeGroup}
            onChange={(e) => onChangeGroup(e.target.value)}
            className="rounded-xl px-3 py-2 text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {LIGUILLA_GROUPS.map((group) => (
              <option key={group} value={group}>Grupo {group}</option>
            ))}
          </select>
          <select
            value={activeDivision}
            onChange={(e) => onChangeDivision(e.target.value)}
            className="rounded-xl px-3 py-2 text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {ALL_DIVISIONES.map((division) => (
              <option key={division} value={division}>{division}</option>
            ))}
          </select>
        </div>
      </div>
      <StandingsTable standings={standings} title={`Tabla Liguilla - Grupo ${activeGroup} - ${activeDivision}`} />
    </div>
  );
}