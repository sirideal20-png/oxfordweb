import { useState, useEffect, useCallback } from 'react';

interface RecCenterStatus {
  gymCapacity: number;
  poolCapacity: number;
  isActive: boolean;
  lastUpdated: string;
}

/**
 * Returns simulated live capacity for the Rec Center.
 * Capacities fluctuate randomly only during active Oxford UK hours:
 *   Morning:  06:00–11:59
 *   Noon:     12:00–14:59
 *   Evening:  16:00–21:59
 * Outside those windows the values freeze at low/zero levels.
 */
export const useRecCenterStatus = (): RecCenterStatus => {
  const getOxfordHour = () => {
    const now = new Date();
    const ukTime = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
    return ukTime.getHours();
  };

  const isActiveHour = (hour: number) =>
    (hour >= 6 && hour <= 11) ||   // Morning
    (hour >= 12 && hour <= 14) ||  // Noon
    (hour >= 16 && hour <= 21);    // Evening

  // Base capacity ranges per period
  const getBaseRange = (hour: number): { gym: [number, number]; pool: [number, number] } => {
    // Morning: gym HIGH, pool low
    if (hour >= 6 && hour <= 8) return { gym: [55, 75], pool: [10, 25] };
    if (hour >= 9 && hour <= 11) return { gym: [65, 88], pool: [15, 28] };
    // Noon: gym low, pool HIGH
    if (hour >= 12 && hour <= 14) return { gym: [20, 38], pool: [60, 85] };
    // Afternoon lull: both low
    if (hour === 15) return { gym: [15, 35], pool: [18, 28] };
    // Evening: gym HIGH, pool low
    if (hour >= 16 && hour <= 18) return { gym: [60, 90], pool: [12, 28] };
    if (hour >= 19 && hour <= 21) return { gym: [50, 78], pool: [10, 25] };
    // Off-hours: gym <40%, pool <30%
    return { gym: [2, 12], pool: [0, 8] };
  };

  const randomInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  const generateCapacities = useCallback(() => {
    const hour = getOxfordHour();
    const active = isActiveHour(hour);
    const { gym, pool } = getBaseRange(hour);

    return {
      gymCapacity: active ? randomInRange(gym[0], gym[1]) : randomInRange(2, 8),
      poolCapacity: active ? randomInRange(pool[0], pool[1]) : randomInRange(0, 5),
      isActive: active,
    };
  }, []);

  const getTimestamp = () =>
    new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
    });

  const [status, setStatus] = useState<RecCenterStatus>(() => ({
    ...generateCapacities(),
    lastUpdated: getTimestamp(),
  }));

  useEffect(() => {
    // Small random drift every 8–15 seconds to simulate live data
    const tick = () => {
      setStatus((prev) => {
        const hour = getOxfordHour();
        const active = isActiveHour(hour);
        const { gym, pool } = getBaseRange(hour);

        // Drift ±3–7% from previous value, clamped to period range
        const drift = () => randomInRange(-7, 7);

        const newGym = active
          ? clamp(prev.gymCapacity + drift(), gym[0], gym[1])
          : randomInRange(2, 8);
        const newPool = active
          ? clamp(prev.poolCapacity + drift(), pool[0], pool[1])
          : randomInRange(0, 5);

        return {
          gymCapacity: newGym,
          poolCapacity: newPool,
          isActive: active,
          lastUpdated: getTimestamp(),
        };
      });
    };

    // Interval between 8–15 seconds for organic feel
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = randomInRange(8000, 15000);
      timer = setTimeout(() => {
        tick();
        schedule();
      }, delay);
    };
    schedule();

    return () => clearTimeout(timer);
  }, []);

  return status;
};
