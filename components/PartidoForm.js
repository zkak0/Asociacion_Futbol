"use client";

import React, { useState } from "react";
import { formatDateForDisplay, formatDateForInput } from "../lib/utils";

export default function PartidoForm({ clubs, match, onCancel, onSave, isLiguilla, allDivisions, liguillaGroups }) {
  const [form, setForm] = useState({
    fecha: match?.fecha ? formatDateForDisplay(match.fecha) : "",
    hora: match?.hora || "",
    local: match?.local || "",
    visitante: match?.visitante || "",
    division: match?.division || "",
    grupo: match?.grupo || (liguillaGroups ? liguillaGroups[0] : "A"),
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
        {match ? `Editar partido${isLiguilla ? " de liguilla" : ""}` : `Programar partido${isLiguilla ? " de liguilla" : ""}`}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...match,
            ...form,
            fecha: formatDateForInput(form.fecha),
            resultado: match?.resultado || "",
            estado: match?.estado || (isLiguilla ? "Pendiente" : "Pendiente"),
          });
        }}
        className="grid gap-3 lg:grid-cols-2"
      >
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Fecha
          <input
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            placeholder="DD-MM-AAAA"
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Hora
          <input
            type="time"
            value={form.hora}
            onChange={(e) => setForm({ ...form, hora: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Local
          <select
            value={form.local}
            onChange={(e) => setForm({ ...form, local: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Seleccionar equipo local</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.nombre}>{club.nombre}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Visitante
          <select
            value={form.visitante}
            onChange={(e) => setForm({ ...form, visitante: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Seleccionar equipo visitante</option>
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
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Seleccionar división</option>
            {(allDivisions || []).map((division) => (
              <option key={division} value={division}>{division}</option>
            ))}
          </select>
        </label>
        {isLiguilla && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 lg:col-span-2">
            Grupo
            <select
              value={form.grupo}
              onChange={(e) => setForm({ ...form, grupo: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {(liguillaGroups || []).map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </label>
        )}
        <div className="lg:col-span-2 flex flex-wrap gap-3 justify-end pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
