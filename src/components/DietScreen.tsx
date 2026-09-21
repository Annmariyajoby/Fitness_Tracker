import React, { useState } from 'react';
import { MealItem } from '../types';
import { INITIAL_MEALS } from '../data/mockData';

interface DietScreenProps {
  onShowToast: (message: string) => void;
}

export const DietScreen: React.FC<DietScreenProps> = ({ onShowToast }) => {
  const [meals, setMeals] = useState<MealItem[]>(INITIAL_MEALS);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'>('Dinner');
  const [foodName, setFoodName] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('520');
  const [proteinInput, setProteinInput] = useState('42');
  const [carbsInput, setCarbsInput] = useState('35');
  const [fatsInput, setFatsInput] = useState('18');

  // Calculate totals
  const totalCalories = meals.reduce((sum, m) => sum + (m.logged ? m.calories : 0), 0);
  const targetCalories = 2200;
  const remainingCalories = Math.max(0, targetCalories - totalCalories);
  const burnedCalories = 480;

  const totalProtein = meals.reduce((sum, m) => sum + (m.logged ? m.protein : 0), 0);
  const targetProtein = 160;

  const totalCarbs = meals.reduce((sum, m) => sum + (m.logged ? m.carbs : 0), 0);
  const targetCarbs = 220;

  const totalFats = meals.reduce((sum, m) => sum + (m.logged ? m.fats : 0), 0);
  const targetFats = 70;

  // Ring offset (circumference = 314)
  const calorieRatio = Math.min(1, totalCalories / targetCalories);
  const ringOffset = 314 - 314 * calorieRatio;

  const handleOpenAddModal = (mealType?: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks') => {
    if (mealType) {
      setSelectedMealType(mealType);
      if (mealType === 'Dinner') {
        setFoodName('Grilled Salmon & Asparagus');
        setCaloriesInput('520');
      } else {
        setFoodName('');
        setCaloriesInput('350');
      }
    }
    setShowLogModal(true);
  };

  const handleSaveMeal = () => {
    const cal = Number(caloriesInput) || 0;
    const pro = Number(proteinInput) || 0;
    const carb = Number(carbsInput) || 0;
    const fat = Number(fatsInput) || 0;

    setMeals((prev) =>
      prev.map((m) => {
        if (m.type === selectedMealType) {
          return {
            ...m,
            name: foodName.trim() || 'Healthy Selection',
            calories: cal,
            protein: pro,
            carbs: carb,
            fats: fat,
            logged: true,
          };
        }
        return m;
      })
    );

    setShowLogModal(false);
    onShowToast(`${selectedMealType} logged (+${cal} kcal)`);
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Day Selector / Streak Bar */}
      <div className="flex items-center justify-between bg-[#151b15] rounded-2xl p-4 shadow-md border border-[#202820]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#aad0ab]/10 flex items-center justify-center text-[#aad0ab] border border-[#aad0ab]/20">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-[#e0e8dc]">Today</h2>
            <p className="text-[12px] text-[#a5ada3]">Oct 24, 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#1b211b] border border-[#202820] px-3.5 py-1.5 rounded-full">
          <span
            className="material-symbols-outlined text-[#aad0ab] text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-[12px] font-semibold text-[#e0e8dc]">12 Day Streak</span>
        </div>
      </div>

      {/* Calorie & Macros Bento Card */}
      <div className="bg-[#151b15] rounded-2xl p-5 shadow-lg border border-[#202820]/80 flex flex-col gap-5 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#aad0ab]/8 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          {/* Circular Progress Ring Visual */}
          <div className="relative w-38 h-38 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                className="text-[#1b211b]"
                cx="60"
                cy="60"
                fill="none"
                r="50"
                stroke="currentColor"
                strokeWidth="12"
              />
              <circle
                className="text-[#aad0ab] transition-all duration-700 ease-out"
                cx="60"
                cy="60"
                fill="none"
                r="50"
                stroke="currentColor"
                strokeDasharray="314"
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[24px] font-bold text-[#e0e8dc]">
                {totalCalories.toLocaleString()}
              </span>
              <span className="text-[12px] text-[#a5ada3]">
                / {targetCalories.toLocaleString()} kcal
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col gap-2.5 flex-1 w-full">
            <div className="flex justify-between items-center bg-[#1b211b] p-3 rounded-xl border border-[#202820]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f6ffbe]/15 flex items-center justify-center text-[#f6ffbe]">
                  <span className="material-symbols-outlined text-[18px]">flag</span>
                </div>
                <span className="text-[13px] font-medium text-[#e0e8dc]">Remaining</span>
              </div>
              <span className="text-[16px] font-semibold text-[#e0e8dc]">
                {remainingCalories} kcal
              </span>
            </div>

            <div className="flex justify-between items-center bg-[#1b211b] p-3 rounded-xl border border-[#202820]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#aad0ab]/15 flex items-center justify-center text-[#aad0ab]">
                  <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                </div>
                <span className="text-[13px] font-medium text-[#e0e8dc]">Burned</span>
              </div>
              <span className="text-[16px] font-semibold text-[#e0e8dc]">
                {burnedCalories} kcal
              </span>
            </div>
          </div>
        </div>

        {/* Macronutrient Breakdown Bars */}
        <div className="flex flex-col gap-3 pt-2 bg-[#101510] p-4 rounded-xl border border-[#202820]/60 relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-semibold text-[#e0e8dc]">Macronutrients</span>
            <span className="text-[12px] text-[#a5ada3]">Target Balanced</span>
          </div>

          {/* Protein */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[12px]">
              <span className="text-[#e0e8dc] font-medium">Protein</span>
              <span className="text-[#a5ada3]">
                {totalProtein}g / {targetProtein}g
              </span>
            </div>
            <div className="w-full bg-[#1b211b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#aad0ab] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalProtein / targetProtein) * 100))}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[12px]">
              <span className="text-[#e0e8dc] font-medium">Carbs</span>
              <span className="text-[#a5ada3]">
                {totalCarbs}g / {targetCarbs}g
              </span>
            </div>
            <div className="w-full bg-[#1b211b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#b8ccb6] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalCarbs / targetCarbs) * 100))}%` }}
              />
            </div>
          </div>

          {/* Fats */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[12px]">
              <span className="text-[#e0e8dc] font-medium">Fats</span>
              <span className="text-[#a5ada3]">
                {totalFats}g / {targetFats}g
              </span>
            </div>
            <div className="w-full bg-[#1b211b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#f6ffbe] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalFats / targetFats) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Meals Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] font-semibold text-[#e0e8dc]">Today's Meals</h3>
          <button
            onClick={() => handleOpenAddModal()}
            className="flex items-center gap-1 text-[#aad0ab] text-[13px] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Log Meal</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {meals.map((meal) => {
            if (!meal.logged) {
              return (
                <div
                  key={meal.id}
                  className="bg-[#151b15] rounded-2xl p-4 shadow-sm border border-[#202820]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-xl bg-[#1b211b] border border-[#202820] flex items-center justify-center text-[#a5ada3] flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">restaurant</span>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-[#e0e8dc]">{meal.type}</h4>
                      <p className="text-[12px] text-[#a5ada3]">Not logged yet</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenAddModal(meal.type)}
                    className="px-4 py-2 rounded-xl bg-[#aad0ab] text-[#27472c] text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                  >
                    Add Food
                  </button>
                </div>
              );
            }

            return (
              <div
                key={meal.id}
                className="bg-[#151b15] rounded-2xl p-3.5 shadow-sm border border-[#202820]/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  {meal.imageUrl ? (
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      className="w-13 h-13 rounded-xl object-cover flex-shrink-0 ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="w-13 h-13 rounded-xl bg-[#1b211b] border border-[#202820] flex items-center justify-center text-[#aad0ab] flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">lunch_dining</span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[15px] font-semibold text-[#e0e8dc]">{meal.type}</h4>
                      <span className="text-[12px] text-[#a5ada3]">• {meal.calories} kcal</span>
                    </div>
                    <p className="text-[13px] text-[#a5ada3]">{meal.name}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAddModal(meal.type)}
                  className="w-9 h-9 rounded-full bg-[#1b211b] flex items-center justify-center text-[#a5ada3] hover:text-[#e0e8dc] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Add CTA Bar */}
      <div className="pt-2">
        <button
          onClick={() => handleOpenAddModal()}
          className="w-full py-3.5 rounded-2xl bg-[#aad0ab] hover:bg-[#b8deb9] text-[#27472c] font-bold text-[15px] shadow-[0_10px_25px_-5px_rgba(75,226,119,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Log Meal or Snack</span>
        </button>
      </div>

      {/* Log Meal Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b15] border border-[#202820] rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-[#e0e8dc]">Log Meal</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[12px] text-[#a5ada3] block mb-1">Meal Category</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Breakfast', 'Lunch', 'Dinner', 'Snacks'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedMealType(type)}
                      className={`py-1.5 text-[11px] rounded-lg font-semibold border transition-all ${
                        selectedMealType === type
                          ? 'bg-[#aad0ab] text-[#27472c] border-[#aad0ab]'
                          : 'bg-[#1b211b] text-[#a5ada3] border-[#202820]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[12px] text-[#a5ada3] block mb-1">Meal / Food Description</label>
                <input
                  type="text"
                  placeholder="e.g. Grilled Salmon & Quinoa"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full bg-[#101510] border border-[#202820] rounded-xl px-3.5 py-2 text-[14px] text-[#e0e8dc] focus:outline-none focus:border-[#aad0ab]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[12px] text-[#a5ada3] block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={caloriesInput}
                    onChange={(e) => setCaloriesInput(e.target.value)}
                    className="w-full bg-[#101510] border border-[#202820] rounded-xl px-3.5 py-2 text-[14px] text-[#e0e8dc] focus:outline-none focus:border-[#aad0ab]"
                  />
                </div>
                <div>
                  <label className="text-[12px] text-[#a5ada3] block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={proteinInput}
                    onChange={(e) => setProteinInput(e.target.value)}
                    className="w-full bg-[#101510] border border-[#202820] rounded-xl px-3.5 py-2 text-[14px] text-[#e0e8dc] focus:outline-none focus:border-[#aad0ab]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[12px] text-[#a5ada3] block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={carbsInput}
                    onChange={(e) => setCarbsInput(e.target.value)}
                    className="w-full bg-[#101510] border border-[#202820] rounded-xl px-3.5 py-2 text-[14px] text-[#e0e8dc] focus:outline-none focus:border-[#aad0ab]"
                  />
                </div>
                <div>
                  <label className="text-[12px] text-[#a5ada3] block mb-1">Fats (g)</label>
                  <input
                    type="number"
                    value={fatsInput}
                    onChange={(e) => setFatsInput(e.target.value)}
                    className="w-full bg-[#101510] border border-[#202820] rounded-xl px-3.5 py-2 text-[14px] text-[#e0e8dc] focus:outline-none focus:border-[#aad0ab]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => setShowLogModal(false)}
                className="flex-1 py-2.5 bg-[#1b211b] text-[#e0e8dc] rounded-xl text-[13px] font-semibold hover:bg-[#202820]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMeal}
                className="flex-1 py-2.5 bg-[#aad0ab] text-[#27472c] rounded-xl text-[13px] font-bold hover:opacity-90"
              >
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
