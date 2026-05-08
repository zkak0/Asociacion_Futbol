import React from 'react';

/**
 * Componente para mostrar una tabla de posiciones.
 * @param {Array} standings - Lista de equipos con sus estadísticas.
 * @param {string} title - Título de la tabla.
 */
export default function StandingsTable({ standings, title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300 table-fixed">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {["POS", "CLUB", "PJ", "PG", "PE", "PP", "GF", "GC", "DIF", "PTS"].map((text) => (
                <th key={text} className="px-1.5 py-2 text-center text-[11px]">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings && standings.length > 0 ? (
              standings.map((team, index) => (
                <tr 
                  key={team.club} 
                  className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <td className="px-3 py-3 text-center font-semibold text-slate-900 dark:text-slate-100">
                    {index + 1}
                  </td>
                  <td className="px-2 py-2 font-medium text-slate-900 dark:text-slate-100 truncate">
                    {team.club}
                  </td>
                  <td className="px-1 py-2 text-center text-xs">{team.pj}</td>
                  <td className="px-1 py-2 text-center text-xs">{team.pg}</td>
                  <td className="px-1 py-2 text-center text-xs">{team.pe}</td>
                  <td className="px-1 py-2 text-center text-xs">{team.pp}</td>
                  <td className="px-1 py-2 text-center text-xs">{team.gf}</td>
                  <td className="px-1 py-2 text-center text-xs">{team.gc}</td>
                  <td className="px-1 py-2 text-center text-xs">{team.dif}</td>
                  <td className="px-1 py-2 text-center font-semibold text-slate-900 dark:text-slate-100 text-xs">
                    {team.pts}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-3 py-4 text-center text-slate-500 dark:text-slate-400">
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
