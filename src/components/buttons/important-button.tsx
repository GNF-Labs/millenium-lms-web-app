import { MouseEventHandler } from "react";

interface ImportantButtonProps {
    /**
   * The text to display on the button
   */
    text: string;
    /**
     * Optional click handler for the button
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ImportantButton: React.FC<ImportantButtonProps> = ({ text, onClick = () => { } }) => {
    return (
        <button
            className="bg-black text-white text-[12px] font-bold px-4 py-2 rounded-[15px] border border-[#294149] hover:bg-[#3a5865] transition-colors"
            onClick={onClick}
        >

            {text}
        </button>
    )
}

const ImportantButton2: React.FC<ImportantButtonProps> = ({ text, onClick = () => { } }) => {
    return (
        <button
            className="bg-black text-white text-sm w-full font-bold px-4 py-2 rounded-[15px] border border-[#294149] hover:bg-[#3a5865] transition-colors"
            onClick={onClick}
        >

            {text}
        </button>
    )
}


export { ImportantButton, ImportantButton2 }