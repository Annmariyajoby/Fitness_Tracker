import React, { useState } from 'react';
import { TabType, HydrationLog } from './types';
import { INITIAL_HYDRATION_LOGS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { WorkoutScreen } from './components/WorkoutScreen';
import { DietScreen } from './components/DietScreen';
import { WaterScreen } from './components/WaterScreen';
import { HealthScreen } from './components/HealthScreen';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [waterIntake, setWaterIntake] = useState(2250);
  const [hourlyLogs, setHourlyLogs] = useState<HydrationLog[]>(INITIAL_HYDRATION_LOGS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const handleAddWater = (amount: number, label: string = 'Intake') => {
    setWaterIntake((prev) => prev + amount);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog: HydrationLog = {
      id: `water-log-${Date.now()}`,
      title: `${label} Hydration`,
      time: timeStr,
      description: 'Chilled pure water',
      amount: amount,
      icon: amount >= 750 ? 'fitness_center' : amount >= 500 ? 'local_drink' : 'water_drop',
    };
    setHourlyLogs((prev) => [newLog, ...prev]);
    showToast(`Added +${amount} ml of water!`);
  };

  return (
    <div className="min-h-screen bg-[#060806] flex justify-center text-[#e0e8dc] selection:bg-[#aad0ab] selection:text-[#0b0f0b]">
      {/* Mobile App Container Frame */}
      <div className="w-full max-w-md min-h-screen bg-[#0b0f0b] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-[#202820]/30">
        
        {/* Top Sticky Header */}
        <Header
          currentTab={currentTab}
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenProfile={() => setShowProfile(true)}
          unreadCount={unreadCount}
        />

        {/* Main Screen Content */}
        <main className="flex-1 w-full px-5 pt-20 pb-26 flex flex-col overflow-x-hidden">
          {currentTab === 'home' && (
            <HomeDashboard
              onNavigate={(tab) => setCurrentTab(tab)}
              onQuickAddWater={(amount) => handleAddWater(amount, 'Quick Glass')}
              onOpenLogMeal={() => setCurrentTab('diet')}
              waterIntake={waterIntake}
            />
          )}

          {currentTab === 'workout' && <WorkoutScreen />}

          {currentTab === 'diet' && (
            <DietScreen onShowToast={(msg) => showToast(msg)} />
          )}

          {currentTab === 'water' && (
            <WaterScreen
              waterIntake={waterIntake}
              onAddWater={handleAddWater}
              hourlyLogs={hourlyLogs}
            />
          )}

          {currentTab === 'health' && <HealthScreen />}
        </main>

        {/* Bottom Persistent Navigation Bar */}
        <BottomNav currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-22 inset-x-4 max-w-sm mx-auto bg-[#1b211b] border border-[#aad0ab]/40 text-[#e0e8dc] p-3.5 rounded-2xl shadow-2xl flex items-center justify-between z-50 animate-bounceOnce">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#aad0ab]/20 flex items-center justify-center text-[#aad0ab]">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <span className="text-[13px] font-medium">{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#a5ada3] hover:text-[#e0e8dc] p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* Notifications Modal */}
        {showNotifications && (
          <NotificationsModal
            onClose={() => setShowNotifications(false)}
            onClear={() => {
              setUnreadCount(0);
              setShowNotifications(false);
              showToast('All notifications cleared');
            }}
          />
        )}

        {/* Profile Modal */}
        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      </div>
    </div>
  );
}
