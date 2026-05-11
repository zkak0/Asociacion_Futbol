"use client";

import React, { useState, useMemo } from "react";
import PartidoForm from "../../components/PartidoForm";
import { Modal, ConfirmModal } from "../../components/Modal";
import { formatDateForDisplay } from "../../lib/utils";

export default function PartidosLiguillaSection({ clubs, matches, activeDivision, onSaveMatch, onDeleteMatch, onRegisterResult, onChangeDivision, ALL_DIVISIONES, LIGUILLA_GROUPS }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const divisionMatches = matches.filter((match) => match.division === activeDivision);

  const matchesByJornada = useMemo(() => {
    const groups = {};
    divisionMatches.forEach((match) => {
      const j = match.jornada || "Por programar";
      if (!groups[j]) groups[j] = [];
      groups[j].push(match);
    });
    return Object.entries(groups).sort((a, b) => {
      const na = parseInt(a[0]);
      const nb = parseInt(b[0]);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return String(a[0]).localeCompare(String(b[0]));
    });
  }, [divisionMatches]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Partidos de Liguilla</h2>
        <button
          onClick={() => { setEditingMatch(null); setFormOpen(true); }}
          className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Programar partido de liguilla
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {ALL_DIVISIONES.map((division) => (
          <button
            key={division}
            onClick={() => onChangeDivision(division)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${activeDivision === division ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
          >
            {division}
          </button>
        ))}
      </div>
      <Modal isOpen={formOpen} onClose={() => { setFormOpen(false); setEditingMatch(null); }} title={editingMatch ? "Editar Partido Liguilla" : "Programar Partido Liguilla"}>
        <PartidoForm
          clubs={clubs}
          match={editingMatch}
          onCancel={() => { setFormOpen(false); setEditingMatch(null); }}
          onSave={(m) => { onSaveMatch(m); setFormOpen(false); setEditingMatch(null); }}
          allDivisions={ALL_DIVISIONES}
          liguillaGroups={LIGUILLA_GROUPS}
          isLiguilla
        />
      </Modal>
      <div className="space-y-10">
        {matchesByJornada.length > 0 ? (
          matchesByJornada.map(([jornada, jornadaMatches]) => (
            <div key={jornada} className="space-y-2">
              <div className="px-1 flex items-center gap-2">
                <div className="h-4 w-1 bg-sky-600 rounded-full"></div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm italic">
                  {jornada === "Por programar" ? jornada : `Jornada ${jornada}`}
                </h3>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <table className="min-w-full table-fixed text-left text-[13px] text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <tr>
                      {['Fecha', 'Hora', 'Local', 'Resultado', 'Visitante', 'División', 'Grupo', 'Estado', 'Acciones'].map((text) => (
                        <th key={text} className="px-3 py-2">{text}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jornadaMatches.map((match) => (
                      <tr key={match.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                        <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{formatDateForDisplay(match.fecha)}</td>
                        <td className="px-3 py-2">{match.hora}</td>
                        <td className="px-3 py-2">{match.local}</td>
                        <td className="px-3 py-2">{match.resultado || "-"}</td>
                        <td className="px-3 py-2">{match.visitante}</td>
                        <td className="px-3 py-2">{match.division}</td>
                        <td className="px-3 py-2">{match.grupo}</td>
                        <td className="px-3 py-2">{match.estado}</td>
                        <td className="px-3 py-2 space-x-2 text-right">
                          <button
                            onClick={() => { setEditingMatch(match); setFormOpen(true); }}
                            className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(match.id)}
                            className="rounded-xl bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-slate-500 bg-white shadow-sm rounded-2xl border dark:bg-slate-900 dark:border-slate-700">No hay partidos de liguilla en esta división.</div>
        )}
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeleteMatch(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Partido Liguilla?"
        message="¿Estás seguro de que deseas eliminar este partido de la liguilla?"
      />
    </div>
  );
}
