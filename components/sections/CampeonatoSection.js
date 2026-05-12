"use client";

import React, { useState, useMemo } from "react";
import PartidoForm from "../../components/PartidoForm";
import { Modal, ConfirmModal } from "../../components/Modal";
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatDateForDisplay } from "../../lib/utils";

export default function CampeonatoSection({ clubs, matches, onSaveMatch, onDeleteMatch, onRegisterResult, onChangeMatchState, ALL_DIVISIONES, LIGUILLA_GROUPS }) {
  const [divisionFilter, setDivisionFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [resultValues, setResultValues] = useState({});
  const filteredMatches = matches.filter((match) => !divisionFilter || match.division === divisionFilter);

  const matchesByJornada = useMemo(() => {
    const groups = {};
    filteredMatches.forEach((match) => {
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
  }, [filteredMatches]);

  const handleResultChange = (matchId, value) => {
    setResultValues(prev => ({
      ...prev,
      [matchId]: value
    }));
  };

  const handleRegisterClick = (matchId, originalResult) => {
    const resultToSave = resultValues[matchId] ?? originalResult;
    onRegisterResult(matchId, resultToSave);
  };


  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Campeonato General</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Todas las divisiones</option>
            {ALL_DIVISIONES.map((division) => (
              <option key={division} value={division}>{division}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditingMatch(null);
              setFormOpen(true);
            }}
            className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Programar partido
          </button>
        </div>
      </div>
      <Modal isOpen={formOpen} onClose={() => { setFormOpen(false); setEditingMatch(null); }} title={editingMatch ? "Editar Partido" : "Programar Partido"}>
        <PartidoForm
          clubs={clubs}
          match={editingMatch}
          onCancel={() => { setFormOpen(false); setEditingMatch(null); }}
          onSave={(m) => { onSaveMatch(m); setFormOpen(false); setEditingMatch(null); }}
          allDivisions={ALL_DIVISIONES}
          liguillaGroups={LIGUILLA_GROUPS}
          isLiguilla={false}
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
                      {['Fecha', 'Hora', 'Local', 'Resultado', 'Visitante', 'División', 'Estado', 'Acciones'].map((text) => (
                        <th key={text} className="px-3 py-2">{text}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jornadaMatches.map((match) => (
                      <tr key={match.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                        <td className="px-3 py-2">{formatDateForDisplay(match.fecha)}</td>
                        <td className="px-3 py-2">{match.hora}</td>
                        <td className="px-3 py-2 font-medium text-slate-800 dark:text-slate-200">{match.local}</td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={resultValues[match.id] ?? match.resultado ?? ""}
                            onChange={(e) => handleResultChange(match.id, e.target.value)}
                            className="w-20 rounded-xl border-slate-300 bg-white px-2 py-1 text-center text-sm dark:border-slate-600 dark:bg-slate-800"
                            placeholder="_-_"
                          />
                        </td>
                        <td className="px-3 py-2 font-medium text-slate-800 dark:text-slate-200">{match.visitante}</td>
                        <td className="px-3 py-2">{match.division}</td>
                        <td className="px-3 py-2">
                          <select
                            value={match.estado}
                            onChange={(e) => onChangeMatchState(match.id, e.target.value)}
                            className="w-full rounded-xl border-slate-300 bg-slate-50 px-2 py-1 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Suspendido">Suspendido</option>
                          </select>
                        </td>
                        <td className="px-3 py-2 space-x-1 text-right">
                          <button onClick={() => handleRegisterClick(match.id, match.resultado)} className="rounded-xl bg-sky-100 p-2 text-sky-700 transition hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-200 dark:hover:bg-sky-800">
                            <CheckIcon className="h-4 w-4" />
                            <span className="sr-only">Registrar</span>
                          </button>
                          <button onClick={() => { setEditingMatch(match); setFormOpen(true); }} className="rounded-xl bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </button>
                          <button onClick={() => setDeleteConfirmId(match.id)} className="rounded-xl bg-rose-100 p-2 text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
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
          <div className="p-10 text-center text-slate-500 bg-white shadow-sm rounded-2xl border dark:bg-slate-900 dark:border-slate-700">No hay partidos programados.</div>
        )}
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeleteMatch(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Partido?"
        message="¿Estás seguro de que deseas eliminar este partido programado?"
      />
    </div>
  );
}
