"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateStandings } from "../lib/standings";
import StandingsTable from "../components/StandingsTable";
import PartidoRow from "../components/PartidoRow";
import PartidoForm from "../components/PartidoForm";
import { formatDateForDisplay, formatDateForInput } from "../lib/utils";
import CampeonatoSection from "../components/sections/CampeonatoSection";
import TablasPosicionesSection from "../components/sections/TablasPosicionesSection";
import PartidosLiguillaSection from "../components/sections/PartidosLiguillaSection";
import TablaLiguillaSection from "../components/sections/TablaLiguillaSection";
import { Modal, ConfirmModal } from "../components/Modal";
import JugadoresSection from "../components/sections/JugadoresSection";
import SuspensionesSection from "../components/sections/SuspensionesSection";
import AdminLiguillaSection from "../components/sections/AdminLiguillaSection";
import AdminUsuariosSection from "../components/sections/AdminUsuariosSection";
import ClubesSection from "../components/sections/ClubesSection";
import AsociacionSection from "../components/sections/AsociacionSection";

const ALL_DIVISIONES = [
  "cuarta infantil",
  "tercera infantil",
  "segunda infantil",
  "primera infantil",
  "tercera adulto",
  "segunda adulto",
  "primera adulto",
  "senior",
  "super senior",
  "viejos tercios",
  "division femenina",
];
const LIGUILLA_GROUPS = ["A", "B"];
const SUSPENSION_TYPES = ["fechas", "tiempo"];
const TIEMPO_UNITS = ["días", "semanas", "meses", "años"];
const USER_ROLES = ["Administrador", "Usuario"];
const MASTER_ADMIN_ID = "16776631-5";

const INITIAL_CLUBS = [
  { id: 1, nombre: "Alejandro Navarrete", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 2, nombre: "Estrella del Janequeo", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 3, nombre: "Botafogo", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 4, nombre: "Real Chile", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 5, nombre: "Victoria de Chile", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 6, nombre: "Flecha Verde", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 7, nombre: "Juan Carlos Peña", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 8, nombre: "Quinto Sector", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 9, nombre: "Tres Estrellas", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 10, nombre: "Atlantic Reefer", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 11, nombre: "Reñaca Bajo", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
  { id: 12, nombre: "Corporacion Everton", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: ALL_DIVISIONES },
];

const INITIAL_PLAYERS = [
  {
    id: "12345678-9",
    nombres: "Carlos",
    apellidos: "Rodriguez",
    cedula: "12345678-9",
    club: "Alejandro Navarrete",
    division: "cuarta infantil",
    fechaNac: "1995-05-15",
    fechaOficio: "2025-01-15",
    fechaIngreso: "2025-01-20",
    estado: "Activo",
  },
  {
    id: "98765432-1",
    nombres: "Diego",
    apellidos: "Sanchez",
    cedula: "98765432-1",
    club: "Estrella del Janequeo",
    division: "tercera infantil",
    fechaNac: "1998-03-22",
    fechaOficio: "2025-02-01",
    fechaIngreso: "2025-02-05",
    estado: "Activo",
  },
  {
    id: "11223344-5",
    nombres: "Ana",
    apellidos: "Gomez",
    cedula: "11223344-5",
    club: "Botafogo",
    division: "primera adulto",
    fechaNac: "1990-11-10",
    fechaOficio: "2025-01-10",
    fechaIngreso: "2025-01-15",
    estado: "Activo",
  },
  {
    id: "55667788-9",
    nombres: "Luis",
    apellidos: "Perez",
    cedula: "55667788-9",
    club: "Alejandro Navarrete",
    division: "senior",
    fechaNac: "1980-01-01",
    fechaOficio: "2025-03-01",
    fechaIngreso: "2025-03-02",
    estado: "Activo",
  },
];

const INITIAL_MATCHES = [
  {
    id: 1714316160000,
    fecha: "2025-04-29",
    hora: "19:30",
    local: "Botafogo",
    visitante: "Reñaca Bajo",
    division: "cuarta infantil",
    resultado: "1-1",
    estado: "Finalizado",
  },
  {
    id: 1714316160001,
    fecha: "2025-04-30",
    hora: "15:00",
    local: "Alejandro Navarrete",
    visitante: "Tres Estrellas",
    division: "senior",
    resultado: "2-1",
    estado: "Finalizado",
  },
  {
    id: 1714402560000,
    fecha: "2025-05-01",
    hora: "10:00",
    local: "Victoria de Chile",
    visitante: "Flecha Verde",
    division: "tercera adulto",
    resultado: "0-3",
    estado: "Finalizado",
  },
  {
    id: 1714488960000,
    fecha: "2025-05-01",
    hora: "11:30",
    local: "Alejandro Navarrete",
    visitante: "Botafogo",
    division: "segunda infantil",
    resultado: "",
    estado: "Pendiente",
  },
  {
    id: 1714575360000,
    fecha: "2025-05-02",
    hora: "16:00",
    local: "Real Chile",
    visitante: "Quinto Sector",
    division: "cuarta infantil",
    resultado: "",
    estado: "Pendiente",
  },
  {
    id: 1714575360001,
    fecha: "2025-05-02",
    hora: "17:30",
    local: "Estrella del Janequeo",
    visitante: "Corporacion Everton",
    division: "senior",
    resultado: "3-3",
    estado: "Finalizado",
  },
];

const INITIAL_LIGUILLA_MATCHES = [
  {
    id: 2000000000001,
    fecha: "2025-04-27",
    hora: "14:30",
    local: "Alejandro Navarrete",
    visitante: "Botafogo",
    division: "segunda infantil",
    resultado: "3-1",
    estado: "Completado",
    grupo: "A",
  },
  {
    id: 2000000000002,
    fecha: "2025-04-28",
    hora: "11:10",
    local: "Atlantic Reefer",
    visitante: "Flecha Verde",
    division: "segunda infantil",
    resultado: "1-0",
    estado: "Completado",
    grupo: "A",
  },
  {
    id: 2000000000003,
    fecha: "2025-05-04",
    hora: "10:00",
    local: "Real Chile",
    visitante: "Estrella del Janequeo",
    division: "senior",
    resultado: "2-2",
    estado: "Completado",
    grupo: "B",
  },
  {
    id: 2000000000004,
    fecha: "2025-05-04",
    hora: "12:00",
    local: "Victoria de Chile",
    visitante: "Juan Carlos Peña",
    division: "senior",
    resultado: "1-0",
    estado: "Completado",
    grupo: "B",
  },
  {
    id: 2000000000005,
    fecha: "2025-05-05",
    hora: "15:00",
    local: "Botafogo",
    visitante: "Atlantic Reefer",
    division: "segunda infantil",
    resultado: "",
    estado: "Pendiente",
    grupo: "A",
  },
];

const INITIAL_SUSPENSIONS = [
  {
    id: 1,
    playerId: "12345678-9",
    playerName: "Carlos Rodriguez",
    clubName: "Alejandro Navarrete",
    division: "cuarta infantil",
    fechaInicio: "2025-04-29",
    tipo: "fechas",
    duracionFechas: 4,
    partidosCumplidos: 1,
    motivo: "Tarjeta Roja Directa",
    estado: "Activa",
  },
  {
    id: 2,
    playerId: "11223344-5",
    playerName: "Ana Gomez",
    clubName: "Botafogo",
    division: "primera adulto",
    fechaInicio: "2025-04-15",
    tipo: "tiempo",
    duracionTiempo: { valor: 2, unidad: "meses" },
    fechaTerminoCalculada: "2025-06-15",
    motivo: "Acumulación Tarjetas Amarillas",
    estado: "Activa",
  },
];

const INITIAL_USERS = [
  { id: MASTER_ADMIN_ID, nombre: "Admin Maestro", cedula: MASTER_ADMIN_ID, rol: "Maestro", password: "123" },
  { id: "11111111-1", nombre: "Juan Perez", cedula: "11111111-1", rol: "Administrador", password: "password123" },
  { id: "22222222-2", nombre: "Maria Soto", cedula: "22222222-2", rol: "Usuario", password: "password456" },
];

const INITIAL_ASSOCIATION_DETAILS = {
  nombre: "Asociación de Fútbol Luis Gómez Carreño",
  logoUrl: "https://i.postimg.cc/1RTSvmQb/ASOC-FUTBOL.png",
  presidente: "Juan Pérez González",
  secretario: "Maria Rodríguez Soto",
  tesorero: "Carlos López Silva",
  director1: "Ana Contreras Vargas",
  director2: "Luis Torres Castro",
  director3: "Sofía Herrera Muñoz",
  email: "asociacion.lgc@example.com",
};

// date helpers moved to lib/utils.js

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Sidebar({ activeSection, collapsed, onToggle, onNavigate, associationDetails }) {
  const links = [
    { id: "inicio", label: "Inicio" },
    { id: "asociacion", label: "Asociación" },
    { id: "clubes", label: "Clubes" },
    { id: "jugadores", label: "Jugadores" },
    { id: "campeonato", label: "Campeonato" },
    { id: "tablas", label: "Tablas" },
    { id: "partidos-liguilla", label: "Partidos Liguilla" },
    { id: "tabla-liguilla", label: "Tabla Liguilla" },
    { id: "admin-liguilla", label: "Admin. Liguilla" },
    { id: "suspensiones", label: "Suspensiones" },
    { id: "import-export", label: "Importar / Exportar" },
    { id: "admin-usuarios", label: "Administración" },
  ];

  return (
    <aside className={`bg-white dark:bg-slate-900 shadow-xl flex flex-col ${collapsed ? "md:w-20 w-full" : "md:w-60 w-full"}`}>
      <div className={`flex items-center justify-center p-4 border-b border-slate-200 dark:border-slate-700 ${collapsed ? "px-2" : "px-6"}`}>
        <img
          src={associationDetails.logoUrl}
          alt="Logo Asociación"
          className={`${collapsed ? "h-10 w-10" : "h-20"} object-contain rounded-lg bg-slate-100 dark:bg-slate-800`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/144x144/cccccc/ffffff?text=Logo";
          }}
        />
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`sidebar-link flex items-center w-full gap-3 rounded-xl px-3 py-2 text-sm font-medium ${activeSection === link.id ? "active" : "text-slate-600 hover:text-slate-900 dark:text-slate-300"}`}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
            {!collapsed && <span className="truncate">{link.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={onToggle}
          className="w-full rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {collapsed ? "Expandir" : "Colapsar"}
        </button>
      </div>
      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => onNavigate("logout")}
          className="w-full rounded-xl bg-rose-100 dark:bg-rose-900/30 px-3 py-2 text-sm font-medium text-rose-700 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-800"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

function Header({ user, darkMode, onToggleDarkMode }) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Bienvenido,</p>
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{user?.nombre || "Usuario"}</p>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>
    </header>
  );
}

function LoginScreen({ onLogin, error, associationDetails }) {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl">
        <div className="mb-4 text-center">
          <img
            src={associationDetails.logoUrl}
            alt="Logo Asociación"
            className="mx-auto h-24 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/144x144/cccccc/ffffff?text=Logo";
            }}
          />
          <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Panel de Administración</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Ingresa con tu cédula y contraseña</p>
        </div>
        {error && <p className="mb-4 rounded-xl bg-rose-100 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(cedula, password);
          }}
          className="space-y-4"
        >
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Cédula
            <input
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
              placeholder="12345678-9"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <button className="w-full rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

function sectionTitle(title) {
  return <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>;
}

function ListCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {children}
    </div>
  );
}

// Modal and ConfirmModal components imported from ../components/Modal

function InicioSection({ matches }) {
  const upcoming = matches.filter((match) => match.estado === "Pendiente").sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="space-y-4">
      {sectionTitle("Próximos Partidos")}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              { ["Fecha", "Hora", "Local", "Visitante", "División"].map((text) => <th key={text} className="px-3 py-1.5">{text}</th>) }
            </tr>
          </thead>
          <tbody>
            {upcoming.length > 0 ? upcoming.map((match) => (
              <tr key={match.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{formatDateForDisplay(match.fecha)}</td>
                <td className="px-3 py-2">{match.hora}</td>
                <td className="px-3 py-2">{match.local}</td>
                <td className="px-3 py-2">{match.visitante}</td>
                <td className="px-3 py-2">{match.division}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">No hay próximos partidos programados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// AsociacionSection moved to components/sections/AsociacionSection

// ClubesSection moved to components/sections/ClubesSection

// JugadoresSection moved to components/sections/JugadoresSection

// PartidoRow and PartidoForm moved to components/PartidoRow.js and components/PartidoForm.js

// CampeonatoSection moved to components/sections/CampeonatoSection


// TablasPosicionesSection moved to components/sections/TablasPosicionesSection

// PartidosLiguillaSection moved to components/sections/PartidosLiguillaSection

// AdminLiguillaSection moved to components/sections/AdminLiguillaSection

// TablaLiguillaSection moved to components/sections/TablaLiguillaSection

// SuspensionesSection moved to components/sections/SuspensionesSection

function ImportExportSection({ exportOptions, selectedImportFileName, onImportFileChange, onImportData, onExportData, onToggleExportOption }) {
  return (
    <div className="space-y-4">
      {sectionTitle("Importar / Exportar")}
      <div className="grid gap-4 lg:grid-cols-2">
        <ListCard title="Importar datos">
          <div className="space-y-4">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">Arrastra un archivo CSV o XLSX aquí, o selecciona uno.</p>
              <label className="inline-flex cursor-pointer items-center rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                Seleccionar archivo
                <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  className="hidden"
                  onChange={(e) => onImportFileChange(e.target.files?.[0] || null)}
                />
              </label>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{selectedImportFileName || "No se seleccionó archivo"}</p>
            </div>
            <button
              onClick={onImportData}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Importar datos
            </button>
          </div>
        </ListCard>

        <ListCard title="Exportar datos">
          <div className="space-y-4">
            <div className="space-y-2">
              {Object.keys(exportOptions).map((key) => (
                <label key={key} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={!!exportOptions[key]}
                    onChange={() => onToggleExportOption(key)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={onExportData} className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">Exportar</button>
            </div>
          </div>
        </ListCard>
      </div>
    </div>
  );
}

function RenderSection({ sectionId, appState, actions }) {
  switch (sectionId) {
    case "inicio":
      return <InicioSection matches={appState.matches} />;
    case "asociacion":
      return <AsociacionSection details={appState.associationDetails} onSave={actions.saveAssociation} />;
    case "clubes":
      return <ClubesSection clubs={appState.clubs} onSaveClub={actions.saveClub} onDeleteClub={actions.deleteClub} />;
    case "jugadores":
      return <JugadoresSection clubs={appState.clubs} players={appState.players} onSavePlayer={actions.savePlayer} onDeletePlayer={actions.deletePlayer} />;
    case "campeonato":
      return (
        <CampeonatoSection
          clubs={appState.clubs}
          matches={appState.matches}
          onSaveMatch={actions.saveMatch}
          onDeleteMatch={actions.deleteMatch}
          onRegisterResult={actions.registerResult}
          onChangeMatchState={actions.updateMatchState}
          ALL_DIVISIONES={ALL_DIVISIONES}
          LIGUILLA_GROUPS={LIGUILLA_GROUPS}
        />
      );
    case "tablas":
      return <TablasPosicionesSection clubs={appState.clubs} matches={appState.matches} ALL_DIVISIONES={ALL_DIVISIONES} />;
    case "partidos-liguilla":
      return (
        <PartidosLiguillaSection
          clubs={appState.clubs}
          matches={appState.liguillaMatches}
          activeDivision={appState.activeLiguillaDivisionTab}
          onSaveMatch={actions.saveLiguillaMatch}
          onDeleteMatch={actions.deleteLiguillaMatch}
          onRegisterResult={actions.registerLiguillaResult}
          onChangeDivision={actions.setLiguillaDivisionTab}
          ALL_DIVISIONES={ALL_DIVISIONES}
          LIGUILLA_GROUPS={LIGUILLA_GROUPS}
        />
      );
    case "tabla-liguilla":
      return (
        <TablaLiguillaSection
          clubs={appState.clubs}
          matches={appState.liguillaMatches}
          groups={appState.liguillaGroups}
          activeGroup={appState.activeLiguillaGroupTab}
          activeDivision={appState.activeLiguillaDivisionTab}
          onChangeGroup={actions.setLiguillaGroupTab}
          onChangeDivision={actions.setLiguillaDivisionTab}
          LIGUILLA_GROUPS={LIGUILLA_GROUPS}
          ALL_DIVISIONES={ALL_DIVISIONES}
        />
      );
    case "admin-liguilla":
      return <AdminLiguillaSection clubs={appState.clubs} liguillaGroups={appState.liguillaGroups} onAssignGroup={actions.assignClubToGroup} onRemoveGroup={actions.removeClubFromGroup} onSaveGroups={actions.saveLiguillaGroups} />;
    case "suspensiones":
      return <SuspensionesSection players={appState.players} suspensions={appState.suspensions} clubs={appState.clubs} onSaveSuspension={actions.saveSuspension} onDeleteSuspension={actions.deleteSuspension} />;
    case "import-export":
      return <ImportExportSection exportOptions={appState.exportOptions} selectedImportFileName={appState.selectedImportFileName} onImportFileChange={actions.setImportFileName} onImportData={actions.importData} onExportData={actions.exportData} onToggleExportOption={actions.toggleExportOption} />;
    case "admin-usuarios":
      return <AdminUsuariosSection users={appState.users} onSaveUser={actions.saveUser} onDeleteUser={actions.deleteUser} />;
    default:
      return <InicioSection matches={appState.matches} />;
  }
}

const apiFetch = async (path, options = {}) => {
  const response = await fetch(`/api/pb/${path}`, {
    credentials: "same-origin",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  if (!response.ok) {
    throw new Error(json?.message || response.statusText || "Error de backend");
  }
  return json;
};

const pbGet = async (collection) => {
  return apiFetch(`collections/${collection}/records`);
};

const pbUpsert = async (collection, record) => {
  if (record?.id) {
    return apiFetch(`collections/${collection}/records/${record.id}`, {
      method: "PATCH",
      body: JSON.stringify(record),
    });
  }
  return apiFetch(`collections/${collection}/records`, {
    method: "POST",
    body: JSON.stringify(record),
  });
};

const pbDelete = async (collection, id) => {
  return apiFetch(`collections/${collection}/records/${id}`, {
    method: "DELETE",
  });
};

const pbLogin = async (cedula, password) => {
  return apiFetch("auth/login", {
    method: "POST",
    body: JSON.stringify({ cedula, password }),
  });
};

export default function Home() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [activeSection, setActiveSection] = useState("inicio");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [clubs, setClubs] = useState(INITIAL_CLUBS);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [liguillaMatches, setLiguillaMatches] = useState(INITIAL_LIGUILLA_MATCHES);
  const [suspensions, setSuspensions] = useState(INITIAL_SUSPENSIONS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [liguillaGroups, setLiguillaGroups] = useState(() => {
    const grouping = {};
    INITIAL_CLUBS.forEach((club) => {
      grouping[club.id] = null;
    });
    return grouping;
  });
  const [associationDetails, setAssociationDetails] = useState(INITIAL_ASSOCIATION_DETAILS);
  const [activeLiguillaDivisionTab, setActiveLiguillaDivisionTab] = useState(ALL_DIVISIONES[0]);
  const [activeLiguillaGroupTab, setActiveLiguillaGroupTab] = useState(LIGUILLA_GROUPS[0]);
  const [selectedImportFileName, setSelectedImportFileName] = useState("");
  const [exportOptions, setExportOptions] = useState({ jugadores: false, clubes: false, tablaPosiciones: false, suspensiones: false });
  const [backendReady, setBackendReady] = useState(false);

  const loadAppData = async () => {
    try {
      const [clubsData, playersData, matchesData, liguillaMatchesData, suspensionsData, usersData, associationData, liguillaGroupsData] = await Promise.all([
        pbGet("clubs"),
        pbGet("players"),
        pbGet("matches"),
        pbGet("liguillaMatches"),
        pbGet("suspensions"),
        pbGet("users"),
        pbGet("association"),
        pbGet("liguillaGroups"),
      ]);

      setClubs(clubsData || INITIAL_CLUBS);
      setPlayers(playersData || INITIAL_PLAYERS);
      setMatches(matchesData || INITIAL_MATCHES);
      setLiguillaMatches(liguillaMatchesData || INITIAL_LIGUILLA_MATCHES);
      setSuspensions(suspensionsData || INITIAL_SUSPENSIONS);
      setUsers(usersData || INITIAL_USERS);
      setAssociationDetails((associationData && associationData[0]) || INITIAL_ASSOCIATION_DETAILS);
      setLiguillaGroups(
        (liguillaGroupsData || []).reduce((acc, item) => {
          acc[item.clubId] = item.group;
          return acc;
        }, {})
      );
      setBackendReady(true);
    } catch (error) {
      console.warn("No se pudo cargar el backend local:", error.message);
    }
  };

  useEffect(() => {
    loadAppData();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogin = async (cedula, password) => {
    try {
      const user = await pbLogin(cedula, password);
      setAuthenticated(true);
      setCurrentUser(user);
      setLoginError("");
      setActiveSection("inicio");
    } catch (error) {
      setLoginError(error.message || "Cédula o contraseña incorrecta.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setCurrentUser(null);
    setActiveSection("inicio");
  };

  const saveClub = (club) => {
    const record = { ...club, id: club.id || Date.now() };
    if (club.id) {
      setClubs((prev) => prev.map((item) => (item.id === record.id ? { ...item, ...record } : item)));
    } else {
      setClubs((prev) => [...prev, record]);
    }
    pbUpsert("clubs", record).catch((error) => console.warn("Error guardando club:", error.message));
  };

  const deleteClub = (clubId) => {
    setClubs((prev) => prev.filter((club) => club.id !== clubId));
    pbDelete("clubs", clubId).catch((error) => console.warn("Error eliminando club:", error.message));
  };

  const savePlayer = (player) => {
    const record = { ...player, id: player.id || player.cedula };
    setPlayers((prev) => {
      const exists = prev.some((item) => item.id === record.id);
      if (exists) return prev.map((item) => (item.id === record.id ? { ...item, ...record } : item));
      return [...prev, record];
    });
    pbUpsert("players", record).catch((error) => console.warn("Error guardando jugador:", error.message));
  };

  const deletePlayer = (playerId) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
    pbDelete("players", playerId).catch((error) => console.warn("Error eliminando jugador:", error.message));
  };

  const saveMatch = (match) => {
    const record = { ...match, id: match.id || Date.now() };
    if (record.id) {
      setMatches((prev) => prev.map((item) => (item.id === record.id ? { ...item, ...record } : item)));
    } else {
      setMatches((prev) => [...prev, record]);
    }
    pbUpsert("matches", { ...record, estado: record.estado || "Pendiente", resultado: record.resultado || "" }).catch((error) =>
      console.warn("Error guardando partido:", error.message)
    );
  };

  const deleteMatch = (id) => {
    setMatches((prev) => prev.filter((match) => match.id !== id));
    pbDelete("matches", id).catch((error) => console.warn("Error eliminando partido:", error.message));
  };

  const registerResult = (id, result) => {
    const [local, visitor] = result.split("-").map(Number);
    if (Number.isNaN(local) || Number.isNaN(visitor)) return;
    setMatches((prev) => prev.map((match) => (match.id === id ? { ...match, resultado: result, estado: "Finalizado" } : match)));
    pbUpsert("matches", { id, resultado: result, estado: "Finalizado" }).catch((error) => console.warn("Error registrando resultado:", error.message));
  };

  const updateMatchState = (id, newState) => {
    setMatches((prev) => prev.map((match) => (match.id === id ? { ...match, estado: newState } : match)));
    pbUpsert("matches", { id, estado: newState }).catch((error) => console.warn("Error actualizando estado de partido:", error.message));
  };

  const saveLiguillaMatch = (match) => {
    const record = { ...match, id: match.id || Date.now() + 1 };
    if (match.id) {
      setLiguillaMatches((prev) => prev.map((item) => (item.id === record.id ? { ...item, ...record } : item)));
    } else {
      setLiguillaMatches((prev) => [...prev, record]);
    }
    pbUpsert("liguillaMatches", { ...record, estado: record.estado || "Pendiente", resultado: record.resultado || "" }).catch((error) =>
      console.warn("Error guardando partido de liguilla:", error.message)
    );
  };

  const deleteLiguillaMatch = (id) => {
    setLiguillaMatches((prev) => prev.filter((match) => match.id !== id));
    pbDelete("liguillaMatches", id).catch((error) => console.warn("Error eliminando partido de liguilla:", error.message));
  };

  const registerLiguillaResult = (id, result) => {
    const [local, visitor] = result.split("-").map(Number);
    if (Number.isNaN(local) || Number.isNaN(visitor)) return;
    setLiguillaMatches((prev) => prev.map((match) => (match.id === id ? { ...match, resultado: result, estado: "Completado" } : match)));
    pbUpsert("liguillaMatches", { id, resultado: result, estado: "Completado" }).catch((error) =>
      console.warn("Error registrando resultado de liguilla:", error.message)
    );
  };

  const assignClubToGroup = (clubId, group) => {
    setLiguillaGroups((prev) => ({ ...prev, [clubId]: group }));
  };

  const removeClubFromGroup = (clubId) => {
    setLiguillaGroups((prev) => ({ ...prev, [clubId]: null }));
  };

  const saveLiguillaGroups = () => {
    Object.entries(liguillaGroups).forEach(([clubId, group]) => {
      const record = { id: String(clubId), clubId: Number(clubId), group };
      if (group) {
        pbUpsert("liguillaGroups", record).catch((error) => console.warn("Error guardando grupos de liguilla:", error.message));
      } else {
        pbDelete("liguillaGroups", String(clubId)).catch(() => {});
      }
    });
    alert("Grupos de liguilla guardados.");
  };

  const saveSuspension = (suspension) => {
    const record = { ...suspension, id: suspension.id || Date.now() };
    setSuspensions((prev) => {
      const exists = prev.some((item) => item.id === record.id);
      if (exists) return prev.map((item) => (item.id === record.id ? record : item));
      return [...prev, record];
    });
    pbUpsert("suspensions", record).catch((error) => console.warn("Error guardando suspensión:", error.message));
  };

  const deleteSuspension = (id) => {
    setSuspensions((prev) => prev.filter((item) => item.id !== id));
    pbDelete("suspensions", id).catch((error) => console.warn("Error eliminando suspensión:", error.message));
  };

  const handleImportFileName = (file) => {
    setSelectedImportFileName(file?.name || "");
  };

  const importData = () => {
    alert(`Importar archivo ${selectedImportFileName || "(ninguno)"} - funcionalidad demostrativa.`);
  };

  const exportData = () => {
    const selected = Object.entries(exportOptions).filter(([, enabled]) => enabled).map(([key]) => key);
    if (selected.length === 0) {
      alert("Selecciona al menos una opción para exportar.");
      return;
    }
    alert(`Exportando: ${selected.join(", ")}`);
  };

  const toggleExportOption = (key) => {
    setExportOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveUser = (user) => {
    const record = { ...user, id: user.id || user.cedula };
    setUsers((prev) => {
      const exists = prev.some((item) => item.id === record.id);
      if (exists) {
        return prev.map((item) => (item.id === record.id ? { ...item, ...record, password: record.password || item.password } : item));
      }
      return [...prev, record];
    });
    pbUpsert("users", record).catch((error) => console.warn("Error guardando usuario:", error.message));
  };

  const deleteUser = (id) => {
    if (id === MASTER_ADMIN_ID) {
      alert("No se puede eliminar al Admin Maestro.");
      return;
    }
    setUsers((prev) => prev.filter((user) => user.id !== id));
    pbDelete("users", id).catch((error) => console.warn("Error eliminando usuario:", error.message));
  };

  const saveAssociation = (data) => {
    const record = { ...data, id: 1 };
    setAssociationDetails(record);
    pbUpsert("association", record).catch((error) => console.warn("Error guardando datos de asociación:", error.message));
  };

  const handleNavigate = (section) => {
    if (section === "logout") {
      handleLogout();
      return;
    }
    setActiveSection(section);
  };

  return isAuthenticated ? (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-950">
      <Sidebar
        activeSection={activeSection}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        onNavigate={handleNavigate}
        associationDetails={associationDetails}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={currentUser} darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-4">
          <div className="mx-auto w-full max-w-7xl space-y-4">
            <RenderSection
              sectionId={activeSection}
              appState={{
              matches,
              clubs,
              players,
              liguillaMatches,
              suspensions,
              users,
              associationDetails,
              liguillaGroups,
              activeLiguillaDivisionTab,
              activeLiguillaGroupTab,
              selectedImportFileName,
              exportOptions,
            }}
            actions={{
              saveAssociation,
              saveClub,
              deleteClub,
              savePlayer,
              deletePlayer,
              saveMatch,
              deleteMatch,
              registerResult,
              saveLiguillaMatch,
              deleteLiguillaMatch,
              registerLiguillaResult,
              assignClubToGroup,
              removeClubFromGroup,
              saveLiguillaGroups,
              setLiguillaDivisionTab: setActiveLiguillaDivisionTab,
              setLiguillaGroupTab: setActiveLiguillaGroupTab,
              saveSuspension,
              deleteSuspension,
              setImportFileName: handleImportFileName,
              importData,
              exportData,
              toggleExportOption,
              saveUser,
              deleteUser,
                updateMatchState,
            }}
          />
          </div>
        </main>
      </div>
    </div>
  ) : (
    <LoginScreen onLogin={handleLogin} error={loginError} associationDetails={associationDetails} />
  );
}
