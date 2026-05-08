"use client";

import React, { useState } from "react";
import PartidoRow from "../../components/PartidoRow";
import PartidoForm from "../../components/PartidoForm";
import { Modal, ConfirmModal } from "../../components/Modal";

export default function CampeonatoSection({ clubs, matches, onSaveMatch, onDeleteMatch, onRegisterResult, onChangeMatchState, ALL_DIVISIONES, LIGUILLA_GROUPS }) {
  const [divisionFilter, setDivisionFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const filteredMatches = matches.filter((match) => !divisionFilter || match.division === divisionFilter);

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
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-[13px] text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {['Fecha', 'Hora', 'Local', 'Resultado', 'Visitante', 'División', 'Estado', 'Acciones'].map((text) => (
                <th key={text} className="px-2 py-2">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMatches.length > 0 ? filteredMatches.map((match) => (
              <PartidoRow
                key={match.id}
                match={match}
                onEdit={() => { setEditingMatch(match); setFormOpen(true); }}
                onDelete={() => setDeleteConfirmId(match.id)}
                onRegisterResult={(id, result) => onRegisterResult(id, result)}
                onChangeState={(id, estado) => onChangeMatchState && onChangeMatchState(id, estado)}
                isLiguilla={false}
              />
            )) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">No hay partidos programados.</td>
              </tr>
            )}
          </tbody>
        </table>
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
