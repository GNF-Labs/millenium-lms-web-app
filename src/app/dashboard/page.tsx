'use client'

import NavigationBar from '@/components/navbar/navigation-bar'
import React, { useEffect, useReducer, useState } from 'react'
import { navigationRoute } from '../constants'
import { Arisu } from '@/components/decorations'
import Image from 'next/image'
import { ImportantButton } from '@/components/buttons/important-button'
import { DashboardCoursesMenu } from '@/components/menus/dashboard-courses-menu'
import SearchTextInput from '@/components/input-fields/search-text-input'
import DashboardStatisticMenu from '@/components/menus/dashboard-statistics-menu'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchProfile } from '@/services/handlers'
import { DashboardInitState, DashboardReducer } from './dashboard-reducer'
import { getDashboard } from '@/services/course-handlers'
import { isEmpty } from '@/utils'

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const tokenSelector = useAppSelector((state) => state.jwt)
    const router = useRouter();
    const [profileLoaded, setProfileLoaded] = useState<boolean>(false);
    const [dashboardState, dashboardDispatch] = useReducer(DashboardReducer, DashboardInitState);
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        const req = async () => {
            try {
                const [profileResponse, dashboardResponse] = await Promise.all([
                    fetchProfile(tokenSelector.username, tokenSelector.token || ""),
                    getDashboard(tokenSelector.username, tokenSelector.token || "")
                ]);

                // Handle profile response
                if (profileResponse.status === 403 || profileResponse.status === 401) {
                    router.push("/login");
                    return;
                } else {
                    setUserData(profileResponse.data);
                }

                // Handle dashboard response
                if (dashboardResponse.status === 403 || dashboardResponse.status === 401) {
                    router.push("/login");
                    return;
                } else {
                    dashboardDispatch({
                        type: 'SET_ALL_DATA',
                        payload: {
                            ...DashboardInitState,
                            statistics: {
                                coursesCompleted: dashboardResponse.data.completed_courses,
                                coursesInProgress: dashboardResponse.data.in_progress_courses
                            }
                        }
                    });
                }

                // Mark profile as loaded
                setProfileLoaded(true);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
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
                    <div className='flex flex-col p-8'>
                        <div className='flex flex-1 space-x-8 flex-row justify-between h-full mt-12'>
                            <div className='flex flex-col w-[55%] space-y-4'>
                                <div className='flex flex-row max-h-[50%] space-x-8 w-full justify-between bg-[rgba(255,254,254,0.73)] rounded-[10px] p-8 mt-4'/* My Progress Part*/ >
                                    <div className='flex flex-col justify-center'>
                                        <h2 className='font-bold text-[24px]'>Hello {userData?.full_name || "Anon"}</h2>
                                        <p className='text-[16px]'>Ayo terus tingkatkan kemampuanmu</p>
                                    </div>
                                    {/* <div className="relative right-0 bottom-[75%] w-[90px] h-[100px] overflow-visible">
                                        <Arisu width={200} height={200} style={{ objectFit: 'cover' }} />
                                    </div> */}

                                </div>
                                <div className='flex flex-row w-full justify-between items-center bg-[rgba(255,254,254,0.73)] rounded-[10px] py-4 px-8'/* My Progress Part*/ >
                                    {!isEmpty(dashboardState.lastCourse) ? <>
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
                                    </> : <><h2>Belum ada course yang kamu ambil</h2></>
                                    }
                                    

                                </div>

                            </div>
                            <div className='flex flex-col flex-grow-0 flex-shrink-[2] space-y-8'>
                                <SearchTextInput />
                                <div className='flex flex-row justify-between space-x-6'>
                                    <div className='flex flex-row background1 justify-center items-center'>
                                        <div className='p-4'>
                                            <h1 className='text-[64px]'>{dashboardState.statistics.coursesCompleted}</h1>
                                        </div>
                                        <div className='p-4'>
                                            <h1 className='text-wrap text-[24px]'>
                                                Courses Completed
                                            </h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-row background1 justify-center items-center'>
                                        <div className='p-4'>
                                            <h1 className='text-[64px]'>{dashboardState.statistics.coursesInProgress}</h1>
                                        </div>
                                        <div className='p-4'>
                                            <h1 className='text-wrap text-[24px]'>
                                                Courses In Progress
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-8' />
                            </div>

                        </div>
                        <DashboardCoursesMenu />
                    </div>
                }

            </main>
        </>
    )
}

export default Dashboard
