import React, { useState, useEffect } from 'react';

export const HealthScreen: React.FC = () => {
  const [liveBpm, setLiveBpm] = useState(72);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(1); // Tuesday 72 BPM
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAllTrendsModal, setShowAllTrendsModal] = useState(false);

  // Subtle live heart rate fluctuation for realism
  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
      setLiveBpm((prev) => {
        const next = prev + variation;
        return next >= 69 && next <= 75 ? next : 72;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const weeklyData = [
    { day: 'M', value: 70, heightPct: 75, active: false },
    { day: 'T', value: 72, heightPct: 80, active: true },
    { day: 'W', value: 68, heightPct: 67, active: false },
    { day: 'T', value: 65, heightPct: 60, active: false },
    { day: 'F', value: 75, heightPct: 84, active: true },
    { day: 'S', value: 62, heightPct: 50, active: false },
    { day: 'S', value: 71, heightPct: 75, active: false },
  ];

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Live Heart Rate Hero Card */}
      <div className="flex flex-col bg-[#101510] rounded-2xl p-5 relative overflow-hidden shadow-xl border border-[#202820]/80">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#aad0ab]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between z-10 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#aad0ab]/20 flex items-center justify-center text-[#aad0ab]">
              <span
                className="material-symbols-outlined text-[20px] animate-pulse text-[#aad0ab]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#e0e8dc]">Heart Rate</h2>
              <p className="text-[12px] text-[#a5ada3]">Live Sensor • Apple Watch Ultra</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#aad0ab]/10 text-[#aad0ab] px-3 py-1 rounded-full text-[12px] font-semibold border border-[#aad0ab]/20">
            <span className="w-2 h-2 rounded-full bg-[#aad0ab] animate-ping" />
            <span>LIVE</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 z-10 mb-3">
          <span className="text-[40px] font-bold text-[#e0e8dc] font-mono leading-none">
            {liveBpm}
          </span>
          <span className="text-[16px] text-[#a5ada3] font-semibold">BPM</span>
          <span className="ml-auto text-[12px] text-[#aad0ab] bg-[#aad0ab]/10 border border-[#aad0ab]/20 px-2.5 py-0.5 rounded-full font-semibold">
            Normal Range
          </span>
        </div>

        {/* Live SVG Graph with animated path */}
        <div className="w-full h-24 z-10">
          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 400 100"
          >
            <defs>
              <linearGradient id="hrGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4be277" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4be277" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,60 Q 30,20 60,50 T 120,40 T 180,70 T 240,30 T 300,50 T 360,40 T 400,60 V 100 H 0 Z"
              fill="url(#hrGradient)"
            />
            <path
              d="M 0,60 Q 30,20 60,50 T 120,40 T 180,70 T 240,30 T 300,50 T 360,40 T 400,60"
              fill="none"
              stroke="#4be277"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <circle className="animate-ping" cx="400" cy="60" fill="#4be277" r="5" />
            <circle cx="400" cy="60" fill="#4be277" r="4" />
          </svg>
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Blood Oxygen Card */}
        <div className="flex flex-col bg-[#101510] rounded-2xl p-4 relative overflow-hidden shadow-md border border-[#202820]/60">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-full bg-[#2e402f] flex items-center justify-center text-[#b1c5af]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pulmonology
              </span>
            </div>
            <span className="text-[12px] text-[#aad0ab] font-semibold">+1% vs avg</span>
          </div>
          <span className="text-[12px] text-[#a5ada3]">Blood Oxygen</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[24px] font-bold text-[#e0e8dc]">98</span>
            <span className="text-[12px] text-[#a5ada3]">% SpO2</span>
          </div>
          <div className="w-full bg-[#202820] h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-[#aad0ab] h-full rounded-full" style={{ width: '98%' }} />
          </div>
        </div>

        {/* HRV Card */}
        <div className="flex flex-col bg-[#101510] rounded-2xl p-4 relative overflow-hidden shadow-md border border-[#202820]/60">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-full bg-[#e8f1b0]/20 flex items-center justify-center text-[#f6ffbe]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                psychology
              </span>
            </div>
            <span className="text-[12px] text-[#aad0ab] font-semibold">Optimal</span>
          </div>
          <span className="text-[12px] text-[#a5ada3]">Heart Rate Var.</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[24px] font-bold text-[#e0e8dc]">64</span>
            <span className="text-[12px] text-[#a5ada3]">ms</span>
          </div>
          <div className="w-full bg-[#202820] h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-[#f6ffbe] h-full rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Skin Temp Card */}
        <div className="flex flex-col bg-[#101510] rounded-2xl p-4 relative overflow-hidden shadow-md border border-[#202820]/60">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-full bg-[#395a3d]/20 flex items-center justify-center text-[#aad0ab]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                thermostat
              </span>
            </div>
            <span className="text-[12px] text-[#aad0ab] font-semibold">Baseline</span>
          </div>
          <span className="text-[12px] text-[#a5ada3]">Skin Temp</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[24px] font-bold text-[#e0e8dc]">97.8</span>
            <span className="text-[12px] text-[#a5ada3]">°F</span>
          </div>
          <div className="w-full bg-[#202820] h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-[#aad0ab] h-full rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Sleep Quality Card */}
        <div className="flex flex-col bg-[#101510] rounded-2xl p-4 relative overflow-hidden shadow-md border border-[#202820]/60">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-full bg-[#2e402f] flex items-center justify-center text-[#b8ccb6]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bedtime
              </span>
            </div>
            <span className="text-[12px] text-[#aad0ab] font-semibold">Great</span>
          </div>
          <span className="text-[12px] text-[#a5ada3]">Sleep Quality</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[24px] font-bold text-[#e0e8dc]">88</span>
            <span className="text-[12px] text-[#a5ada3]">/100</span>
          </div>
          <div className="w-full bg-[#202820] h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-[#b8ccb6] h-full rounded-full" style={{ width: '88%' }} />
          </div>
        </div>
      </div>

      {/* Weekly Trends Section */}
      <div className="flex flex-col bg-[#101510] rounded-2xl p-5 shadow-xl gap-3.5 border border-[#202820]/80">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-[#e0e8dc]">Weekly Trends</h3>
            <p className="text-[12px] text-[#a5ada3]">Average vitals over the last 7 days</p>
          </div>
          <button
            onClick={() => setShowAllTrendsModal(true)}
            className="text-[12px] font-semibold text-[#aad0ab] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Mini Bar Chart */}
        <div className="flex items-end justify-between h-32 pt-3 px-2 bg-[#151b15] rounded-xl border border-[#202820]/60">
          {weeklyData.map((item, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end cursor-pointer group"
              >
                <span className="text-[12px] text-[#a5ada3] group-hover:text-[#e0e8dc]">
                  {item.day}
                </span>
                <div className="w-6 bg-[#202820] rounded-t flex items-end justify-center pb-1 h-20">
                  <div
                    className={`w-full rounded-t transition-all ${
                      isSelected
                        ? 'bg-[#aad0ab] shadow-[0_0_10px_rgba(170,208,171,0.5)]'
                        : item.active
                        ? 'bg-[#aad0ab]/80'
                        : 'bg-[#aad0ab]/35'
                    }`}
                    style={{ height: `${item.heightPct}%` }}
                  />
                </div>
                <span
                  className={`text-[12px] font-semibold ${
                    isSelected ? 'text-[#aad0ab]' : 'text-[#e0e8dc]'
                  }`}
                >
                  {item.value}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Medical Summary Export Card */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#101510] to-[#151b15] p-5 rounded-2xl shadow-lg border border-[#202820]/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#aad0ab] text-[#27472c] flex items-center justify-center shadow-md">
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              description
            </span>
          </div>
          <div>
            <h4 className="text-[16px] font-semibold text-[#e0e8dc]">Medical Summary</h4>
            <p className="text-[12px] text-[#a5ada3]">Export PDF report for your physician</p>
          </div>
        </div>

        <button
          onClick={() => setShowExportModal(true)}
          className="bg-[#aad0ab] hover:bg-[#b8deb9] text-[#27472c] px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Export</span>
        </button>
      </div>

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151b15] border border-[#202820] rounded-3xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#aad0ab]">verified</span>
                <h3 className="text-[18px] font-bold text-[#e0e8dc]">Health Summary PDF</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-[13px] text-[#a5ada3] mb-4">
              A comprehensive clinical summary for Patient <strong className="text-[#e0e8dc]">Alex</strong>:
            </p>

            <div className="bg-[#101510] p-3.5 rounded-xl space-y-2 border border-[#202820] text-[13px] mb-4">
              <div className="flex justify-between">
                <span className="text-[#a5ada3]">Resting Heart Rate</span>
                <span className="text-[#e0e8dc] font-semibold">68 - 72 BPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a5ada3]">SpO2 Average</span>
                <span className="text-[#e0e8dc] font-semibold">98.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a5ada3]">Heart Rate Variability</span>
                <span className="text-[#e0e8dc] font-semibold">64 ms (Optimal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a5ada3]">Average Sleep Duration</span>
                <span className="text-[#e0e8dc] font-semibold">7h 48m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a5ada3]">Device Source</span>
                <span className="text-[#aad0ab] font-semibold">Apple Watch Ultra (v10.4)</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-2.5 bg-[#1b211b] text-[#e0e8dc] rounded-xl text-[13px] font-semibold hover:bg-[#202820]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Medical report PDF downloaded to device successfully!');
                  setShowExportModal(false);
                }}
                className="flex-1 py-2.5 bg-[#aad0ab] text-[#27472c] rounded-xl text-[13px] font-bold hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Trends Detailed View Modal */}
      {showAllTrendsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b15] border border-[#202820] rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[18px] font-bold text-[#e0e8dc]">7-Day Vitals Trend</h3>
              <button
                onClick={() => setShowAllTrendsModal(false)}
                className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex justify-between items-center p-2.5 bg-[#101510] rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1b211b] text-[11px] font-bold text-[#e0e8dc] flex items-center justify-center">
                      {d.day}
                    </span>
                    <span className="text-[13px] text-[#a5ada3]">Oct {18 + i}, 2024</span>
                  </div>
                  <span className="text-[14px] font-semibold text-[#aad0ab]">{d.value} BPM</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllTrendsModal(false)}
              className="mt-4 w-full py-2.5 bg-[#1b211b] text-[#e0e8dc] font-semibold rounded-xl hover:bg-[#202820]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
