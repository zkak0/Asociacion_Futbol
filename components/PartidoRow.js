"use client";

import React, { useState } from "react";
import { formatDateForDisplay } from "../lib/utils";

export default function PartidoRow({ match, onEdit, onDelete, onRegisterResult, isLiguilla, onChangeState }) {
  const [localScore, setLocalScore] = useState("");
  const [visitorScore, setVisitorScore] = useState("");
  const completed = isLiguilla ? match.estado === "Completado" : match.estado === "Finalizado";

  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
      <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{formatDateForDisplay(match.fecha)}</td>
      <td className="px-3 py-2">{match.hora}</td>
      <td className="px-3 py-2">{match.local}</td>
      <td className="px-3 py-2">
        {!completed ? (
          <div className="flex items-center gap-2">
            <input
              value={localScore}
              onChange={(e) => setLocalScore(e.target.value)}
              type="number"
              min="0"
              placeholder="L"
              className="w-12 rounded-xl border border-slate-300 bg-slate-50 px-2 py-1 text-center text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <span className="text-sm">-</span>
            <input
              value={visitorScore}
              onChange={(e) => setVisitorScore(e.target.value)}
              type="number"
              min="0"
              placeholder="V"
              className="w-12 rounded-xl border border-slate-300 bg-slate-50 px-2 py-1 text-center text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        ) : (
          match.resultado || "-"
        )}
      </td>
      <td className="px-3 py-2">{match.visitante}</td>
      <td className="px-3 py-2">{match.division}</td>
      <td className="px-3 py-2">
        <select
          value={match.estado || "Pendiente"}
          onChange={(e) => onChangeState ? onChangeState(match.id, e.target.value) : null}
          className="rounded-xl border border-slate-300 bg-slate-50 px-2 py-1 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Completado">Completado</option>
          <option value="Suspendido">Suspendido</option>
        </select>
      </td>
      <td className="px-3 py-2 space-x-2">
        {!completed && (
          <button
            onClick={() => onRegisterResult(match.id, `${localScore}-${visitorScore}`)}
            className="rounded-xl bg-sky-600 px-2 py-1 text-xs font-semibold text-white transition hover:bg-sky-700"
          >
            Registrar
          </button>
        )}
        <button
          onClick={onEdit}
          className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="rounded-xl bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
