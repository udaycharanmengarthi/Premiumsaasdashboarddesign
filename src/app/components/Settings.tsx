import { useState } from "react";
import { Globe, RotateCw, Cookie } from "lucide-react";

export function Settings() {
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [proxyUrl, setProxyUrl] = useState("");
  const [retryAttempts, setRetryAttempts] = useState("3");
  const [retryDelay, setRetryDelay] = useState("1000");
  const [cookieSession, setCookieSession] = useState("");

  return (
    <div className="space-y-6 max-w-[900px]">
      <h1 style={{ color: '#1D1D1F' }}>Settings</h1>

      {/* Proxy Settings */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-[#7C8A6A]/10">
            <Globe size={20} className="text-[#7C8A6A]" />
          </div>
          <h2 style={{ color: '#1D1D1F' }}>Proxy Configuration</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div style={{ color: '#1D1D1F' }}>Enable Proxy</div>
              <div className="text-sm text-[#6E6E73]">Route requests through a proxy server</div>
            </div>
            <button
              onClick={() => setProxyEnabled(!proxyEnabled)}
              className={`w-12 h-7 rounded-full transition-all duration-200 ${
                proxyEnabled ? "bg-[#7C8A6A]" : "bg-[#D1D1D6]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                  proxyEnabled ? "translate-x-[22px]" : "translate-x-[4px]"
                }`}
              />
            </button>
          </div>

          {proxyEnabled && (
            <div>
              <label className="block mb-2 text-[#6E6E73]">Proxy URL</label>
              <input
                type="text"
                value={proxyUrl}
                onChange={(e) => setProxyUrl(e.target.value)}
                placeholder="http://proxy.example.com:8080"
                className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 placeholder:text-[#6E6E73]/50 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all"
                style={{ color: '#1D1D1F' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Retry Settings */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-[#7C8A6A]/10">
            <RotateCw size={20} className="text-[#7C8A6A]" />
          </div>
          <h2 style={{ color: '#1D1D1F' }}>Retry Configuration</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[#6E6E73]">Max Retry Attempts</label>
            <input
              type="number"
              value={retryAttempts}
              onChange={(e) => setRetryAttempts(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 placeholder:text-[#6E6E73]/50 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all"
              style={{ color: '#1D1D1F' }}
            />
          </div>
          <div>
            <label className="block mb-2 text-[#6E6E73]">Retry Delay (ms)</label>
            <input
              type="number"
              value={retryDelay}
              onChange={(e) => setRetryDelay(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 placeholder:text-[#6E6E73]/50 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all"
              style={{ color: '#1D1D1F' }}
            />
          </div>
        </div>
      </div>

      {/* Session Settings */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-[#7C8A6A]/10">
            <Cookie size={20} className="text-[#7C8A6A]" />
          </div>
          <h2 style={{ color: '#1D1D1F' }}>Session Management</h2>
        </div>

        <div>
          <label className="block mb-2 text-[#6E6E73]">LinkedIn Session Cookie</label>
          <textarea
            value={cookieSession}
            onChange={(e) => setCookieSession(e.target.value)}
            placeholder="Paste your LinkedIn session cookie here..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 placeholder:text-[#6E6E73]/50 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all resize-none"
            style={{ color: '#1D1D1F' }}
          />
          <p className="mt-2 text-sm text-[#6E6E73]">
            Required for authenticated scraping. Keep this secure and private.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-6 py-3 bg-[#1D1D1F] text-white rounded-2xl hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
            Save Changes
          </button>
          <button className="px-6 py-3 bg-white/80 text-[#1D1D1F] rounded-2xl border border-[#1D1D1F]/10 hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
