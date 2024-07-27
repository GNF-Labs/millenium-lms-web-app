import React from 'react'

interface NormalButtonProps {
    /**
   * The text to display on the button
   */
    text: string;
    /**
     * Optional click handler for the button
     */
    onClick?: () => void;
}

const NormalButton1: React.FC<NormalButtonProps> = ({ text, onClick }) => {
    return (
        <button
            className="bg-white text-[#294149] text-[16px] min-w-[150px] font-bold px-8 py-4 rounded-[15px] border border-[#294149] hover:bg-gray-100 transition-colors"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

const NormalButton2: React.FC<NormalButtonProps> = ({ text, onClick }) => {
    return (
        <button
            className="bg-[#294149] min-w-[150px] text-[16px] font-bold text-white px-8 py-4 rounded-[15px] hover:bg-[#3a5865] transition-colors"
            onClick={onClick}
        >
            {text}
        </button>
    )
}
export { NormalButton1, NormalButton2 }
