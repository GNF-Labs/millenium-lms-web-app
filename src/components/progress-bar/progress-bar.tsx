import React from 'react';

interface ProgressBarProps {
    /**
   * The amount of progress to be shown by progress bar (0-100)
   */
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-white rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;