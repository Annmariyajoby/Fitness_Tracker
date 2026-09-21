import React, { useState, useEffect } from 'react';
import { ExerciseItem, ExerciseSet } from '../types';
import { INITIAL_EXERCISES } from '../data/mockData';

export const WorkoutScreen: React.FC = () => {
  const [exercises, setExercises] = useState<ExerciseItem[]>(INITIAL_EXERCISES);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(46 * 60 + 38);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseTarget, setNewExerciseTarget] = useState('Chest');

  // Workout live timer
  useEffect(() => {
    if (isPaused || showFinishModal) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, showFinishModal]);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const toggleSetDone = (exerciseId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => (s.id === setId ? { ...s, done: !s.done } : s)),
        };
      })
    );
  };

  const updateSetField = (
    exerciseId: string,
    setId: string,
    field: 'lbs' | 'reps',
    value: number
  ) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => (s.id === setId ? { ...s, [field]: value } : s)),
        };
      })
    );
  };

  const handleAddSet = (exerciseId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSetNumber = ex.sets.length + 1;
        const newSet: ExerciseSet = {
          id: `set-${Date.now()}-${Math.random()}`,
          setNumber: newSetNumber,
          lbs: lastSet ? lastSet.lbs : 135,
          reps: lastSet ? lastSet.reps : 10,
          done: false,
        };
        return {
          ...ex,
          sets: [...ex.sets, newSet],
        };
      })
    );
  };

  const handleAddNewExercise = (name: string, target: string) => {
    if (!name.trim()) return;
    const newEx: ExerciseItem = {
      id: `ex-${Date.now()}`,
      name: name.trim(),
      target: target,
      subtitle: `${target} • 3 sets x 10 reps @ 100 lbs`,
      sets: [
        { id: `s-${Date.now()}-1`, setNumber: 1, lbs: 100, reps: 10, done: false },
        { id: `s-${Date.now()}-2`, setNumber: 2, lbs: 100, reps: 10, done: false },
        { id: `s-${Date.now()}-3`, setNumber: 3, lbs: 100, reps: 10, done: false },
      ],
    };
    setExercises((prev) => [...prev, newEx]);
    setShowAddExerciseModal(false);
    setNewExerciseName('');
  };

  // Calculate total completed sets
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const doneSets = exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.done).length,
    0
  );
  const progressPct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 66;

  // Total volume lifted
  const totalVolume = exercises.reduce((acc, ex) => {
    return (
      acc +
      ex.sets
        .filter((s) => s.done)
        .reduce((sum, s) => sum + s.lbs * s.reps, 0)
    );
  }, 0);

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Active Workout Hero / Session Timer Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#151b15] p-5 shadow-xl border border-[#202820]/80 flex flex-col gap-4">
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#aad0ab]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {!isPaused && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#aad0ab] opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isPaused ? 'bg-amber-400' : 'bg-[#aad0ab]'}`} />
            </span>
            <span className="text-[12px] uppercase tracking-wider text-[#aad0ab] font-semibold">
              {isPaused ? 'Session Paused' : 'Live Session'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0b0f0b] px-3.5 py-1 rounded-full border border-[#202820]">
            <span className="material-symbols-outlined text-[#aad0ab] text-[18px]">timer</span>
            <span className="text-[18px] font-bold tracking-tight text-[#e0e8dc] font-mono">
              {formatTimer(seconds)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 relative z-10">
          <h1 className="text-[24px] font-semibold text-[#e0e8dc]">Upper Body Hypertrophy</h1>
          <p className="text-[14px] text-[#a5ada3]">
            Chest &amp; Triceps Focus • {exercises.length} exercises logged
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5 relative z-10">
          <div className="flex justify-between text-[12px] text-[#a5ada3]">
            <span>Workout Progress</span>
            <span className="text-[#aad0ab] font-semibold">{progressPct}%</span>
          </div>
          <div className="w-full bg-[#0b0f0b] h-2 rounded-full overflow-hidden border border-[#202820]">
            <div
              className="bg-[#aad0ab] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(170,208,171,0.5)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-1 relative z-10">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#1b211b] hover:bg-[#202820] text-[#e0e8dc] text-[14px] font-semibold transition-all flex items-center justify-center gap-2 border border-[#202820] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          
          <button
            onClick={() => setShowFinishModal(true)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#aad0ab] hover:bg-[#b8deb9] text-[#27472c] text-[14px] font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Finish Workout
          </button>
        </div>
      </div>

      {/* Weekly Streak Graph Section */}
      <div className="rounded-2xl bg-[#151b15] p-5 shadow-md border border-[#202820]/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#aad0ab] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <h2 className="text-[18px] font-semibold text-[#e0e8dc]">Weekly Streak</h2>
          </div>
          <span className="text-[12px] font-semibold text-[#aad0ab] bg-[#aad0ab]/10 border border-[#aad0ab]/20 px-2.5 py-0.5 rounded-full">
            5 Day Streak 🔥
          </span>
        </div>

        {/* Mini Bar Chart */}
        <div className="grid grid-cols-7 gap-2.5 pt-2 items-end h-28 px-1">
          {[
            { day: 'M', height: '40%', active: false },
            { day: 'T', height: '80%', active: true },
            { day: 'W', height: '100%', active: true },
            { day: 'T', height: '70%', active: true },
            { day: 'F', height: '90%', active: true },
            { day: 'S', height: '85%', active: true },
            { day: 'S', height: '20%', active: false },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full flex items-end justify-center h-20">
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${
                    bar.active
                      ? 'bg-[#aad0ab] shadow-[0_0_12px_rgba(75,226,119,0.25)]'
                      : 'bg-[#1b211b]'
                  }`}
                  style={{ height: bar.height }}
                />
              </div>
              <span className={`text-[12px] ${bar.active ? 'text-[#e0e8dc] font-semibold' : 'text-[#a5ada3]'}`}>
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#e0e8dc]">Exercises</h2>
          <span className="text-[12px] text-[#a5ada3]">{exercises.length} items logged</span>
        </div>

        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="rounded-2xl bg-[#151b15] p-4 shadow-md border border-[#202820]/60 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0b0f0b] border border-[#202820] flex items-center justify-center text-[#aad0ab]">
                  <span className="material-symbols-outlined text-[20px]">fitness_center</span>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#e0e8dc]">{exercise.name}</h3>
                  <p className="text-[12px] text-[#a5ada3]">{exercise.subtitle}</p>
                </div>
              </div>
              <button
                aria-label="Options"
                onClick={() => handleAddSet(exercise.id)}
                title="Add quick set"
                className="w-8 h-8 flex items-center justify-center text-[#a5ada3] hover:text-[#e0e8dc] rounded-full hover:bg-[#1b211b] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>

            {/* Sets Table Header */}
            <div className="grid grid-cols-12 gap-1 text-[11px] font-semibold text-[#a5ada3] px-1 uppercase tracking-wider">
              <span className="col-span-2 text-center">SET</span>
              <span className="col-span-4 text-center">LBS</span>
              <span className="col-span-4 text-center">REPS</span>
              <span className="col-span-2 text-center">DONE</span>
            </div>

            {/* Set Rows */}
            <div className="flex flex-col gap-1.5">
              {exercise.sets.map((set) => (
                <div
                  key={set.id}
                  className={`grid grid-cols-12 gap-1 items-center bg-[#0b0f0b] p-1.5 rounded-xl border transition-all ${
                    set.done ? 'border-[#aad0ab]/40 bg-[#0b0f0b]' : 'border-[#202820]'
                  }`}
                >
                  <span className="col-span-2 text-center font-semibold text-[13px] text-[#e0e8dc]">
                    {set.setNumber}
                  </span>
                  
                  <div className="col-span-4 px-1">
                    <input
                      type="number"
                      value={set.lbs}
                      onChange={(e) =>
                        updateSetField(exercise.id, set.id, 'lbs', Number(e.target.value) || 0)
                      }
                      className="w-full bg-[#151b15] text-center text-[#e0e8dc] py-1.5 rounded-lg text-[13px] font-semibold focus:outline-none focus:ring-1 focus:ring-[#aad0ab] border border-transparent focus:border-[#aad0ab]"
                    />
                  </div>

                  <div className="col-span-4 px-1">
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) =>
                        updateSetField(exercise.id, set.id, 'reps', Number(e.target.value) || 0)
                      }
                      className="w-full bg-[#151b15] text-center text-[#e0e8dc] py-1.5 rounded-lg text-[13px] font-semibold focus:outline-none focus:ring-1 focus:ring-[#aad0ab] border border-transparent focus:border-[#aad0ab]"
                    />
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => toggleSetDone(exercise.id, set.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        set.done
                          ? 'bg-[#aad0ab] text-[#27472c] font-bold shadow-sm'
                          : 'bg-[#1b211b] text-[#a5ada3] hover:text-[#e0e8dc]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAddSet(exercise.id)}
              className="w-full py-2 bg-[#0b0f0b] hover:bg-[#1b211b] text-[#e0e8dc] rounded-xl text-[13px] font-semibold transition-colors flex items-center justify-center gap-1 border border-[#202820] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span> Add Set
            </button>
          </div>
        ))}

        {/* Add Exercise CTA Button */}
        <button
          onClick={() => setShowAddExerciseModal(true)}
          className="w-full py-4 rounded-2xl bg-[#151b15] hover:bg-[#1b211b] text-[#aad0ab] font-semibold text-[15px] border-2 border-dashed border-[#424a41] flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Add Exercise
        </button>
      </div>

      {/* Add Exercise Modal */}
      {showAddExerciseModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151b15] border border-[#202820] rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-[#e0e8dc]">Add New Exercise</h3>
              <button
                onClick={() => setShowAddExerciseModal(false)}
                className="text-[#a5ada3] hover:text-[#e0e8dc] w-8 h-8 rounded-full flex items-center justify-center bg-[#1b211b]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[12px] text-[#a5ada3] block mb-1">Exercise Name</label>
                <input
                  type="text"
                  placeholder="e.g., Cable Chest Flyes"
                  value={newExerciseName}
                  onChange={(e) => setNewExerciseName(e.target.value)}
                  className="w-full bg-[#101510] border border-[#202820] rounded-xl px-3.5 py-2 text-[14px] text-[#e0e8dc] focus:outline-none focus:border-[#aad0ab]"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#a5ada3] block mb-1">Target Muscle</label>
                <select
                  value={newExerciseTarget}
                  onChange={(e) => setNewExerciseTarget(e.target.value)}
                  className="w-full bg-[#101510] border border-[#202820] rounded-xl px-3.5 py-2 text-[14px] text-[#e0e8dc] focus:outline-none focus:border-[#aad0ab]"
                >
                  <option value="Chest">Chest</option>
                  <option value="Triceps">Triceps</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Back">Back</option>
                  <option value="Legs">Legs</option>
                  <option value="Core">Core</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] text-[#a5ada3] block mb-1.5">Quick Suggestions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Cable Flyes', 'Tricep Pushdown', 'Dips', 'Overhead Press'].map((name) => (
                    <button
                      key={name}
                      onClick={() => setNewExerciseName(name)}
                      className="text-[11px] bg-[#1b211b] hover:bg-[#202820] text-[#aad0ab] px-2.5 py-1 rounded-full border border-[#202820]"
                    >
                      +{name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => setShowAddExerciseModal(false)}
                className="flex-1 py-2.5 bg-[#1b211b] text-[#e0e8dc] rounded-xl text-[13px] font-semibold hover:bg-[#202820]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddNewExercise(newExerciseName, newExerciseTarget)}
                disabled={!newExerciseName.trim()}
                className="flex-1 py-2.5 bg-[#aad0ab] text-[#27472c] rounded-xl text-[13px] font-bold hover:opacity-90 disabled:opacity-50"
              >
                Add to Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workout Finished Celebration Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151b15] border border-[#aad0ab]/40 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#aad0ab]/20 text-[#aad0ab] flex items-center justify-center mx-auto mb-4 ring-8 ring-[#aad0ab]/10">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                emoji_events
              </span>
            </div>

            <h3 className="text-[22px] font-bold text-[#e0e8dc]">Workout Crushed!</h3>
            <p className="text-[13px] text-[#a5ada3] mt-1 mb-5">
              Awesome job, Alex. You stayed focused and completed your session.
            </p>

            <div className="grid grid-cols-3 gap-2 bg-[#101510] p-3.5 rounded-2xl border border-[#202820] mb-5">
              <div>
                <span className="text-[11px] text-[#a5ada3] block">Duration</span>
                <span className="text-[15px] font-bold text-[#e0e8dc] font-mono">{formatTimer(seconds)}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#a5ada3] block">Completed</span>
                <span className="text-[15px] font-bold text-[#aad0ab]">{doneSets}/{totalSets} Sets</span>
              </div>
              <div>
                <span className="text-[11px] text-[#a5ada3] block">Volume</span>
                <span className="text-[15px] font-bold text-[#b8ccb6]">{totalVolume > 0 ? totalVolume.toLocaleString() : '5,480'} lbs</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowFinishModal(false);
                setIsPaused(true);
              }}
              className="w-full py-3 bg-[#aad0ab] hover:bg-[#b8deb9] text-[#27472c] font-bold text-[15px] rounded-xl transition-all shadow-md"
            >
              Save &amp; Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
