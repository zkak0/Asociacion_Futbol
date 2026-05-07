"use client";

import { useEffect, useMemo, useState } from "react";

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

function formatDateForDisplay(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateString;
}

function formatDateForInput(value) {
  if (!value) return "";
  if (value.includes("/")) {
    const [d, m, y] = value.split("/");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return value;
}

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

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-4 text-slate-600 dark:text-slate-400">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

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

function AsociacionSection({ details, onSave }) {
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
      {sectionTitle("Datos de la Asociación")}
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

function ClubesSection({ clubs, onSaveClub, onDeleteClub }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [form, setForm] = useState({ nombre: "", presidente: "", tesorero: "", secretario: "", email: "", logoUrl: "", divisiones: [] });

  useEffect(() => {
    if (editingClub) {
      setForm(editingClub);
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
        {sectionTitle("Gestión de Clubes")}
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
              {club.divisiones.slice(0, 4).map((division) => (
                <span key={division} className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-slate-800 dark:text-slate-100">
                  {division}
                </span>
              ))}
              {club.divisiones.length > 4 && <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">+{club.divisiones.length - 4}</span>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingClub(club)}
                className="flex-1 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Editar
              </button>
              <button
                onClick={() => onDeleteClub(club.id)}
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

function JugadoresSection({ clubs, players, onSavePlayer, onDeletePlayer }) {
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
        {sectionTitle("Gestión de Jugadores")}
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
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Club
            <select
              value={form.club}
              onChange={(e) => setForm({ ...form, club: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          ))}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 lg:col-span-2">
            Estado
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o cédula"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <select
              value={clubFilter}
              onChange={(e) => setClubFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Todos los clubes</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.nombre}>{club.nombre}</option>
              ))}
            </select>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Todas las divisiones</option>
              {ALL_DIVISIONES.map((division) => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
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
                      onClick={() => onDeletePlayer(player.id)}
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

function PartidoRow({ match, onEdit, onDelete, onRegisterResult, isLiguilla }) {
  const [localScore, setLocalScore] = useState("");
  const [visitorScore, setVisitorScore] = useState("");
  const completed = isLiguilla ? match.estado === "Completado" : match.estado === "Finalizado";

  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
      <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{formatDateForDisplay(match.fecha)}</td>
      <td className="px-3 py-2">{match.hora}</td>
      <td className="px-3 py-2">{match.local}</td>
      <td className="px-3 py-2">
        {completed ? (
          <span className="font-semibold">{match.resultado || "-"}</span>
        ) : (
          <div className="flex items-center gap-2">
            <input
              value={localScore}
              onChange={(e) => setLocalScore(e.target.value)}
              type="number"
              min="0"
              placeholder="L"
              className="w-12 rounded-xl border border-slate-300 bg-slate-50 px-2 py-1 text-center text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <span>-</span>
            <input
              value={visitorScore}
              onChange={(e) => setVisitorScore(e.target.value)}
              type="number"
              min="0"
              placeholder="V"
              className="w-12 rounded-xl border border-slate-300 bg-slate-50 px-2 py-1 text-center text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        )}
      </td>
      <td className="px-3 py-2">{match.visitante}</td>
      <td className="px-3 py-2">{match.division}</td>
      <td className="px-3 py-2">
        <span className={completed ? "status-active" : "status-pending"}>{match.estado}</span>
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

function PartidoForm({ clubs, match, onCancel, onSave, isLiguilla }) {
  const [form, setForm] = useState({
    fecha: match?.fecha ? formatDateForDisplay(match.fecha) : "",
    hora: match?.hora || "",
    local: match?.local || "",
    visitante: match?.visitante || "",
    division: match?.division || "",
    grupo: match?.grupo || LIGUILLA_GROUPS[0],
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
            {ALL_DIVISIONES.map((division) => (
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
              {LIGUILLA_GROUPS.map((group) => (
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

function CampeonatoSection({ clubs, matches, onSaveMatch, onDeleteMatch, onRegisterResult }) {
  const [divisionFilter, setDivisionFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const filteredMatches = matches.filter((match) => !divisionFilter || match.division === divisionFilter);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {sectionTitle("Campeonato General")}
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
          isLiguilla={false}
        />
      </Modal>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-[13px] text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {["Fecha", "Hora", "Local", "Resultado", "Visitante", "División", "Estado", "Acciones"].map((text) => (
                <th key={text} className="px-2 py-2">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMatches.length > 0 ? filteredMatches.map((match) => (
              <PartidoRow
                key={match.id}
                match={match}
                onEdit={() => {
                  setEditingMatch(match);
                  setFormOpen(true);
                }}
                onDelete={() => onDeleteMatch(match.id)}
                onDelete={() => setDeleteConfirmId(match.id)}
                onRegisterResult={(id, result) => onRegisterResult(id, result)}
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

function calculateStandings(matches, clubs, allDivisions, forLiguilla = false) {
  const relevant = matches.filter((match) => {
    if (forLiguilla) return match.estado === "Completado" && match.resultado;
    return match.estado === "Finalizado" && match.resultado;
  });

  const standings = {
    general: {},
    byDivision: {},
  };

  clubs.forEach((club) => {
    standings.general[club.nombre] = { club: club.nombre, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dif: 0, pts: 0 };
    club.divisiones.forEach((division) => {
      if (!standings.byDivision[division]) standings.byDivision[division] = {};
      standings.byDivision[division][club.nombre] = { club: club.nombre, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dif: 0, pts: 0 };
    });
  });

  relevant.forEach((match) => {
    const [gLS, gVS] = match.resultado.split("-").map(Number);
    if (Number.isNaN(gLS) || Number.isNaN(gVS)) return;
    const home = standings.general[match.local];
    const away = standings.general[match.visitante];
    if (!home || !away) return;

    const divisions = [standings.byDivision[match.division]];
    [home, away].forEach((team) => {
      if (team) team.pj += 1;
    });
    home.gf += gLS;
    home.gc += gVS;
    away.gf += gVS;
    away.gc += gLS;

    if (gLS > gVS) {
      home.pg += 1;
      away.pp += 1;
      home.pts += 3;
    } else if (gVS > gLS) {
      away.pg += 1;
      home.pp += 1;
      away.pts += 3;
    } else {
      home.pe += 1;
      away.pe += 1;
      home.pts += 1;
      away.pts += 1;
    }

    home.dif = home.gf - home.gc;
    away.dif = away.gf - away.gc;

    const divisionTable = standings.byDivision[match.division];
    if (divisionTable) {
      const homeDiv = divisionTable[match.local];
      const awayDiv = divisionTable[match.visitante];
      if (homeDiv) {
        homeDiv.pj += 1;
        homeDiv.gf += gLS;
        homeDiv.gc += gVS;
        if (gLS > gVS) homeDiv.pg += 1;
        else if (gVS > gLS) homeDiv.pp += 1;
        else homeDiv.pe += 1;
        homeDiv.pts += gLS > gVS ? 3 : gLS === gVS ? 1 : 0;
        homeDiv.dif = homeDiv.gf - homeDiv.gc;
      }
      if (awayDiv) {
        awayDiv.pj += 1;
        awayDiv.gf += gVS;
        awayDiv.gc += gLS;
        if (gVS > gLS) awayDiv.pg += 1;
        else if (gLS > gVS) awayDiv.pp += 1;
        else awayDiv.pe += 1;
        awayDiv.pts += gVS > gLS ? 3 : gLS === gVS ? 1 : 0;
        awayDiv.dif = awayDiv.gf - awayDiv.gc;
      }
    }
  });

  const sortTable = (a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf;

  return {
    general: Object.values(standings.general).sort(sortTable),
    byDivision: Object.fromEntries(
      Object.entries(standings.byDivision).map(([division, table]) => [division, Object.values(table).sort(sortTable)])
    ),
  };
}

function StandingsTable({ standings, title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-300 table-fixed">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {["POS", "CLUB", "PJ", "PG", "PE", "PP", "GF", "GC", "DIF", "PTS"].map((text) => (
                <th key={text} className="px-1.5 py-2 text-center text-[11px]">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.length > 0 ? standings.map((team, index) => (
              <tr key={team.club} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                <td className="px-3 py-3 text-center font-semibold text-slate-900 dark:text-slate-100">{index + 1}</td>
                <td className="px-2 py-2 font-medium text-slate-900 dark:text-slate-100 truncate">{team.club}</td>
                <td className="px-1 py-2 text-center text-xs">{team.pj}</td>
                <td className="px-1 py-2 text-center text-xs">{team.pg}</td>
                <td className="px-1 py-2 text-center text-xs">{team.pe}</td>
                <td className="px-1 py-2 text-center text-xs">{team.pp}</td>
                <td className="px-1 py-2 text-center text-xs">{team.gf}</td>
                <td className="px-1 py-2 text-center text-xs">{team.gc}</td>
                <td className="px-1 py-2 text-center text-xs">{team.dif}</td>
                <td className="px-1 py-2 text-center font-semibold text-slate-900 dark:text-slate-100 text-xs">{team.pts}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="10" className="px-3 py-4 text-center text-slate-500 dark:text-slate-400">No hay datos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TablasPosicionesSection({ clubs, matches }) {
  const [activeTab, setActiveTab] = useState("General");
  const standingsData = useMemo(() => calculateStandings(matches, clubs, ALL_DIVISIONES), [matches, clubs]);
  const currentStandings = activeTab === "General" ? standingsData.general : standingsData.byDivision[activeTab] || [];

  return (
    <div className="space-y-4">
      {sectionTitle("Tablas de Posiciones")}
      <div className="flex flex-wrap gap-2">
        {['General', ...ALL_DIVISIONES].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${activeTab === tab ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <StandingsTable standings={currentStandings} title={`Tabla de Posiciones - ${activeTab}`} />
    </div>
  );
}

function PartidosLiguillaSection({ clubs, matches, activeDivision, onSaveMatch, onDeleteMatch, onRegisterResult, onChangeDivision }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const divisionMatches = matches.filter((match) => match.division === activeDivision);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {sectionTitle("Partidos de Liguilla")}
        <button
          onClick={() => {
            setEditingMatch(null);
            setFormOpen(true);
          }}
            className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Programar partido de liguilla
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {ALL_DIVISIONES.map((division) => (
          <button
            key={division}
            onClick={() => onChangeDivision(division)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${activeDivision === division ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
          >
            {division}
          </button>
        ))}
      </div>
      <Modal isOpen={formOpen} onClose={() => { setFormOpen(false); setEditingMatch(null); }} title={editingMatch ? "Editar Partido Liguilla" : "Programar Partido Liguilla"}>
        <PartidoForm
          clubs={clubs}
          match={editingMatch}
          onCancel={() => { setFormOpen(false); setEditingMatch(null); }}
          onSave={(m) => { onSaveMatch(m); setFormOpen(false); setEditingMatch(null); }}
          isLiguilla
        />
      </Modal>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-[13px] text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {["Fecha", "Hora", "Local", "Resultado", "Visitante", "División", "Grupo", "Estado", "Acciones"].map((text) => (
                <th key={text} className="px-2 py-2">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {divisionMatches.length > 0 ? divisionMatches.map((match) => (
              <tr key={match.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{formatDateForDisplay(match.fecha)}</td>
                <td className="px-3 py-2">{match.hora}</td>
                <td className="px-3 py-2">{match.local}</td>
                <td className="px-3 py-2">{match.resultado || "-"}</td>
                <td className="px-3 py-2">{match.visitante}</td>
                <td className="px-3 py-2">{match.division}</td>
                <td className="px-3 py-2">{match.grupo}</td>
                <td className="px-3 py-2">{match.estado}</td>
                <td className="px-3 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingMatch(match);
                      setFormOpen(true);
                    }}
                    className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteMatch(match.id)}
                    onClick={() => setDeleteConfirmId(match.id)}
                    className="rounded-xl bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">No hay partidos de liguilla en esta división.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeleteMatch(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Partido Liguilla?"
        message="¿Estás seguro de que deseas eliminar este partido de la liguilla?"
      />
    </div>
  );
}

function AdminLiguillaSection({ clubs, liguillaGroups, onAssignGroup, onRemoveGroup, onSaveGroups }) {
  const availableClubs = clubs.filter((club) => !liguillaGroups[club.id]);
  const groupA = clubs.filter((club) => liguillaGroups[club.id] === "A");
  const groupB = clubs.filter((club) => liguillaGroups[club.id] === "B");

  return (
    <div className="space-y-4">
      {sectionTitle("Administración de Grupos de Liguilla")}
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { title: "Clubes disponibles", clubs: availableClubs, action: (club) => (
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <span>{club.nombre}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onAssignGroup(club.id, "A")}
                  className="rounded-xl bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700"
                >A</button>
                <button
                  onClick={() => onAssignGroup(club.id, "B")}
                  className="rounded-xl bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700"
                >B</button>
              </div>
            </div>
          ) },
          { title: "Grupo A", clubs: groupA, action: (club) => (
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <span>{club.nombre}</span>
              <button
                onClick={() => onRemoveGroup(club.id)}
                className="rounded-xl bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-700"
              >Quitar</button>
            </div>
          ) },
          { title: "Grupo B", clubs: groupB, action: (club) => (
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <span>{club.nombre}</span>
              <button
                onClick={() => onRemoveGroup(club.id)}
                className="rounded-xl bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-700"
              >Quitar</button>
            </div>
          ) },
        ].map((group) => (
          <div key={group.title} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{group.title}</h3>
            {group.clubs.length > 0 ? (
              <div className="space-y-3">
                {group.clubs.map((club) => (
                  <div key={club.id}>{group.action(club)}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No hay clubes en este grupo.</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onSaveGroups}
        className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        Guardar grupos
      </button>
    </div>
  );
}

function TablaLiguillaSection({ clubs, matches, groups, activeGroup, activeDivision, onChangeGroup, onChangeDivision }) {
  const standings = useMemo(() => {
    const completed = matches.filter((match) => match.estado === "Completado" && match.grupo);
    const table = {};

    completed.forEach((match) => {
      const winner = match.resultado.split("-").map(Number);
      if (winner.some((n) => Number.isNaN(n))) return;
      const [homeGoals, awayGoals] = winner;
      [match.local, match.visitante].forEach((team) => {
        if (!table[team]) table[team] = { club: team, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dif: 0, pts: 0 };
      });
      const local = table[match.local];
      const visitor = table[match.visitante];
      local.pj += 1;
      visitor.pj += 1;
      local.gf += homeGoals;
      local.gc += awayGoals;
      visitor.gf += awayGoals;
      visitor.gc += homeGoals;
      if (homeGoals > awayGoals) {
        local.pg += 1;
        visitor.pp += 1;
        local.pts += 3;
      } else if (awayGoals > homeGoals) {
        visitor.pg += 1;
        local.pp += 1;
        visitor.pts += 3;
      } else {
        local.pe += 1;
        visitor.pe += 1;
        local.pts += 1;
        visitor.pts += 1;
      }
      local.dif = local.gf - local.gc;
      visitor.dif = visitor.gf - visitor.gc;
    });

    return Object.values(table).sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
  }, [matches]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {sectionTitle("Tabla Liguilla")}
        <div className="flex flex-wrap gap-2">
          {LIGUILLA_GROUPS.map((group) => (
            <button
              key={group}
              onClick={() => onChangeGroup(group)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${activeGroup === group ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
            >
              Grupo {group}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {ALL_DIVISIONES.map((division) => (
          <button
            key={division}
            onClick={() => onChangeDivision(division)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${activeDivision === division ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
          >
            {division}
          </button>
        ))}
      </div>
      <StandingsTable standings={standings} title={`Tabla Liguilla - Grupo ${activeGroup} - ${activeDivision}`} />
    </div>
  );
}

function SuspensionesSection({ players, suspensions, clubs, onSaveSuspension, onDeleteSuspension }) {
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
    duracionTiempoUnidad: TIEMPO_UNITS[0],
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
        duracionTiempoUnidad: suspension.duracionTiempo?.unidad || TIEMPO_UNITS[0],
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
        duracionTiempoUnidad: TIEMPO_UNITS[0],
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
      {sectionTitle("Suspensiones")}
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
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fecha inicio
            <input
              value={form.fechaInicio}
              onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
              placeholder="DD-MM-AAAA"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Tipo
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {SUSPENSION_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          {form.tipo === "fechas" ? (
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Nº fechas
              <input
                type="number"
                min="1"
                value={form.duracionFechas}
                onChange={(e) => setForm({ ...form, duracionFechas: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Duración
                <input
                  type="number"
                  min="1"
                  value={form.duracionTiempoValor}
                  onChange={(e) => setForm({ ...form, duracionTiempoValor: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Unidad
                <select
                  value={form.duracionTiempoUnidad}
                  onChange={(e) => setForm({ ...form, duracionTiempoUnidad: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  {TIEMPO_UNITS.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 lg:col-span-2">
            Motivo
            <textarea
              rows="3"
              value={form.motivo}
              onChange={(e) => setForm({ ...form, motivo: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <div className="lg:col-span-2 flex flex-wrap gap-3 justify-end pt-3">
            <button
              type="button"
              onClick={() => { setFormVisible(false); setEditingSuspension(null); }}
              className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
              Guardar
            </button>
          </div>
        </form>
      </Modal>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-[13px] text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              {["Jugador", "Club", "División", "Inicio", "Duración", "Estado", "Acciones"].map((text) => (
                <th key={text} className="px-3 py-2">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map((suspension) => (
              <tr key={suspension.id} className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{suspension.playerName}</td>
                <td className="px-3 py-2">{suspension.clubName}</td>
                <td className="px-3 py-2">{suspension.division}</td>
                <td className="px-3 py-2">{formatDateForDisplay(suspension.fechaInicio)}</td>
                <td className="px-3 py-2">{suspension.tipo === "fechas" ? `${suspension.duracionFechas} fecha(s)` : `${suspension.duracionTiempo?.valor} ${suspension.duracionTiempo?.unidad}`}</td>
                <td className="px-3 py-2">{suspension.estado}</td>
                <td className="px-3 py-2 space-x-2">
                  <button
                    onClick={() => openForm(suspension)}
                    className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteSuspension(suspension.id)}
                    onClick={() => setDeleteConfirmId(suspension.id)}
                    className="rounded-xl bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">No se encontraron suspensiones.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => { onDeleteSuspension(deleteConfirmId); setDeleteConfirmId(null); }}
        title="¿Eliminar Suspensión?"
        message="¿Estás seguro de que deseas retirar esta suspensión del jugador?"
      />
    </div>
  );
}

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
            {Object.entries(exportOptions).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => onToggleExportOption(key)}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-200">{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
            <button
              onClick={onExportData}
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Exportar seleccionados
            </button>
          </div>
        </ListCard>
      </div>
    </div>
  );
}

function AdminUsuariosSection({ users, onSaveUser, onDeleteUser }) {
  const [formVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ nombre: "", cedula: "", password: "", rol: USER_ROLES[1] });

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
    setForm({ nombre: "", cedula: "", password: "", rol: USER_ROLES[1] });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {sectionTitle("Administración de Usuarios")}
        <button
          onClick={() => {
            setEditingUser(null);
            setForm({ nombre: "", cedula: "", password: "", rol: USER_ROLES[1] });
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
                    onClick={() => onDeleteUser(user.id)}
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
      return <CampeonatoSection clubs={appState.clubs} matches={appState.matches} onSaveMatch={actions.saveMatch} onDeleteMatch={actions.deleteMatch} onRegisterResult={actions.registerResult} />;
    case "tablas":
      return <TablasPosicionesSection clubs={appState.clubs} matches={appState.matches} />;
    case "partidos-liguilla":
      return <PartidosLiguillaSection clubs={appState.clubs} matches={appState.liguillaMatches} activeDivision={appState.activeLiguillaDivisionTab} onSaveMatch={actions.saveLiguillaMatch} onDeleteMatch={actions.deleteLiguillaMatch} onRegisterResult={actions.registerLiguillaResult} onChangeDivision={actions.setLiguillaDivisionTab} />;
    case "tabla-liguilla":
      return <TablaLiguillaSection clubs={appState.clubs} matches={appState.liguillaMatches} groups={appState.liguillaGroups} activeGroup={appState.activeLiguillaGroupTab} activeDivision={appState.activeLiguillaDivisionTab} onChangeGroup={actions.setLiguillaGroupTab} onChangeDivision={actions.setLiguillaDivisionTab} />;
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
