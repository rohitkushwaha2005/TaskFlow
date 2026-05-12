import {
  ArrowRightOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  FolderIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Squares2X2Icon },
  { to: "/projects", label: "Projects", icon: FolderIcon },
  { to: "/tasks", label: "Tasks", icon: ClipboardDocumentCheckIcon }
];

const Sidebar = () => {
  const { logout, user } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="border-b border-white/10 bg-[#020617]/80 backdrop-blur-2xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-6 py-8">
        <div className="mb-10 flex flex-col items-center lg:items-start">
          <BrandLogo />
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            {user?.role} Mode
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Navigation</div>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-white/10 text-white shadow-lg shadow-black/20 ring-1 ring-white/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Aesthetics</div>
            <div className="grid grid-cols-4 gap-2">
              {themes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`group relative h-10 overflow-hidden rounded-lg border border-white/10 transition-all hover:scale-110 ${theme === item.id ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-[#020617]" : ""}`}
                  onClick={() => setTheme(item.id)}
                  title={item.label}
                >
                  <span className={`block h-full w-full ${item.swatch}`} />
                  {theme === item.id && <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-[8px] font-black uppercase">Active</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 p-[1px]">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#020617] text-sm font-black text-white">
                {user?.name?.charAt(0)}
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-sm font-bold text-white">{user?.name}</div>
              <div className="truncate text-[10px] font-medium text-slate-500">{user?.email}</div>
            </div>
            <button 
              type="button" 
              onClick={handleLogout} 
              className="group rounded-xl p-2 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
