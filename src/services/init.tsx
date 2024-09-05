import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveToken } from '@/redux/slices/tokenSlice'

// Component to initialize Redux state with localStorage values
const ClientSideInitializer: React.FC<{onReady: ()=>void}> = ({onReady}) => {
    const [contentLoaded, setContentLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeToken = () => {
            if (typeof window !== 'undefined') {
                    const username = localStorage.getItem('username') || "guest";
                    const token = localStorage.getItem('token');

                dispatch(saveToken({ username, token: token ? token : null }));
            }
            setContentLoaded(true);
        };

        initializeToken(); 
    }, [dispatch, contentLoaded]);

    return null;
}

export default ClientSideInitializer;
