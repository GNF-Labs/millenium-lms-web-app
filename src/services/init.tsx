import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { saveToken } from '@/redux/slices/tokenSlice'

// Component to initialize Redux state with localStorage values
const ClientSideInitializer: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeToken = () => {
            if (typeof window !== 'undefined') {
                const username = localStorage.getItem('username') || "guest";
                const token = localStorage.getItem('token');

                dispatch(saveToken({ username, token: token ? token : null }));
            }
        };

        initializeToken(); 
    }, [dispatch]);

    return null;
}

export default ClientSideInitializer;
