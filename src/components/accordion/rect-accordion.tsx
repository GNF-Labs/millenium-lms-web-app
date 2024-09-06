import React, { useState, useRef, useEffect } from 'react';

const RectAccordion = ({
    title,
    children,
    isOpen,
    toggleAccordion,
  }: {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    toggleAccordion: () => void;
  }) => {
    const [height, setHeight] = useState<string>('0px');
    const contentRef = useRef<HTMLDivElement>(null);
  
    // Calculate the content's height to animate between open/closed states
    useEffect(() => {
      if (contentRef.current) {
        if (isOpen) {
          setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
          setHeight('0px');
        }
      }
    }, [isOpen]);
  
    return (
      <div>
        <button
          onClick={toggleAccordion}
          className="flex justify-between w-full p-4 backdrop-blur-md bg-[#229cda] hover:bg-[#2291c9] text-left"
        >
          <span>{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </button>
  
        {/* Animated content wrapper */}
        <div
          ref={contentRef}
          style={{ maxHeight: height }}
          className="overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="backdrop-blur-md">{children}</div>
        </div>
      </div>
    );
  };

export default RectAccordion;