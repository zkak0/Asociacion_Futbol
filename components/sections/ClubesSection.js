"use client";

import React, { useState, useEffect } from "react";
import { Modal, ConfirmModal } from "../../components/Modal";

export default function ClubesSection({ 
  clubs = [], 
  onSaveClub, 
  onDeleteClub, 
  ALL_DIVISIONES = [] 
}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [form, setForm] = useState({ nombre: "", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: [] });

  useEffect(() => {
    if (editingClub) {
      setForm({
        ...editingClub,
        divisiones: editingClub.divisiones || []
      });
      setIsFormVisible(true);
    }
  }, [editingClub]);

  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, logoUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveClub({ ...form, id: editingClub?.id });
    setIsFormVisible(false);
    setEditingClub(null);
    setForm({ nombre: "", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: [] });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Gestión de Clubes</h2>
        <button
          onClick={() => {
            setEditingClub(null);
            setForm({ nombre: "", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: [] });
            setIsFormVisible(true);
          }}
          className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Agregar club
        </button>
      </div>
      <Modal isOpen={isFormVisible} onClose={() => { setIsFormVisible(false); setEditingClub(null); }} title={editingClub ? "Editar Club" : "Agregar Club"}>
        <form onSubmit={handleSave} className="grid gap-3 lg:grid-cols-2">
          {[
            { label: "Nombre", name: "nombre" },
            { label: "Presidente", name: "presidente" },
            { label: "Tesorero", name: "tesorero" },
            { label: "Secretario", name: "secretario" },
            { label: "Email", name: "email", type: "email" },
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
            Logo URL
            <input
              value={form.logoUrl || ""}
              type="text"
              placeholder="https://..."
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
          <div className="lg:col-span-2">
            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Divisiones</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
              {ALL_DIVISIONES.map((division) => (
                <label key={division} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.divisiones.includes(division)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...form.divisiones, division]
                        : form.divisiones.filter((item) => item !== division);
                      setForm({ ...form, divisiones: next });
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-600"
                  />
                  {division}
                </label>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-wrap gap-3 justify-end pt-3">
            <button
              type="button"
              onClick={() => { setIsFormVisible(false); setEditingClub(null); }}
              className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
              {editingClub ? "Guardar" : "Agregar"}
            </button>
          </div>
        </form>
      </Modal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {clubs.map((club) => (
          <div key={club.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-semibold text-slate-700 overflow-hidden dark:bg-slate-800 dark:text-slate-100">
              {club.logoUrl ? (
                <img
                  src={club.logoUrl}
                  alt={`${club.nombre} logo`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/64x64/cccccc/ffffff?text=Logo";
                  }}
                />
              ) : (
                club.nombre.charAt(0).toUpperCase()
              )}
            </div>
            <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">{club.nombre}</h3>
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Presidente: {club.presidente || "-"}</p>
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Tesorero: {club.tesorero || "-"}</p>
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Secretario: {club.secretario || "-"}</p>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Email: {club.email || "-"}</p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {club.divisiones?.slice(0, 4).map((division) => (
                <span key={division} className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-slate-800 dark:text-slate-100">
                  {division}
                </span>
              ))}
              {(club.divisiones?.length || 0) > 4 && (
                <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">+{club.divisiones.length - 4}</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingClub(club)}
                className="flex-1 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Editar
              </button>
              <button
                onClick={() => setDeleteConfirmId(club.id)}
                className="flex-1 rounded-xl bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeleteClub(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Club?"
        message="¿Estás seguro de que deseas eliminar este club? Esta acción no se puede deshacer."
      />
    </div>
  );
}
