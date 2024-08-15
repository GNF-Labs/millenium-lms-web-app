import React, { useState } from 'react';

interface TabsProps {
  /**
   * Available options for the tabs
   */
  options: string[];
  /**
   * Callback function triggered when a new option is selected
   */
  onSelectTab: (selectedOption: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ options, onSelectTab }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    onSelectTab(option);
  };

  return (
    <div className="flex border-b border-gray-600">
      {options.map((option) => (
        <button
          key={option}
          className={`px-4 py-2 font-semibold transition-colors duration-200 ${
            selected === option
              ? 'text-black border-b-4 border-black'
              : 'text-gray-600 border-b-4 border-transparent'
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export { Tabs };