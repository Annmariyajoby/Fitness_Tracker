import React from 'react';
import { TabType } from '../types';
import { APP_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

const TAB_TITLES: Record<TabType, string> = {
  home: 'Home Dashboard',
  workout: 'Workout',
  diet: 'Diet Meals',
  water: 'Water',
  health: 'Health',
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0b0f0b]/85 backdrop-blur-xl pt-safe border-b border-[#202820]/40">
      <div className="max-w-md mx-auto h-16 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            alt="FitMove Logo"
            className="h-8 w-8 rounded-lg object-cover shadow-sm ring-1 ring-white/10"
            src={APP_LOGO_URL}
          />
          <span className="text-[20px] font-semibold text-[#e0e8dc] tracking-tight">
            {TAB_TITLES[currentTab]}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center text-[#a5ada3] hover:text-[#e0e8dc] hover:bg-[#151b15] rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#aad0ab] rounded-full ring-2 ring-[#0b0f0b] animate-pulse" />
            )}
          </button>
          
          <button
            onClick={onOpenProfile}
            aria-label="Profile"
            className="w-10 h-10 flex items-center justify-center text-[#a5ada3] hover:text-[#e0e8dc] hover:bg-[#151b15] rounded-full transition-colors ml-0.5"
          >
            <img
              alt="Alex Avatar"
              src={APP_LOGO_URL}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#aad0ab]/40"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
