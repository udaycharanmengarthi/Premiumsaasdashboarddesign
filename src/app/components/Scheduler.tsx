import { useState } from "react";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

export function Scheduler() {
  const [schedulerEnabled, setSchedulerEnabled] = useState(false);
  const [frequency, setFrequency] = useState("daily");
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [selectedDays, setSelectedDays] = useState<string[]>(["monday", "wednesday", "friday"]);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const getNextRun = () => {
    if (!schedulerEnabled) return "Scheduler is disabled";
    const now = new Date();
    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const next = new Date(now);
    next.setHours(hours, minutes, 0, 0);

    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }

    return next.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-6 max-w-[900px]">
      <h1 style={{ color: '#1D1D1F' }}>Scheduler</h1>

      {/* Enable Scheduler */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#7C8A6A]/10">
              <Clock size={20} className="text-[#7C8A6A]" />
            </div>
            <div>
              <h2 style={{ color: '#1D1D1F' }}>Automated Scheduling</h2>
              <p className="text-sm text-[#6E6E73]">Run scraping tasks automatically at scheduled times</p>
            </div>
          </div>
          <button
            onClick={() => setSchedulerEnabled(!schedulerEnabled)}
            className={`w-12 h-7 rounded-full transition-all duration-200 ${
              schedulerEnabled ? "bg-[#7C8A6A]" : "bg-[#D1D1D6]"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                schedulerEnabled ? "translate-x-[22px]" : "translate-x-[4px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Schedule Configuration */}
      <div
        className={`backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8 transition-opacity duration-200 ${
          schedulerEnabled ? "opacity-100" : "opacity-50 pointer-events-none"
        }`}
      >
        <h2 className="mb-6" style={{ color: '#1D1D1F' }}>Schedule Configuration</h2>

        <div className="space-y-6">
          {/* Frequency */}
          <div>
            <label className="block mb-3 text-[#6E6E73]">Frequency</label>
            <div className="grid grid-cols-4 gap-3">
              {["hourly", "daily", "weekly", "monthly"].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`px-4 py-3 rounded-2xl capitalize transition-all duration-200 ${
                    frequency === freq
                      ? "bg-[#7C8A6A] text-white shadow-md"
                      : "bg-white/50 text-[#1D1D1F] border border-white/40 hover:bg-white/80 hover:shadow-sm"
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="block mb-2 text-[#6E6E73]">Scheduled Time</label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]/30 transition-all"
              style={{ color: '#1D1D1F' }}
            />
          </div>

          {/* Days Selection (for weekly) */}
          {frequency === "weekly" && (
            <div>
              <label className="block mb-3 text-[#6E6E73]">Active Days</label>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-xl capitalize transition-all duration-200 ${
                      selectedDays.includes(day)
                        ? "bg-[#7C8A6A] text-white shadow-md"
                        : "bg-white/50 text-[#1D1D1F] border border-white/40 hover:bg-white/80"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Run Info */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-[#C8B6A6]/10">
            <CalendarIcon size={20} className="text-[#C8B6A6]" />
          </div>
          <h2 style={{ color: '#1D1D1F' }}>Next Scheduled Run</h2>
        </div>
        <p className="text-[#6E6E73] pl-11">{getNextRun()}</p>
      </div>

      {/* Recent Scheduled Runs */}
      <div className="backdrop-blur-[20px] bg-white/65 rounded-3xl border border-white/30 shadow-lg p-8">
        <h2 className="mb-4" style={{ color: '#1D1D1F' }}>Recent Scheduled Runs</h2>
        <div className="space-y-3">
          {[
            { date: "April 12, 2026 at 09:00 AM", status: "success", count: 247 },
            { date: "April 10, 2026 at 09:00 AM", status: "success", count: 198 },
            { date: "April 8, 2026 at 09:00 AM", status: "success", count: 312 },
          ].map((run, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/30"
            >
              <div>
                <div style={{ color: '#1D1D1F' }}>{run.date}</div>
                <div className="text-sm text-[#6E6E73]">{run.count} results collected</div>
              </div>
              <div className="px-3 py-1 rounded-lg bg-[#7C8A6A]/20 text-[#7C8A6A] text-sm">
                Success
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
