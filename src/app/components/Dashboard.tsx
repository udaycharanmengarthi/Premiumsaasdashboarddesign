import { useOutletContext } from "react-router";
import { Users, Briefcase, Building2, FileText, Play, Pause, Square, Download } from "lucide-react";
import { useState, useEffect } from "react";

type OutletContext = {
  status: "idle" | "running" | "paused";
  setStatus: (status: "idle" | "running" | "paused") => void;
};

export function Dashboard() {
  const { status, setStatus } = useOutletContext<OutletContext>();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [maxResults, setMaxResults] = useState("100");
  const [toggles, setToggles] = useState({
    profiles: true,
    jobs: true,
    companies: false,
    posts: false,
  });
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<Array<{ time: string; message: string; type: "info" | "success" | "error" }>>([
    { time: "14:32:18", message: "System initialized", type: "info" },
    { time: "14:32:20", message: "Ready to start scraping", type: "info" },
  ]);

  const stats = {
    profiles: 1847,
    jobs: 342,
    companies: 128,
    posts: 2563,
  };

  useEffect(() => {
    if (status === "running") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("idle");
            setLogs((l) => [...l, { time: new Date().toLocaleTimeString(), message: "Scraping completed successfully", type: "success" }]);
            return 100;
          }
          return prev + 2;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [status, setStatus]);

  const handleStart = () => {
    setStatus("running");
    setProgress(0);
    setLogs((l) => [...l, { time: new Date().toLocaleTimeString(), message: `Started scraping: "${keyword}" in ${location}`, type: "info" }]);
  };

  const handlePause = () => {
    setStatus("paused");
    setLogs((l) => [...l, { time: new Date().toLocaleTimeString(), message: "Scraping paused", type: "info" }]);
  };

  const handleStop = () => {
    setStatus("idle");
    setProgress(0);
    setLogs((l) => [...l, { time: new Date().toLocaleTimeString(), message: "Scraping stopped", type: "error" }]);
  };

  const handleExport = () => {
    setLogs((l) => [...l, { time: new Date().toLocaleTimeString(), message: "Data exported to CSV", type: "success" }]);
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="Profiles" value={stats.profiles} />
        <StatCard icon={Briefcase} label="Jobs" value={stats.jobs} />
        <StatCard icon={Building2} label="Companies" value={stats.companies} />
        <StatCard icon={FileText} label="Posts" value={stats.posts} />
      </div>

      {/* Search Section */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <h2 className="mb-6" style={{ color: '#1D1D1F' }}>Search Parameters</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-[#6E6E73]">Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., Software Engineer"
              className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 placeholder:text-[#6E6E73]/50 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all"
              style={{ color: '#1D1D1F' }}
            />
          </div>
          <div>
            <label className="block mb-2 text-[#6E6E73]">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco"
              className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 placeholder:text-[#6E6E73]/50 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all"
              style={{ color: '#1D1D1F' }}
            />
          </div>
          <div>
            <label className="block mb-2 text-[#6E6E73]">Max Results</label>
            <input
              type="number"
              value={maxResults}
              onChange={(e) => setMaxResults(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 placeholder:text-[#6E6E73]/50 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all"
              style={{ color: '#1D1D1F' }}
            />
          </div>
        </div>
      </div>

      {/* Actions and Toggles */}
      <div className="grid grid-cols-2 gap-6">
        {/* Action Buttons */}
        <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
          <h2 className="mb-6" style={{ color: '#1D1D1F' }}>Actions</h2>
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              disabled={status === "running"}
              className="flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-2xl hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Play size={18} />
              Start
            </button>
            <button
              onClick={handlePause}
              disabled={status !== "running"}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 text-[#1D1D1F] rounded-2xl border border-[#1D1D1F]/10 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Pause size={18} />
              Pause
            </button>
            <button
              onClick={handleStop}
              disabled={status === "idle"}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 text-[#1D1D1F] rounded-2xl border border-[#1D1D1F]/10 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Square size={18} />
              Stop
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 text-[#1D1D1F] rounded-2xl border border-[#1D1D1F]/10 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ml-auto"
            >
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Toggles */}
        <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
          <h2 className="mb-6" style={{ color: '#1D1D1F' }}>Data Types</h2>
          <div className="space-y-4">
            {Object.entries(toggles).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize" style={{ color: '#1D1D1F' }}>{key}</span>
                <button
                  onClick={() => setToggles({ ...toggles, [key]: !value })}
                  className={`w-12 h-7 rounded-full transition-all duration-200 ${
                    value ? "bg-[#7C8A6A]" : "bg-[#D1D1D6]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      value ? "translate-x-[22px]" : "translate-x-[4px]"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: '#1D1D1F' }}>Progress</h2>
          <span className="text-[#6E6E73]">{progress}%</span>
        </div>
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C8B6A6] to-[#7C8A6A] transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Logs */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <h2 className="mb-4" style={{ color: '#1D1D1F' }}>Activity Log</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-3 py-2">
              <span className="text-[#6E6E73] text-sm font-mono">{log.time}</span>
              <span
                className={`px-2 py-0.5 rounded-lg text-xs ${
                  log.type === "success"
                    ? "bg-[#7C8A6A]/20 text-[#7C8A6A]"
                    : log.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-[#C8B6A6]/20 text-[#C8B6A6]"
                }`}
              >
                {log.type}
              </span>
              <span style={{ color: '#1D1D1F' }}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-200">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="p-3 rounded-2xl bg-[#7C8A6A]/10">
          <Icon size={24} className="text-[#7C8A6A]" />
        </div>
        <div className="text-4xl tracking-tight" style={{ color: '#1D1D1F' }}>
          {value.toLocaleString()}
        </div>
        <div className="text-[#6E6E73]">{label}</div>
      </div>
    </div>
  );
}
