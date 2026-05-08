"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "../../components/Modal";

export default function AsociacionSection({ details, onSave }) {
  const [form, setForm] = useState(details);

  useEffect(() => {
    setForm(details);
  }, [details]);

  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, logoUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Datos de la Asociación</h2>
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {[
            { label: "Nombre", name: "nombre" },
            { label: "Email institucional", name: "email", type: "email" },
            { label: "Presidente", name: "presidente" },
            { label: "Secretario", name: "secretario" },
            { label: "Tesorero", name: "tesorero" },
            { label: "Director 1", name: "director1" },
            { label: "Director 2", name: "director2" },
            { label: "Director 3", name: "director3" },
          ].map((field) => (
            <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {field.label}
              <input
                value={form[field.name] || ""}
                type={field.type || "text"}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Logo URL
            <input
              value={form.logoUrl || ""}
              type="text"
              placeholder="https://..."
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Logo archivo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoFileChange}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none file:border-0 file:bg-slate-200 file:px-2 file:py-1 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sube un archivo o deja la URL para usar un logo externo.</p>
          </label>
          <button
            onClick={() => onSave(form)}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Guardar cambios
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">Vista previa del logo institucional</p>
          <img
            src={form.logoUrl}
            alt="Logo Asociación"
            className="mx-auto h-52 w-auto rounded-3xl bg-slate-100 p-4 object-contain dark:bg-slate-800"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/240x240/cccccc/ffffff?text=Logo";
            }}
          />
        </div>
      </div>
    </div>
  );
}
