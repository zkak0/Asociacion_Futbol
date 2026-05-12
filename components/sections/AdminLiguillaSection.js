"use client";

import React, { useState, useMemo } from "react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Modal, ConfirmModal } from "../../components/Modal";

export default function AdminLiguillaSection({
  liguillaMatches = [],
  clubs = [],
  onSaveMatch,
  onDeleteMatch,
  LIGUILLA_GROUPS = []
}) {
  const [formVisible, setFormVisible] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const matchesByJornada = useMemo(() => {
    const groups = {};
    liguillaMatches.forEach((match) => {
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
  }, [liguillaMatches]);

  const openForm = (match = null) => {
    setEditingMatch(match || {
      local: "",
      visitante: "",
      grupo: LIGUILLA_GROUPS[0] || "",
      jornada: "",
      fecha: "",
      golesLocal: 0,
      golesVisitante: 0,
      estado: "Programado"
    });
    setFormVisible(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...editingMatch,
      id: editingMatch?.id || Date.now(),
      golesLocal: Number(editingMatch.golesLocal || 0),
      golesVisitante: Number(editingMatch.golesVisitante || 0),
    };
    onSaveMatch(payload);
    setFormVisible(false);
    setEditingMatch(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Administrar Liguilla</h2>
        <button onClick={() => openForm()} className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Nuevo partido</button>
      </div>
      <Modal isOpen={formVisible} onClose={() => { setFormVisible(false); setEditingMatch(null); }} title={editingMatch ? "Editar partido de liguilla" : "Nuevo partido de liguilla"}>
        <form onSubmit={handleSave} className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Equipo Local
              <select
                value={editingMatch?.local || ""}
                onChange={(e) => setEditingMatch({ ...editingMatch, local: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                required
              >
                <option value="">Seleccionar...</option>
                {clubs.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Equipo Visitante
              <select
                value={editingMatch?.visitante || ""}
                onChange={(e) => setEditingMatch({ ...editingMatch, visitante: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                required
              >
                <option value="">Seleccionar...</option>
                {clubs.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Goles Local
              <input
                type="number"
                value={editingMatch?.golesLocal ?? 0}
                onChange={(e) => setEditingMatch({ ...editingMatch, golesLocal: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Goles Visitante
              <input
                type="number"
                value={editingMatch?.golesVisitante ?? 0}
                onChange={(e) => setEditingMatch({ ...editingMatch, golesVisitante: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Grupo / Fase
              <select
                value={editingMatch?.grupo || ""}
                onChange={(e) => setEditingMatch({ ...editingMatch, grupo: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="">Seleccionar grupo</option>
                {LIGUILLA_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Jornada
              <input
                value={editingMatch?.jornada || ""}
                onChange={(e) => setEditingMatch({ ...editingMatch, jornada: e.target.value })}
                placeholder="Ej: 1 o Final"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fecha
            <input
              value={editingMatch?.fecha || ""}
              onChange={(e) => setEditingMatch({ ...editingMatch, fecha: e.target.value })}
              placeholder="DD/MM/AAAA"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Estado del Partido
            <select
              value={editingMatch?.estado || "Programado"}
              onChange={(e) => setEditingMatch({ ...editingMatch, estado: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="Programado">Programado</option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Suspendido">Suspendido</option>
            </select>
          </label>

          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => { setFormVisible(false); setEditingMatch(null); }} className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300">Cancelar</button>
            <button className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Guardar</button>
          </div>
        </form>
      </Modal>
      <div className="space-y-6">
        {matchesByJornada.length > 0 ? (
          matchesByJornada.map(([jornada, jornadaMatches]) => (
            <div key={jornada} className="space-y-2">
              <div className="px-1 flex items-center gap-2">
                <div className="h-4 w-1 bg-sky-600 rounded-full"></div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm italic">
                  {jornada === "Por programar" ? jornada : `Jornada ${jornada}`}
                </h3>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <table className="min-w-full table-fixed text-left text-sm text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <tr>
                      {["Fecha", "Partido", "Resultado", "Grupo", "Estado", "Acciones"].map((text) => (
                        <th key={text} className="px-3 py-2">{text}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jornadaMatches.map((m) => (
                      <tr key={m.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                        <td className="px-3 py-2">{m.fecha}</td>
                        <td className="px-3 py-2 font-medium">{m.local} vs {m.visitante}</td>
                        <td className="px-3 py-2 font-bold">{m.golesLocal || 0} - {m.golesVisitante || 0}</td>
                        <td className="px-3 py-2">{m.grupo}</td>
                        <td className="px-3 py-2">{m.estado}</td>
                        <td className="px-3 py-2 space-x-2">
                          <button onClick={() => openForm(m)} className="rounded-xl bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </button>
                          <button onClick={() => setDeleteConfirmId(m.id)} className="rounded-xl bg-rose-100 p-2 text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800">
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
          <div className="p-10 text-center text-slate-500 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            No hay partidos registrados.
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeleteMatch(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Partido?"
        message="¿Estás seguro de que deseas eliminar este partido de liguilla?"
      />
    </div>
  );
}
