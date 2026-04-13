import { Outlet, NavLink } from "react-router";
import { LayoutDashboard, Settings, Calendar, Play, Pause, Square } from "lucide-react";
import { useState } from "react";

export function Root() {
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");

  const statusConfig = {
    idle: { color: "text-muted-foreground", bg: "bg-muted/50", label: "Idle" },
    running: { color: "text-[#7C8A6A]", bg: "bg-[#7C8A6A]/10", label: "Running" },
    paused: { color: "text-[#C8B6A6]", bg: "bg-[#C8B6A6]/10", label: "Paused" },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient with blurred shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#C8B6A6]/20 to-[#7C8A6A]/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#7C8A6A]/15 to-[#C8B6A6]/15 blur-[140px]" />
      </div>

      {/* Top Navbar - Glass effect, sticky */}
      <header className="sticky top-0 z-50 backdrop-blur-[20px] bg-white/40 border-b border-white/20 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          <h1 className="tracking-tight" style={{ color: '#1D1D1F' }}>LinkedIn Scraper</h1>
          <div
            className={`px-4 py-1.5 rounded-full ${statusConfig[status].bg} ${statusConfig[status].color} transition-all duration-200`}
          >
            {statusConfig[status].label}
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Floating Sidebar - Glass panel */}
        <aside className="fixed left-6 top-24 bottom-6 w-56 z-40">
          <nav className="h-full backdrop-blur-[20px] bg-white/50 rounded-3xl border border-white/30 shadow-lg p-3">
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#7C8A6A] text-white shadow-md"
                      : "text-[#1D1D1F] hover:bg-white/60 hover:shadow-sm hover:scale-[1.02]"
                  }`
                }
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#7C8A6A] text-white shadow-md"
                      : "text-[#1D1D1F] hover:bg-white/60 hover:shadow-sm hover:scale-[1.02]"
                  }`
                }
              >
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
              <NavLink
                to="/scheduler"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#7C8A6A] text-white shadow-md"
                      : "text-[#1D1D1F] hover:bg-white/60 hover:shadow-sm hover:scale-[1.02]"
                  }`
                }
              >
                <Calendar size={20} />
                <span>Scheduler</span>
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 px-8 py-6">
          <Outlet context={{ status, setStatus }} />
        </main>
      </div>
    </div>
  );
}
