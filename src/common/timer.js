import { useState, useEffect } from 'react';

export function useTimer(initialTime, onUpdateTime) {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          onUpdateTime(prevTimer);
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, onUpdateTime]);

  return timer;
}
