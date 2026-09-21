import React from 'react';
import { APP_LOGO_URL } from '../data/mockData';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151b15] border border-[#202820] rounded-3xl max-w-sm w-full p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[18px] font-bold text-[#e0e8dc]">Athlete Profile</h3>
          <button
            onClick={onClose}
            className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-3.5 bg-[#101510] p-4 rounded-2xl border border-[#202820] mb-4">
          <img
            src={APP_LOGO_URL}
            alt="Alex"
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#aad0ab]/40"
          />
          <div>
            <h4 className="text-[17px] font-bold text-[#e0e8dc]">Alex Mercer</h4>
            <span className="text-[12px] text-[#aad0ab] font-medium block">FitMove Pro Member</span>
            <span className="text-[11px] text-[#a5ada3]">Sync: Apple Watch Ultra (Active)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-[#101510] p-3 rounded-xl border border-[#202820]">
            <span className="text-[11px] text-[#a5ada3] block">Workout Streak</span>
            <span className="text-[16px] font-bold text-[#aad0ab]">5 Days 🔥</span>
          </div>
          <div className="bg-[#101510] p-3 rounded-xl border border-[#202820]">
            <span className="text-[11px] text-[#a5ada3] block">Nutrition Streak</span>
            <span className="text-[16px] font-bold text-[#b8ccb6]">12 Days 🥗</span>
          </div>
        </div>

        <div className="bg-[#101510] p-3.5 rounded-xl border border-[#202820] space-y-2 text-[13px] mb-4">
          <div className="flex justify-between text-[#a5ada3]">
            <span>Daily Step Target</span>
            <span className="text-[#e0e8dc] font-semibold">10,000 steps</span>
          </div>
          <div className="flex justify-between text-[#a5ada3]">
            <span>Daily Calorie Goal</span>
            <span className="text-[#e0e8dc] font-semibold">2,200 kcal</span>
          </div>
          <div className="flex justify-between text-[#a5ada3]">
            <span>Hydration Goal</span>
            <span className="text-[#e0e8dc] font-semibold">3,000 ml</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#aad0ab] hover:bg-[#b8deb9] text-[#27472c] font-bold text-[14px] rounded-xl transition-all shadow-md cursor-pointer"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};
