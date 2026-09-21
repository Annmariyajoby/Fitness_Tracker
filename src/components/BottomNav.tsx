import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'dashboard' },
  { id: 'workout', label: 'Workout', icon: 'fitness_center' },
  { id: 'diet', label: 'Diet', icon: 'restaurant' },
  { id: 'water', label: 'Water', icon: 'water_drop' },
  { id: 'health', label: 'Health', icon: 'favorite' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0b0f0b]/92 backdrop-blur-xl border-t border-[#202820]/40">
      <div className="max-w-md mx-auto flex justify-around items-center h-18 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all ${
                isActive
                  ? 'text-[#aad0ab] font-semibold'
                  : 'text-[#a5ada3] hover:text-[#e0e8dc]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                style={isActive && item.id === 'health' ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
