"use client";

import React, { useState, useEffect } from "react";
import { Modal, ConfirmModal } from "../../components/Modal";

export default function AdminUsuariosSection({ users, onSaveUser, onDeleteUser, USER_ROLES, MASTER_ADMIN_ID }) {
  const [formVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ nombre: "", cedula: "", password: "", rol: USER_ROLES?.[1] || "Usuario" });

  useEffect(() => {
    if (editingUser) {
      setForm({ nombre: editingUser.nombre, cedula: editingUser.cedula, password: "", rol: editingUser.rol });
      setShowPassword(false);
      setFormVisible(true);
    }
  }, [editingUser]);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = { ...editingUser, ...form };
    if (editingUser && !form.password) delete payload.password;
    onSaveUser(payload);
    setFormVisible(false);
    setEditingUser(null);
    setForm({ nombre: "", cedula: "", password: "", rol: USER_ROLES?.[1] || "Usuario" });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Administración de Usuarios</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setForm({ nombre: "", cedula: "", password: "", rol: USER_ROLES?.[1] || "Usuario" });
            setFormVisible(true);
          }}
          className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Nuevo usuario
        </button>
      </div>
      <Modal isOpen={formVisible} onClose={() => { setFormVisible(false); setEditingUser(null); }} title={editingUser ? "Editar Usuario" : "Nuevo Usuario"}>
        <form onSubmit={handleSave} className="grid gap-3 lg:grid-cols-2">
          {[
            { label: "Nombre", name: "nombre" },
            { label: "Cédula", name: "cedula", disabled: !!editingUser },
          ].map((field) => (
            <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {field.label}
              <input
                value={form[field.name] || ""}
                type="text"
                disabled={field.disabled}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Contraseña
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 pr-12 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400"
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Rol
            <select
              value={form.rol}
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
              disabled={editingUser?.id === MASTER_ADMIN_ID}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {editingUser?.id === MASTER_ADMIN_ID ? (
                <option value="Maestro">Maestro</option>
              ) : (
                USER_ROLES.map((rol) => <option key={rol} value={rol}>{rol}</option>)
              )}
            </select>
          </label>
          <div className="lg:col-span-2 flex flex-wrap gap-3 justify-end pt-3">
            <button
              type="button"
              onClick={() => { setFormVisible(false); setEditingUser(null); }}
              className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
              Guardar usuario
            </button>
          </div>
        </form>
      </Modal>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {["Nombre", "Cédula", "Rol", "Acciones"].map((text) => (
                <th key={text} className="px-3 py-1.5">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.filter((user) => user.id !== MASTER_ADMIN_ID).length > 0 ? users.filter((user) => user.id !== MASTER_ADMIN_ID).map((user) => (
              <tr key={user.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{user.nombre}</td>
                <td className="px-3 py-2">{user.cedula}</td>
                <td className="px-3 py-2">{user.rol}</td>
                <td className="px-3 py-2 space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(user.id)}
                    className="rounded-xl bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeleteUser(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Usuario?"
        message="¿Estás seguro de que deseas eliminar este usuario? Perderá el acceso de inmediato."
      />
    </div>
  );
}
