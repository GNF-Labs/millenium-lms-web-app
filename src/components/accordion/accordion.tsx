import React, { useState, useEffect, useRef } from 'react';

interface AccordionProps {
    /**
     * Title of the accordion
     */
    title: string;
    /**
     * Content of the accordion
     */
    content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<string | number>('0px');
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-2xl transition-all">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-[#1C93D0] text-black font-semibold rounded-2xl"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
      >
        <div className="p-4 opacity-100">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;