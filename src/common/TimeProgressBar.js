import React, { useState, useEffect } from 'react';

const TimeProgressBar = ({ duration, onTimeUp, paused, resetKey }) => {
  const [progress, setProgress] = useState(100); // Start from 100% progress
  const [barColor, setBarColor] = useState('green'); // Initial color

  useEffect(() => {
    setProgress(100); // Reset progress when resetKey changes
  }, [resetKey]);

  useEffect(() => {
    let interval;
    if (!paused) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress <= 0) {
            clearInterval(interval);
            onTimeUp(); // Call the callback function when time is up
            return 0;
          }

          const nextProgress = prevProgress - (1 / duration * 100);
          if (nextProgress <= 20) {
            setBarColor('red'); // Change color to red
          }

          return nextProgress;
        });
      }, 1000); // Update every second
    }

    return () => clearInterval(interval);
  }, [duration, onTimeUp, paused]);

  const barStyle = {
    width: `${progress}%`,
    backgroundColor: barColor, // Set the background color dynamically
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={barStyle}></div>
    </div>
  );
};

export default TimeProgressBar;
