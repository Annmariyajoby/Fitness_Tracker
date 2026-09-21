import React from 'react';

interface NotificationsModalProps {
  onClose: () => void;
  onClear: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose, onClear }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151b15] border border-[#202820] rounded-2xl max-w-sm w-full p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#aad0ab] text-[20px]">notifications</span>
            <h3 className="text-[18px] font-bold text-[#e0e8dc]">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5 my-3">
          <div className="p-3 bg-[#101510] rounded-xl border border-[#202820] flex gap-3">
            <span className="material-symbols-outlined text-[#aad0ab] text-[20px] shrink-0 mt-0.5">
              water_drop
            </span>
            <div>
              <h4 className="text-[13px] font-semibold text-[#e0e8dc]">Hydration Check-in</h4>
              <p className="text-[12px] text-[#a5ada3]">
                Just 750 ml remaining to hit your daily 3,000 ml goal!
              </p>
              <span className="text-[10px] text-[#a5ada3] mt-1 block">15m ago</span>
            </div>
          </div>

          <div className="p-3 bg-[#101510] rounded-xl border border-[#202820] flex gap-3">
            <span className="material-symbols-outlined text-[#b8ccb6] text-[20px] shrink-0 mt-0.5">
              fitness_center
            </span>
            <div>
              <h4 className="text-[13px] font-semibold text-[#e0e8dc]">Workout Reminder</h4>
              <p className="text-[12px] text-[#a5ada3]">
                Chest &amp; Triceps session scheduled at 5:30 PM.
              </p>
              <span className="text-[10px] text-[#a5ada3] mt-1 block">1h ago</span>
            </div>
          </div>

          <div className="p-3 bg-[#101510] rounded-xl border border-[#202820] flex gap-3">
            <span className="material-symbols-outlined text-[#f6ffbe] text-[20px] shrink-0 mt-0.5">
              favorite
            </span>
            <div>
              <h4 className="text-[13px] font-semibold text-[#e0e8dc]">Resting Vitals Normal</h4>
              <p className="text-[12px] text-[#a5ada3]">
                Resting Heart Rate averaged 72 BPM with optimal HRV.
              </p>
              <span className="text-[10px] text-[#a5ada3] mt-1 block">3h ago</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClear}
            className="flex-1 py-2 bg-[#1b211b] text-[#a5ada3] hover:text-[#e0e8dc] text-[12px] font-semibold rounded-xl"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-[#aad0ab] text-[#27472c] text-[12px] font-bold rounded-xl hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
