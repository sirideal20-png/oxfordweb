import { useState, useEffect } from 'react';
import { dayInLifeData } from '@/data/constants';

/**
 * Returns the index of the dayInLifeData item that matches
 * the current UK (Europe/London) time. Updates every minute.
 */
export const useOxfordTimeIndex = () => {
  const getActiveIndex = () => {
    // Get current time in UK (handles GMT/BST automatically)
    const now = new Date();
    const ukTime = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
    const currentMinutes = ukTime.getHours() * 60 + ukTime.getMinutes();

    // Parse each timeline slot's start time in minutes
    const slotMinutes = dayInLifeData.map((item) => {
      const [h, m] = item.time.split(':').map(Number);
      return h * 60 + m;
    });

    // Find the last slot whose start time is <= current time
    let activeIdx = 0;
    for (let i = slotMinutes.length - 1; i >= 0; i--) {
      if (currentMinutes >= slotMinutes[i]) {
        activeIdx = i;
        break;
      }
    }

    // If before the first slot, wrap to the last (evening)
    if (currentMinutes < slotMinutes[0]) {
      activeIdx = slotMinutes.length - 1;
    }

    return activeIdx;
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex);

  useEffect(() => {
    // Recalculate every 60 seconds
    const interval = setInterval(() => {
      setActiveIndex(getActiveIndex());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return activeIndex;
};

/** Returns the current UK time as a formatted string (HH:MM) */
export const useOxfordClock = () => {
  const getUKTime = () => {
    return new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const [time, setTime] = useState(getUKTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(getUKTime()), 1_000);
    return () => clearInterval(interval);
  }, []);

  return time;
};
