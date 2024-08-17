'use client'

import NavigationBar from '@/components/navbar/navigation-bar'
import React, { useEffect, useState } from 'react'
import { navigationRoute } from '../constants'
import { Arisu } from '@/components/decorations'
import Image from 'next/image'
import { ImportantButton } from '@/components/buttons/important-button'
import {DashboardCoursesMenu} from '@/components/menus/dashboard-courses-menu'
import SearchTextInput from '@/components/input-fields/search-text-input'
import DashboardStatisticMenu from '@/components/menus/dashboard-statistics-menu'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchProfile } from '@/services/handlers'

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const tokenSelector = useAppSelector((state) => state.jwt)
    const router = useRouter();
    const [profileLoaded, setProfileLoaded] = useState<boolean>(false);

    const req = async () => {
        try {
            const { status, data } = await fetchProfile(tokenSelector.username, tokenSelector.token || "");
            if (status === 403 || status === 401) {
                router.push("/login");
                return;
            } else {
                setProfileLoaded(true)
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        req();
    }, [router, tokenSelector])

    return (
        <>
            <NavigationBar logo={{ source: "images/logo_GNF.png", width: 90, height: 90 }} navigationMenu={navigationRoute} />
            <main className="flex min-h-screen flex-col p-4">
                <title>
                    Dashboard
                </title>
                <div className='parallax-bg' />
                {profileLoaded &&
                <div className='flex flex-1 space-x-8 flex-row justify-between p-8 h-full mt-12'>
                    <div className='flex flex-col w-[55%] space-y-4'>
                        <div className='flex flex-row max-h-[50%] space-x-8 w-full justify-between bg-[rgba(255,254,254,0.73)] rounded-[10px] p-8 mt-4'/* My Progress Part*/ >
                            <div className='flex flex-col justify-center'>
                                <h2 className='font-bold text-[24px]'>Hello Aan!</h2>
                                <p className='text-[16px]'>Ayo terus tingkatkan kemampuanmu</p>
                            </div>
                            <div className="relative right-0 bottom-[75%] w-[90px] h-[100px] overflow-visible">
                                <Arisu width={200} height={200} style={{ objectFit: 'cover' }} />
                            </div>

                        </div>
                        <div className='flex flex-row w-full justify-between items-center bg-[rgba(255,254,254,0.73)] rounded-[10px] py-4 px-8'/* My Progress Part*/ >
                            <div className='flex flex-row space-x-6 items-center'>
                                <Image
                                    src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg"
                                    alt="Python Logo"
                                    height={30}
                                    width={30}
                                />
                                <div className='flex flex-col justify-center'>
                                    <h2 className='font-bold text-[14px]'>Python</h2>
                                    <p className='text-[12px]'>By Hoshino</p>
                                </div>
                                <p>
                                    73 %
                                </p>
                            </div>

                            <ImportantButton text='Lanjutkan' />

                        </div>
                        <DashboardCoursesMenu />
                    </div>
                    <div className='flex flex-col flex-grow-0 flex-shrink-[2] space-y-8'>
                        <SearchTextInput />
                        <div className='flex flex-row justify-between space-x-6'>
                            <div className='flex flex-row background1 justify-center items-center'>
                                <div className='p-4'>
                                    <h1 className='text-[64px]'>11</h1>
                                </div>
                                <div className='p-4'>
                                    <h1 className='text-wrap text-[24px]'>
                                        Courses Completed
                                    </h1>
                                </div>
                            </div>
                            <div className='flex flex-row background1 justify-center items-center'>
                                <div className='p-4'>
                                    <h1 className='text-[64px]'>4</h1>
                                </div>
                                <div className='p-4'>
                                    <h1 className='text-wrap text-[24px]'>
                                        Courses In Progress
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <DashboardStatisticMenu />
                        <div className='h-8' />
                    </div>

                </div>
                }

            </main>
        </>
    )
}

export default Dashboard
