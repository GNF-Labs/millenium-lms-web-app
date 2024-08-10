'use client'

import NavigationBar from '@/components/navbar/navigation-bar'
import React, { useEffect, useReducer, useState } from 'react'
import { navigationRoute } from '../constants'
import Image from 'next/image'
import Head from 'next/head'
import { CourseCard } from '@/components/menus/dashboard-courses-menu'
import { ImportantButton, ImportantButton2 } from '@/components/buttons/important-button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchProfile } from '@/services/handlers'
import { useRouter } from 'next/navigation'
import { readImage } from '@/services/mega'
import { deleteToken } from '@/redux/slices/tokenSlice'

// Define the initial state and action types for the reducer
interface ProfileState {
    profile: any;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
};

type Action =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: any }
    | { type: 'FETCH_FAILURE'; payload: string };

// Reducer function to manage the state
function profileReducer(state: ProfileState, action: Action): ProfileState {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, profile: action.payload };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            throw new Error('Unhandled Action Type');
    }
}

const ProfilePage = () => {
    const coursesList: { id: number, src: string, name: string, authorName: string, timeEstimated: string, rating: number }[] = [
        {
            id: 1,
            src: "images/logos/javascript.svg",
            name: "Javascript",
            authorName: "Shiroko",
            timeEstimated: "6h 30m",
            rating: 4.8
        },
        {
            id: 2,
            src: "images/logos/javascript.svg",
            name: "Javascript",
            authorName: "Shiroko",
            timeEstimated: "6h 30m",
            rating: 4.8
        },
        {
            id: 3,
            src: "images/logos/javascript.svg",
            name: "Javascript",
            authorName: "Shiroko",
            timeEstimated: "6h 30m",
            rating: 4.8
        },
    ];

    const [profileState, profileDispatch] = useReducer(profileReducer, initialState);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(true);


    const dispatch = useAppDispatch();
    const tokenSelector = useAppSelector((state) => state.jwt)
    const router = useRouter();

    const handleLogout = () => {
        dispatch(deleteToken());
        router.push("/");
    }
    useEffect(() => {
        const req = async () => {
            profileDispatch({ type: 'FETCH_INIT' });
            try {
                const { status, data } = await fetchProfile(tokenSelector.username, tokenSelector.token || "");

                if (status === 403) {
                    router.push("/login");
                    return;
                }
                profileDispatch({ type: 'FETCH_SUCCESS', payload: data });

                const imageUrl = await readImage(data.image_url);

                setProfileImage(imageUrl);
                setImageLoading(false);
            } catch (error) {
                profileDispatch({ type: 'FETCH_FAILURE', payload: (error as Error).message });
            }
        }
        req();
    }, [router, tokenSelector])

    return (
        <>
            <title>
                Profile
            </title>
            <NavigationBar logo={{ source: "images/logo_GNF.png", width: 90, height: 90 }} navigationMenu={navigationRoute} />
            <div className="flex min-h-screen flex-col p-4">

                <div className='parallax-bg' />
                <div className='flex flex-1 flex-col p-8 h-full mt-12'>
                    <div className='flex flex-row space-x-4 w-full'>

                        <div className='flex flex-col items-center space-y-4 w-fit min-w-[15%] max-w-[20%]'>
                            <div className='relative w-[100%] aspect-square bg-slate-500 rounded-full overflow-hidden'>
                                {imageLoading ? (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <Image
                                        src={profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s'}
                                        alt="Profile Picture"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            <div className='space-y-2'>
                                <h2 className='font-bold'>{profileState.profile?.full_name}</h2>
                                <h2 className='text-base'>@{profileState.profile?.username}</h2>
                                <div className='h-1' />
                                <p>
                                    {profileState.profile?.about || "No Description"}
                                </p>

                            </div>
                            {/* <button className='bg-slate-700 w-full py-2 rounded-lg'>
                                <p className='text-[#eee]'>Edit Profile</p>
                            </button> */}
                            <ImportantButton2 text={'Sunting Profil'} />
                            <ImportantButton2 text={'Log Keluar'} onClick={handleLogout} />
                        </div>
                        <div className='w-[7.5%]' />
                        <div className='w-[90%] pt-4'>
                            <h1>Kursus Terkini</h1>
                            <div className='h-4' />
                            <div className='flex flex-col space-y-4'>
                                {coursesList.map((item, index) => (
                                    <CourseCard id={item.id} key={index} logoSource={item.src} name={item.name} authorName={item.authorName} timeEstimated={item.timeEstimated} rating={item.rating} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
