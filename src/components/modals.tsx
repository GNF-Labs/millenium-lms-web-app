import React, { useReducer, useState } from 'react'

interface ModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StandardModal: React.FC<ModalProps> = ({children, visible, setVisible }) => {
    return (
        <div className='fixed z-50 w-full flex h-screen justify-center items-center bg-black/50' style={{display: visible ? "flex":"none"}}>
            <div className='flex h-[90%] rounded-3xl bg-white flex-col p-8 min-w-[50vw] overflow-y-auto' style={{scrollbarWidth: 'none'}}>
                <button className='flex self-end flex-row' onClick={()=>setVisible(false)}>
                    <h2>
                        X
                    </h2>
                </button>
                {children}
            </div>

        </div>

        
    )
}