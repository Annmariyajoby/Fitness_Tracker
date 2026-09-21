import React, { useState } from 'react';
import { TabType } from '../types';
import { RECENT_ACTIVITIES } from '../data/mockData';

interface HomeDashboardProps {
  onNavigate: (tab: TabType) => void;
  onQuickAddWater: (amount: number) => void;
  onOpenLogMeal: () => void;
  waterIntake: number;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onQuickAddWater,
  onOpenLogMeal,
  waterIntake,
}) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Greeting & Status Banner */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[12px] text-[#a5ada3] font-normal">Welcome back, Alex</span>
          <h2 className="text-[24px] font-semibold text-[#e0e8dc] leading-tight">Ready to crush it?</h2>
        </div>
        <div className="flex items-center gap-1.5 bg-[#1b211b] border border-[#202820] px-3.5 py-1.5 rounded-full shadow-sm">
          <span
            className="material-symbols-outlined text-[#aad0ab] text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-[12px] font-semibold text-[#e0e8dc]">5 Day Streak</span>
        </div>
      </div>

      {/* Activity Summary Rings Card */}
      <div className="bg-[#151b15] p-5 rounded-2xl flex flex-col gap-4 shadow-lg border border-[#202820]/60 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#aad0ab]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h3 className="text-[20px] font-semibold text-[#e0e8dc]">Daily Activity</h3>
            <p className="text-[12px] text-[#a5ada3]">Updated 5m ago</p>
          </div>
          <button
            onClick={() => setShowDetailsModal(true)}
            className="text-[#aad0ab] text-[12px] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <span>Details</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center py-1 relative z-10">
          {/* Circular Concentric Rings Visual */}
          <div className="flex justify-center items-center relative py-2">
            <svg className="w-36 h-36 transform -rotate-90">
              {/* Outer Ring: Calories */}
              <circle
                className="text-[#1b211b]"
                cx="72"
                cy="72"
                fill="none"
                r="60"
                stroke="currentColor"
                strokeWidth="10"
              />
              <circle
                className="text-[#aad0ab] transition-all duration-1000 ease-out"
                cx="72"
                cy="72"
                fill="none"
                r="60"
                stroke="currentColor"
                strokeDasharray="377"
                strokeDashoffset="64"
                strokeLinecap="round"
                strokeWidth="10"
              />

              {/* Middle Ring: Steps */}
              <circle
                className="text-[#1b211b]"
                cx="72"
                cy="72"
                fill="none"
                r="46"
                stroke="currentColor"
                strokeWidth="8"
              />
              <circle
                className="text-[#b8ccb6] transition-all duration-1000 ease-out"
                cx="72"
                cy="72"
                fill="none"
                r="46"
                stroke="currentColor"
                strokeDasharray="289"
                strokeDashoffset="86"
                strokeLinecap="round"
                strokeWidth="8"
              />

              {/* Inner Ring: Sleep */}
              <circle
                className="text-[#1b211b]"
                cx="72"
                cy="72"
                fill="none"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
              />
              <circle
                className="text-[#f6ffbe] transition-all duration-1000 ease-out"
                cx="72"
                cy="72"
                fill="none"
                r="32"
                stroke="currentColor"
                strokeDasharray="201"
                strokeDashoffset="35"
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span
                className="material-symbols-outlined text-[#aad0ab] text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="text-[13px] font-semibold text-[#e0e8dc]">640 kcal</span>
            </div>
          </div>

          {/* Metrics Breakdown */}
          <div className="sm:col-span-2 flex flex-col gap-2.5">
            {/* Steps */}
            <div className="bg-[#101510] p-3.5 rounded-xl flex items-center justify-between border border-[#202820]/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#aad0ab]/15 flex items-center justify-center text-[#aad0ab]">
                  <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#a5ada3] block">Steps</span>
                  <span className="text-[18px] font-semibold text-[#e0e8dc]">
                    8,432 <span className="text-[12px] text-[#a5ada3] font-normal">/ 10,000</span>
                  </span>
                </div>
              </div>
              <div className="w-20 bg-[#1b211b] h-2 rounded-full overflow-hidden">
                <div className="bg-[#aad0ab] h-full rounded-full transition-all duration-700" style={{ width: '84%' }} />
              </div>
            </div>

            {/* Calories */}
            <div className="bg-[#101510] p-3.5 rounded-xl flex items-center justify-between border border-[#202820]/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#b8ccb6]/15 flex items-center justify-center text-[#b8ccb6]">
                  <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#a5ada3] block">Active Calories</span>
                  <span className="text-[18px] font-semibold text-[#e0e8dc]">
                    640 <span className="text-[12px] text-[#a5ada3] font-normal">/ 750 kcal</span>
                  </span>
                </div>
              </div>
              <div className="w-20 bg-[#1b211b] h-2 rounded-full overflow-hidden">
                <div className="bg-[#b8ccb6] h-full rounded-full transition-all duration-700" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Sleep */}
            <div className="bg-[#101510] p-3.5 rounded-xl flex items-center justify-between border border-[#202820]/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f6ffbe]/15 flex items-center justify-center text-[#f6ffbe]">
                  <span className="material-symbols-outlined text-[20px]">bedtime</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#a5ada3] block">Sleep</span>
                  <span className="text-[18px] font-semibold text-[#e0e8dc]">
                    7h 48m <span className="text-[12px] text-[#a5ada3] font-normal">/ 8h</span>
                  </span>
                </div>
              </div>
              <div className="w-20 bg-[#1b211b] h-2 rounded-full overflow-hidden">
                <div className="bg-[#f6ffbe] h-full rounded-full transition-all duration-700" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-[#a5ada3]">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('workout')}
            className="bg-[#395a3d] text-[#c7edc7] p-3.5 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer border border-[#aad0ab]/20"
          >
            <span className="material-symbols-outlined text-[26px]">fitness_center</span>
            <span className="text-[12px] font-semibold">Start Workout</span>
          </button>
          
          <button
            onClick={onOpenLogMeal}
            className="bg-[#151b15] hover:bg-[#1b211b] text-[#e0e8dc] p-3.5 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center active:scale-95 transition-all border border-[#202820] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px] text-[#aad0ab]">restaurant</span>
            <span className="text-[12px] font-semibold">Log Meal</span>
          </button>
          
          <button
            onClick={() => onQuickAddWater(250)}
            className="bg-[#151b15] hover:bg-[#1b211b] text-[#e0e8dc] p-3.5 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center active:scale-95 transition-all border border-[#202820] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px] text-[#b8ccb6]">water_drop</span>
            <span className="text-[12px] font-semibold">Add Water</span>
          </button>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-[#a5ada3]">Today's Schedule</h3>
        <div
          onClick={() => onNavigate('workout')}
          className="bg-[#151b15] p-4 rounded-xl flex items-center justify-between shadow-md relative overflow-hidden border border-[#202820] cursor-pointer hover:bg-[#1b211b] transition-all group"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#aad0ab]" />
          <div className="flex items-center gap-3 pl-1">
            <div className="w-11 h-11 rounded-lg bg-[#1b211b] flex items-center justify-center text-[#aad0ab] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">exercise</span>
            </div>
            <div>
              <h4 className="text-[18px] font-semibold text-[#e0e8dc]">Chest &amp; Triceps</h4>
              <p className="text-[12px] text-[#a5ada3]">Hypertrophy Focus • 5 exercises</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] font-semibold text-[#aad0ab] bg-[#aad0ab]/10 border border-[#aad0ab]/20 px-2.5 py-0.5 rounded-full">
              5:30 PM
            </span>
            <span className="text-[12px] text-[#a5ada3] mt-1">45 min</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <h3 className="text-[14px] font-semibold text-[#a5ada3]">Recent Activity</h3>
          <button
            onClick={() => setShowAllActivities(true)}
            className="text-[#aad0ab] text-[12px] font-semibold hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>
        
        <div className="flex flex-col gap-2.5">
          {RECENT_ACTIVITIES.map((act) => {
            const isWater = act.id === 'act-3';
            const displayMetric = isWater ? `+500 ml` : act.metric;
            const displaySecondary = isWater ? `${waterIntake.toLocaleString()} / 3,000 ml` : act.secondaryMetric;

            return (
              <div
                key={act.id}
                className="bg-[#151b15] p-3.5 rounded-xl flex items-center justify-between shadow-sm border border-[#202820]/60"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      act.colorType === 'primary'
                        ? 'bg-[#aad0ab]/15 text-[#aad0ab]'
                        : act.colorType === 'secondary'
                        ? 'bg-[#2e402f] text-[#b1c5af]'
                        : 'bg-[#f6ffbe]/15 text-[#f6ffbe]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#e0e8dc]">{act.title}</h4>
                    <p className="text-[12px] text-[#a5ada3]">{act.timeSubtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[15px] font-semibold text-[#e0e8dc] block">
                    {displayMetric}
                  </span>
                  <span
                    className={`text-[12px] ${
                      act.colorType === 'primary'
                        ? 'text-[#aad0ab]'
                        : act.colorType === 'tertiary'
                        ? 'text-[#b8ccb6]'
                        : 'text-[#a5ada3]'
                    }`}
                  >
                    {displaySecondary}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b15] border border-[#202820] rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-[#e0e8dc]">Daily Activity Breakdown</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="space-y-3 text-[13px]">
              <div className="bg-[#101510] p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-[#aad0ab] font-semibold block">Total Steps</span>
                  <span className="text-[#a5ada3]">Goal: 10,000 steps</span>
                </div>
                <span className="text-[16px] font-bold text-[#e0e8dc]">8,432 (84%)</span>
              </div>
              <div className="bg-[#101510] p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-[#b8ccb6] font-semibold block">Active Burn</span>
                  <span className="text-[#a5ada3]">Goal: 750 kcal</span>
                </div>
                <span className="text-[16px] font-bold text-[#e0e8dc]">640 kcal (85%)</span>
              </div>
              <div className="bg-[#101510] p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-[#f6ffbe] font-semibold block">Restorative Sleep</span>
                  <span className="text-[#a5ada3]">Deep: 2h 15m • REM: 1h 45m</span>
                </div>
                <span className="text-[16px] font-bold text-[#e0e8dc]">7h 48m</span>
              </div>
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="mt-5 w-full py-2.5 bg-[#aad0ab] text-[#27472c] font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* View All Recent Activities Modal */}
      {showAllActivities && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b15] border border-[#202820] rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-[#e0e8dc]">All Activities (Today)</h3>
              <button
                onClick={() => setShowAllActivities(false)}
                className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="p-3 bg-[#101510] rounded-xl flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-[#e0e8dc]">{act.title}</div>
                    <div className="text-[11px] text-[#a5ada3]">{act.timeSubtitle}</div>
                  </div>
                  <div className="text-right text-[13px] font-bold text-[#aad0ab]">{act.metric}</div>
                </div>
              ))}
              <div className="p-3 bg-[#101510] rounded-xl flex justify-between items-center">
                <div>
                  <div className="text-[14px] font-semibold text-[#e0e8dc]">Stretching &amp; Mobility</div>
                  <div className="text-[11px] text-[#a5ada3]">Today, 6:45 AM • 15 mins</div>
                </div>
                <div className="text-right text-[13px] font-bold text-[#aad0ab]">45 kcal</div>
              </div>
            </div>

            <button
              onClick={() => setShowAllActivities(false)}
              className="mt-4 w-full py-2.5 bg-[#1b211b] text-[#e0e8dc] font-semibold rounded-xl hover:bg-[#202820] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
