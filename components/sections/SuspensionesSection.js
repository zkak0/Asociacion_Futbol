"use client";

import React, { useState, useMemo } from "react";
import { Modal, ConfirmModal } from "../../components/Modal";
import { formatDateForDisplay, formatDateForInput } from "../../lib/utils";

export default function SuspensionesSection({ 
  players = [], 
  suspensions = [], 
  clubs = [], 
  onSaveSuspension, 
  onDeleteSuspension, 
  ALL_DIVISIONES = [], 
  TIEMPO_UNITS = [] 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editingSuspension, setEditingSuspension] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [form, setForm] = useState({
    playerId: "",
    playerName: "",
    clubName: "",
    division: "",
    fechaInicio: "",
    tipo: "fechas",
    duracionFechas: "",
    duracionTiempoValor: "",
    duracionTiempoUnidad: TIEMPO_UNITS?.[0] || "días",
    motivo: "",
  });

  const filtered = suspensions.filter((s) => {
    const matchesSearch = `${s.playerName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClub = !filterClub || s.clubName === filterClub;
    const matchesStatus = !filterStatus || s.estado === filterStatus;
    return matchesSearch && matchesClub && matchesStatus;
  });

  const suggestions = players.filter((player) => {
    const query = form.playerName.toLowerCase();
    return query.length > 1 && (`${player.nombres} ${player.apellidos}`.toLowerCase().includes(query) || player.cedula.includes(query));
  });

  const openForm = (suspension = null) => {
    if (suspension) {
      setEditingSuspension(suspension);
      setForm({
        playerId: suspension.playerId,
        playerName: suspension.playerName,
        clubName: suspension.clubName,
        division: suspension.division,
        fechaInicio: formatDateForDisplay(suspension.fechaInicio),
        tipo: suspension.tipo,
        duracionFechas: suspension.duracionFechas || "",
        duracionTiempoValor: suspension.duracionTiempo?.valor || "",
        duracionTiempoUnidad: suspension.duracionTiempo?.unidad || TIEMPO_UNITS?.[0] || "días",
        motivo: suspension.motivo,
      });
    } else {
      setEditingSuspension(null);
      setForm({
        playerId: "",
        playerName: "",
        clubName: "",
        division: "",
        fechaInicio: "",
        tipo: "fechas",
        duracionFechas: "",
        duracionTiempoValor: "",
        duracionTiempoUnidad: TIEMPO_UNITS?.[0] || "días",
        motivo: "",
      });
    }
    setFormVisible(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...editingSuspension,
      ...form,
      fechaInicio: formatDateForInput(form.fechaInicio),
      duracionFechas: form.tipo === "fechas" ? Number(form.duracionFechas) : undefined,
      duracionTiempo: form.tipo === "tiempo" ? { valor: Number(form.duracionTiempoValor), unidad: form.duracionTiempoUnidad } : undefined,
      id: editingSuspension?.id || Date.now(),
      estado: editingSuspension?.estado || "Activa",
    };
    onSaveSuspension(payload);
    setFormVisible(false);
    setEditingSuspension(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Suspensiones</h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => openForm()}
          className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Nueva suspensión
        </button>
        <div className="grid gap-2 sm:grid-cols-3">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar jugador"
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <select
            value={filterClub}
            onChange={(e) => setFilterClub(e.target.value)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Todos los clubes</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.nombre}>{club.nombre}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Todos los estados</option>
            <option value="Activa">Activa</option>
            <option value="Cumplida">Cumplida</option>
          </select>
        </div>
      </div>
      <Modal isOpen={formVisible} onClose={() => { setFormVisible(false); setEditingSuspension(null); }} title={editingSuspension ? "Editar Suspensión" : "Nueva Suspensión"}>
        <form onSubmit={handleSave} className="grid gap-3 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Jugador
            <input
              value={form.playerName}
              onChange={(e) => setForm({ ...form, playerName: e.target.value, playerId: "" })}
              placeholder="Buscar nombre o cédula"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            {suggestions.length > 0 && (
              <div className="suggestions-list">
                {suggestions.slice(0, 5).map((player) => (
                  <div
                    key={player.id}
                    className="suggestion-item"
                    onMouseDown={() => setForm({
                      ...form,
                      playerId: player.id,
                      playerName: `${player.nombres} ${player.apellidos}`,
                      clubName: player.club,
                      division: player.division,
                    })}
                  >
                    {player.nombres} {player.apellidos} ({player.cedula})
                  </div>
                ))}
              </div>
            )}
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            División
            <select
              value={form.division}
              onChange={(e) => setForm({ ...form, division: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Seleccionar división</option>
              {ALL_DIVISIONES.map((division) => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </label>
          {/* other fields omitted for brevity */}
        </form>
      </Modal>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {["Jugador", "Club", "División", "Fecha Inicio", "Tipo", "Estado", "Acciones"].map((text) => (
                <th key={text} className="px-3 py-1.5">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map((s) => (
              <tr key={s.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{s.playerName}</td>
                <td className="px-3 py-2">{s.clubName}</td>
                <td className="px-3 py-2">{s.division}</td>
                <td className="px-3 py-2">{formatDateForDisplay(s.fechaInicio)}</td>
                <td className="px-3 py-2">{s.tipo}</td>
                <td className="px-3 py-2">{s.estado}</td>
                <td className="px-3 py-2 space-x-2">
                  <button onClick={() => openForm(s)} className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Editar</button>
                  <button onClick={() => setDeleteConfirmId(s.id)} className="rounded-xl bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800">Eliminar</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">No hay suspensiones registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal isOpen={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} onConfirm={() => { onDeleteSuspension(deleteConfirmId); setDeleteConfirmId(null); }} title="¿Eliminar suspensión?" message="¿Estás seguro?" />
    </div>
  );
}
