import React, { useState } from 'react';
import { HydrationLog } from '../types';
import { INITIAL_HYDRATION_LOGS } from '../data/mockData';

interface WaterScreenProps {
  waterIntake: number;
  onAddWater: (amount: number, label?: string) => void;
  hourlyLogs: HydrationLog[];
}

export const WaterScreen: React.FC<WaterScreenProps> = ({
  waterIntake,
  onAddWater,
  hourlyLogs,
}) => {
  const [smartReminders, setSmartReminders] = useState(true);
  const targetWater = 3000;
  const percentage = Math.min(100, Math.round((waterIntake / targetWater) * 100));
  const remaining = Math.max(0, targetWater - waterIntake);

  const handleQuickAdd = (amount: number, typeName: string) => {
    onAddWater(amount, typeName);
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Hero Hydration Status Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#151b15] p-5 flex flex-col gap-4 shadow-lg border border-[#202820]/80">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-[#aad0ab]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-[11px] font-semibold text-[#a5ada3] uppercase tracking-wider">
              Daily Hydration
            </span>
            <h2 className="text-[32px] font-bold text-[#e0e8dc] mt-0.5 leading-tight">
              {waterIntake.toLocaleString()}{' '}
              <span className="text-[16px] text-[#a5ada3] font-normal">
                / {targetWater.toLocaleString()} ml
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#aad0ab]/10 text-[#aad0ab] border border-[#aad0ab]/20">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span className="text-[12px] font-semibold">{percentage}% Complete</span>
          </div>
        </div>

        {/* Visual Water Bottle Progress Indicator */}
        <div className="flex items-center gap-5 my-1 relative z-10">
          {/* Stylized Bottle Cylinder */}
          <div className="relative w-26 h-42 rounded-2xl bg-[#101510] border border-[#202820] overflow-hidden flex flex-col justify-end p-1.5 shadow-inner">
            {/* Water Fill Level */}
            <div
              className="w-full bg-gradient-to-t from-[#395a3d] to-[#aad0ab] transition-all duration-700 ease-out flex flex-col items-center justify-start pt-2 rounded-xl relative shadow-[0_0_15px_rgba(170,208,171,0.2)]"
              style={{ height: `${percentage}%` }}
            >
              {/* Wave ripple effect simulation via CSS */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-white/30 animate-pulse rounded-full" />
              <span className="text-[#0b0f0b] text-[12px] font-bold drop-shadow-sm">
                {percentage}%
              </span>
            </div>

            {/* Bottle Neck & Cap graphic styling lines */}
            <div className="absolute inset-0 border-2 border-[#424a41]/20 rounded-2xl pointer-events-none" />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#a5ada3]">Remaining</span>
              <span className="text-[#e0e8dc] font-semibold">{remaining} ml</span>
            </div>
            <div className="w-full bg-[#0b0f0b] h-2.5 rounded-full overflow-hidden border border-[#202820]">
              <div
                className="bg-[#aad0ab] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(170,208,171,0.4)]"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[12px] text-[#a5ada3] leading-relaxed mt-0.5">
              {remaining > 0
                ? `You're doing great! Just ${Math.ceil(remaining / 250)} more glasses to hit your peak performance goal.`
                : 'Hydration goal achieved for today! Outstanding work.'}
            </p>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-2.5 relative z-10 pt-1">
          <button
            onClick={() => handleQuickAdd(250, 'Glass')}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-[#1b211b] hover:bg-[#aad0ab]/20 hover:text-[#aad0ab] transition-all active:scale-95 group border border-[#202820] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#aad0ab] mb-1 group-hover:scale-110 transition-transform text-[22px]">
              water_drop
            </span>
            <span className="text-[14px] font-semibold text-[#e0e8dc] group-hover:text-[#aad0ab]">
              +250 ml
            </span>
            <span className="text-[11px] text-[#a5ada3]">Glass</span>
          </button>

          <button
            onClick={() => handleQuickAdd(500, 'Bottle')}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-[#1b211b] hover:bg-[#aad0ab]/20 hover:text-[#aad0ab] transition-all active:scale-95 group border border-[#202820] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#aad0ab] mb-1 group-hover:scale-110 transition-transform text-[22px]">
              local_drink
            </span>
            <span className="text-[14px] font-semibold text-[#e0e8dc] group-hover:text-[#aad0ab]">
              +500 ml
            </span>
            <span className="text-[11px] text-[#a5ada3]">Bottle</span>
          </button>

          <button
            onClick={() => handleQuickAdd(750, 'Jug')}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-[#1b211b] hover:bg-[#aad0ab]/20 hover:text-[#aad0ab] transition-all active:scale-95 group border border-[#202820] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#aad0ab] mb-1 group-hover:scale-110 transition-transform text-[22px]">
              fitness_center
            </span>
            <span className="text-[14px] font-semibold text-[#e0e8dc] group-hover:text-[#aad0ab]">
              +750 ml
            </span>
            <span className="text-[11px] text-[#a5ada3]">Jug</span>
          </button>
        </div>
      </div>

      {/* Hydration Reminder Toggle Card */}
      <div className="rounded-2xl bg-[#151b15] p-4 flex items-center justify-between shadow-md border border-[#202820]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2e402f] flex items-center justify-center text-[#b1c5af]">
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
          </div>
          <div>
            <h4 className="text-[16px] font-semibold text-[#e0e8dc]">Smart Reminders</h4>
            <p className="text-[12px] text-[#a5ada3]">Notify every 60 mins while active</p>
          </div>
        </div>

        {/* Custom toggle switch */}
        <button
          role="switch"
          aria-checked={smartReminders}
          onClick={() => setSmartReminders(!smartReminders)}
          className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
            smartReminders ? 'bg-[#aad0ab]' : 'bg-[#1b211b] border border-[#202820]'
          }`}
        >
          <div
            className={`w-4.5 h-4.5 rounded-full transition-transform ${
              smartReminders
                ? 'translate-x-5.5 bg-[#26462b]'
                : 'translate-x-0 bg-[#a5ada3]'
            }`}
          />
        </button>
      </div>

      {/* Hourly Intake Log Timeline */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-[18px] font-semibold text-[#e0e8dc]">Hourly Log</h3>
          <span className="text-[12px] font-semibold text-[#aad0ab]">Today, Oct 24</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {hourlyLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#151b15] border border-[#202820]/60 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#aad0ab]/10 flex items-center justify-center text-[#aad0ab] shrink-0 border border-[#aad0ab]/20">
                <span className="material-symbols-outlined text-[20px]">{log.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h5 className="text-[14px] font-semibold text-[#e0e8dc] truncate">
                    {log.title}
                  </h5>
                  <span className="text-[12px] text-[#a5ada3]">{log.time}</span>
                </div>
                <p className="text-[12px] text-[#a5ada3]">{log.description}</p>
              </div>
              <span className="text-[14px] font-bold text-[#aad0ab]">+{log.amount} ml</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
