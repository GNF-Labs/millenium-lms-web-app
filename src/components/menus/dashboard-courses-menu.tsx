'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { ImportantButton } from '../buttons/important-button';
import { FaClock, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { useUserBehaviour } from '@/providers/UserBehaviourProvider';
import { useAppSelector } from '@/redux/hooks';

interface CourseCardProps {
    /**
     * id of the course
     */
    id: number;
    /**
     * logo source image (URI)
     */
    logoSource: string;

    /**
     * Title or name of the course
     */
    name: string;

    /**
     * Name of the course's author
     */
    authorName?: string;

    /**
     * Time Estimated Taken to finish the course
     */
    timeEstimated: string;

    /**
     * Rating of the course
     */
    rating: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({ id, logoSource, name, authorName, timeEstimated, rating }) => {
    const router = useRouter();
    const tokenSelector = useAppSelector((state) => state.jwt)

    const userBehaviourContext = useUserBehaviour();
    const handleButtonClick = async () => {
        try {
            const data = {
                course_id: id,
                user_id: Number(tokenSelector.user_id),
                last_interaction: new Date().toISOString(),
                viewed: true,
            };
            console.log(data)
            console.log(tokenSelector.token)
            await userBehaviourContext.updateData(data, tokenSelector.token as string)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='flex flex-row justify-between items-center background1 py-4 px-8'>
            <div className='flex flex-row items-center  space-x-6'>
                <Image src={logoSource} alt="" width={30} height={30} />
                <div className='flex flex-col justify-center'>
                    <h2 className='font-bold text-[14px]'>{name}</h2>
                </div>
            </div>
            <div className='flex flex-row space-x-4'>
                <p className='flex items-center whitespace-nowrap'>
                    <span><FaClock /></span> &nbsp;&nbsp;{timeEstimated}
                </p>
                <p className='flex items-center whitespace-nowrap'>
                    <span>
                        <FaStar />
                    </span>
                    &nbsp;&nbsp;
                    {rating}
                </p>
            </div>
            <Link href={`/courses/${id}`} onClick={handleButtonClick}>
                <ImportantButton text='Lihat' />
            </Link>

        </div>
    )
}

export const DashboardCoursesMenu = () => {

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

    const router = useRouter();

    return (
        <div className='flex flex-col space-y-2'>
            <h1 className='text-[32px]'>
                Courses
            </h1>
            <div className='flex flex-row space-x-8'>
                <button>
                    <p className='font-bold hover:bg-gray-50/30'>Rekomendasi</p>
                </button>
            </div>
            <div className='flex flex-row space-x-8'>
                <div className='flex flex-col space-y-4 w-full'>
                    {coursesList.map((item, index) => (
                        <CourseCard id={item.id} key={index} logoSource={item.src} name={item.name} authorName={item.authorName} timeEstimated={item.timeEstimated} rating={item.rating} />
                    ))}
                </div>
                <div className='w-[50%]'>
                    <h1>
                        Cari Course yang Lebih Banyak
                    </h1>
                    <div className='h-4' />
                    <Link href={"/courses"}>
                        <ImportantButton text='LIHAT SEMUA' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

