'use client'

import NavigationBar from '@/components/navbar/navigation-bar'
import React from 'react'
import { navigationRoute } from '../constants'
import Image from 'next/image'
import Head from 'next/head'
import { CourseCard } from '@/components/menus/dashboard-courses-menu'
import { ImportantButton, ImportantButton2 } from '@/components/buttons/important-button'

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

    return (
        <>
            <Head>

                <title>
                    Profile
                </title>
            </Head>
            <NavigationBar logo={{ source: "images/logo_GNF.png", width: 90, height: 90 }} navigationMenu={navigationRoute} />
            <div className="flex min-h-screen flex-col p-4">

                <div className='parallax-bg' />
                <div className='flex flex-1 flex-col p-8 h-full mt-12'>
                    <div className='flex flex-row space-x-4 w-full'>

                        <div className='flex flex-col items-center space-y-4 w-fit min-w-[15%] max-w-[20%]'>
                            <div className='relative w-[100%] aspect-square bg-slate-500 rounded-full overflow-hidden'>
                                <Image src={"https://pbs.twimg.com/media/GUXsgk_a8AEF4um?format=jpg&name=900x900"} alt="Profile Picture" layout='fill' objectFit='cover' />
                            </div>
                            <div className='space-y-2'>
                                <h2>Takanashi Hoshino</h2>
                                <h2>@pamanhoshino</h2>
                                <div className='h-1'/>
                                <p>
                                    Atsui<br />
                                    Atsukute Hikarabisou<br />
                                    Ugoitenai noni Atsui yoooo
                                </p>

                            </div>
                            {/* <button className='bg-slate-700 w-full py-2 rounded-lg'>
                                <p className='text-[#eee]'>Edit Profile</p>
                            </button> */}
                            <ImportantButton2 text={'Sunting Profil'} />
                            <ImportantButton2 text={'Log Keluar'} />
                        </div>
                        <div className='w-[7.5%]' />
                        <div className='w-[90%] pt-4'>
                            <h1>Latest Courses</h1>
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
