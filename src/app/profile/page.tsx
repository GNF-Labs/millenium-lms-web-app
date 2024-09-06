'use client'

import NavigationBar from '@/components/navbar/navigation-bar'
import React, { useEffect, useReducer, useState } from 'react'
import { navigationRoute } from '../constants'
import Image from 'next/image'
import Head from 'next/head'
import { CourseCard } from '@/components/menus/dashboard-courses-menu'
import { ImportantButton, ImportantButton2 } from '@/components/buttons/important-button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchCourseOfUsers, fetchProfile, handleUpdateProfile } from '@/services/handlers'
import { useRouter } from 'next/navigation'
import { readImage } from '@/services/mega'
import { deleteToken } from '@/redux/slices/tokenSlice'
import { StandardModal } from '@/components/modals'
import { initialState, profileReducer } from './reducer'
import { IoPencil } from 'react-icons/io5'
import axios from 'axios'
import { error } from 'console'


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
    const [editProfileVisible, SetEditProfileVisible] = useState<boolean>(false);

    const [fullName, setFullName] = useState(profileState.profile?.full_name || ''); // Local state for the form inputs
    const [about, setAbout] = useState(profileState.profile?.about || '');
    const [editAvatar, setEditAvatar] = useState(profileState?.profile?.image_url || null)

    const [enrolledCourse, setEnrolledCourse] = useState<any[]>([]);

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
        console.log(fullName);
    };

    const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAbout(e.target.value);
        console.log(about);
    };

    const handleChangeProfile = async () => {
        try {
            console.log((editAvatar as string).substring(0,20))
            const {data, status} = await handleUpdateProfile(tokenSelector.username, tokenSelector.token as string, {full_name:fullName, about:about, image_url:editAvatar})
            if (status === axios.HttpStatusCode.Ok) {
                const updatedUser = data?.user
                profileDispatch({type: 'CHANGE_STATE', payload: updatedUser})
                setProfileImage(editAvatar);
                
                // await fetchProfileData();
                // window.location.reload();
                SetEditProfileVisible(false);
            } else{
                console.error(data)
            }
        } catch(error) {
            console.error(error)
        }
    }

    const dispatch = useAppDispatch();
    const tokenSelector = useAppSelector((state) => state.jwt)
    const router = useRouter();

    const handleLogout = () => {
        dispatch(deleteToken());
        router.push("/");
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setEditAvatar(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const fetchProfileData = async () => {
        profileDispatch({ type: 'FETCH_INIT' });
        try {
            const { status, data } = await fetchProfile(tokenSelector.username, tokenSelector.token || "");
    
            if (status === 403) {
                router.push("/login");
                return;
            }
            console.log(data);
            profileDispatch({ type: 'FETCH_SUCCESS', payload: data });
    
            const imageUrl = await readImage(data.image_url);
    
            setProfileImage(imageUrl);
            setImageLoading(false);
            setFullName(data.full_name);
            setAbout(data.about);
            SetEditProfileVisible(false);
        } catch (error) {
            profileDispatch({ type: 'FETCH_FAILURE', payload: (error as Error).message });
        }
    };

    useEffect(() => {
        const req = async () => {
            profileDispatch({ type: 'FETCH_INIT' });
            try {
                const { status, data } = await fetchProfile(tokenSelector.username, tokenSelector.token || "");
                
                if (status === 403) {
                    router.push("/login");
                    return;
                }
                console.log(data);
                profileDispatch({ type: 'FETCH_SUCCESS', payload: data });

                const imageUrl = await readImage(data.image_url);
                console.log("image url:", imageUrl);                    
                setProfileImage(imageUrl);
                setFullName(data.full_name);
                setAbout(data.about);
                setImageLoading(false);

                const {status: courseStatus, data: courseData} = await fetchCourseOfUsers(data.id, tokenSelector.token || "");
                if (courseStatus === 200) {
                    setEnrolledCourse(courseData);
                }
            } catch (error) {
                profileDispatch({ type: 'FETCH_FAILURE', payload: (error as Error).message });
            } finally {
                setImageLoading(false);
            }
        }
        req();
        console.log('Token value:', tokenSelector.token);
    }, [router, tokenSelector])

    return (
        <>
            <title>
                Profile
            </title>
            <StandardModal visible={editProfileVisible} setVisible={SetEditProfileVisible}>
                <div className='space-y-2 flex flex-col'>
                    <div className='w-full flex flex-col items-center'>

                        <div className='relative w-[120px] aspect-square bg-slate-500 rounded-full overflow-hidden border border-gray-500'>

                            <Image
                                src={editAvatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s'}
                                alt="Profile Picture"
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ alignSelf: 'center', objectFit: 'cover' }}
                            />
                        </div>
                        <div className='h-2'/>
                        <label className='flex flex-row w-fit items-center cursor-pointer'>
                            <IoPencil className='text-black mr-2' />
                            <span className='text-black'>Ganti Avatar</span>
                            <input type='file' accept='image/*' onChange={handleAvatarChange} style={{display: 'none'}}/>
                        </label>
                    </div>

                    <h2>Nama</h2>
                    <input name='Nama' className='border-black border w-[100%] px-2 text-black' value={fullName} onChange={handleFullNameChange} />
                    <h2>Tentang</h2>
                    <textarea name='Tentang' className='border-black border w-[100%] px-2 text-black' value={about} onChange={handleAboutChange} rows={6} />
                    <div className='h-2' />
                    <ImportantButton2 text='Simpan' onClick={handleChangeProfile} />

                </div>
            </StandardModal>
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
                                        fill
                                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{objectFit: "cover"}}
                                    />
                                )}
                            </div>
                            <div className='space-y-2'>
                                <h2 className='font-bold'>{profileState.profile?.full_name || ''}</h2>
                                <h2 className='text-base'>{profileState.profile?.username ? `@${profileState.profile?.username}` : ''}</h2>
                                <div className='h-1' />
                                <p>
                                    {profileState.profile?.about || "No Description"}
                                </p>


                            </div>
                            {/* <button className='bg-slate-700 w-full py-2 rounded-lg'>
                                <p className='text-[#eee]'>Edit Profile</p>
                            </button> */}
                            <ImportantButton2 text={'Sunting Profil'} onClick={() => {
                                setFullName(profileState?.profile.full_name);
                                setAbout(profileState?.profile.about);
                                setEditAvatar(profileState?.profile?.image_url)
                                SetEditProfileVisible(true);
                            }} />
                        </div>
                        <div className='w-[7.5%]' />
                        <div className='w-[90%] pt-4'>
                            <h1>Kursus Terkini</h1>
                            <div className='h-4' />
                            <div className='flex flex-col space-y-4'>
                                {enrolledCourse.map((item:any, index:any) => (
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
