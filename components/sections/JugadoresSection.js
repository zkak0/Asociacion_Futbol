"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Modal, ConfirmModal } from "../../components/Modal";
import { formatDateForDisplay, formatDateForInput } from "../../lib/utils";

export default function JugadoresSection({
  clubs = [],
  players = [],
  onSavePlayer,
  onDeletePlayer,
  ALL_DIVISIONES = []
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [clubFilter, setClubFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    fechaNac: "",
    club: "",
    division: "",
    fechaOficio: "",
    fechaIngreso: "",
    estado: "Activo",
  });

  useEffect(() => {
    if (editingPlayer) {
      setForm({
        ...editingPlayer,
        fechaNac: formatDateForDisplay(editingPlayer.fechaNac),
        fechaOficio: editingPlayer.fechaOficio ? formatDateForDisplay(editingPlayer.fechaOficio) : "",
        fechaIngreso: editingPlayer.fechaIngreso ? formatDateForDisplay(editingPlayer.fechaIngreso) : "",
      });
      setIsFormVisible(true);
    }
  }, [editingPlayer]);

  const filtered = useMemo(() => {
    return players.filter((player) => {
      const term = searchTerm.toLowerCase();
      const matchesTerm = [player.nombres, player.apellidos, player.cedula].some((value) => value.toLowerCase().includes(term));
      const matchesClub = !clubFilter || player.club === clubFilter;
      const matchesDivision = !divisionFilter || player.division === divisionFilter;
      return matchesTerm && matchesClub && matchesDivision;
    });
  }, [players, searchTerm, clubFilter, divisionFilter]);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      fechaNac: formatDateForInput(form.fechaNac),
      fechaOficio: form.fechaOficio ? formatDateForInput(form.fechaOficio) : "",
      fechaIngreso: form.fechaIngreso ? formatDateForInput(form.fechaIngreso) : "",
    };
    if (editingPlayer) payload.id = editingPlayer.id;
    payload.id = payload.id || payload.cedula;
    onSavePlayer(payload);
    setEditingPlayer(null);
    setForm({ nombres: "", apellidos: "", cedula: "", fechaNac: "", club: "", division: "", fechaOficio: "", fechaIngreso: "", estado: "Activo" });
    setIsFormVisible(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Gestión de Jugadores</h2>
        <button
          onClick={() => {
            setEditingPlayer(null);
            setForm({ nombres: "", apellidos: "", cedula: "", fechaNac: "", club: "", division: "", fechaOficio: "", fechaIngreso: "", estado: "Activo" });
            setIsFormVisible(true);
          }}
          className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Agregar Jugador
        </button>
      </div>
      <Modal isOpen={isFormVisible} onClose={() => { setIsFormVisible(false); setEditingPlayer(null); }} title={editingPlayer ? "Editar Jugador" : "Agregar Jugador"}>
        <form onSubmit={handleSave} className="grid gap-3 lg:grid-cols-2">
          {[
            { label: "Nombres", name: "nombres" },
            { label: "Apellidos", name: "apellidos" },
            { label: "Cédula", name: "cedula" },
            { label: "Fecha Nacimiento", name: "fechaNac", type: "text", placeholder: "DD-MM-AAAA" },
          ].map((field) => (
            <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {field.label}
              <input
                value={form[field.name] || ""}
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Club
            <select
              value={form.club}
              onChange={(e) => setForm({ ...form, club: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Seleccionar club...</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.nombre}>{club.nombre}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            División
            <select
              value={form.division}
              onChange={(e) => setForm({ ...form, division: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Seleccionar división...</option>
              {ALL_DIVISIONES.map((division) => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </label>
          {[
            { label: "Fecha Oficio Asociación", name: "fechaOficio", placeholder: "DD-MM-AAAA" },
            { label: "Fecha Ingreso Club", name: "fechaIngreso", placeholder: "DD-MM-AAAA" },
          ].map((field) => (
            <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {field.label}
              <input
                value={form[field.name] || ""}
                type="text"
                placeholder={field.placeholder}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 lg:col-span-2">
            Estado
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {["Activo", "Inactivo", "Rechazado"].map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </label>
          <div className="lg:col-span-2 flex flex-wrap gap-3 justify-end pt-3">
            <button
              type="button"
              onClick={() => { setIsFormVisible(false); setEditingPlayer(null); }}
              className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
              {editingPlayer ? "Guardar cambios" : "Agregar jugador"}
            </button>
          </div>
        </form>
      </Modal>
      <div className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o cédula"
              className="w-full rounded-xl border border-slate-300 bg-white/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <select
              value={clubFilter}
              onChange={(e) => setClubFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Todos los clubes</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.nombre}>{club.nombre}</option>
              ))}
            </select>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Todas las divisiones</option>
              {ALL_DIVISIONES.map((division) => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <table className="min-w-full text-left text-[13px] text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                {["Nombres", "Apellidos", "Cédula", "Club", "División", "Fecha Nac.", "Estado", "Acciones"].map((text) => (
                  <th key={text} className="px-2 py-2">{text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((player) => (
                <tr key={player.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                  <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{player.nombres}</td>
                  <td className="px-3 py-2">{player.apellidos}</td>
                  <td className="px-3 py-2">{player.cedula}</td>
                  <td className="px-3 py-2">{player.club}</td>
                  <td className="px-3 py-2">{player.division}</td>
                  <td className="px-3 py-2">{formatDateForDisplay(player.fechaNac)}</td>
                  <td className="px-3 py-2">{player.estado}</td>
                  <td className="px-3 py-2 space-x-2">
                    <button
                      onClick={() => setEditingPlayer(player)}
                      className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(player.id)}
                      className="rounded-xl bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">No se encontraron jugadores.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeletePlayer(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Jugador?"
        message="¿Estás seguro de que deseas eliminar este jugador de los registros?"
      />
    </div>
  );
}
