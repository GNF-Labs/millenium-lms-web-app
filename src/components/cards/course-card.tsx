import { FaStar } from 'react-icons/fa';
import Link from 'next/link'
import Image from 'next/image';

interface CourseCardProps {
    /**
     * The title of the course
     */
    title: string;
    /**
     * The author of the course
     */
    author: string;
    /**
     * The duration of the course (in minutes)
     */
    duration: number;
    /**
     * The rating of the course (in minutes)
     */
    rating: number;
    /**
     * The URL of the course image
     */
    image?: string;
    /**
     * The id of the course
     */
    id: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, author, duration, rating, image, id }) => {
    let durationText;
    if (duration % 60 === 0) {
        durationText = `${duration / 60} hour${duration / 60 > 1 ? 's' : ''}`;
    } else if (duration > 60) { 
        durationText = `${Math.floor(duration/60)} hour${duration / 60 > 1 ? 's' : ''} ${duration%60} minute${duration % 60 > 1 ? 's' : ''}`;
    } else {
        durationText = `${duration} minute${duration > 1 ? 's' : ''}`;
    }

    return (
        <Link href={`/courses/${id}`} className=''>
            <div className="flex flex-col backdrop-blur-sm bg-[rgba(255,254,254,0.73)] rounded-[15px] shadow-md shadow-slate-600 hover:shadow-lg hover:shadow-slate-600 hover:-translate-y-0.5 transition-all h-full w-full">
                <div className='h-1/2'>
                    <img src={image ?? ""} alt={title} className="rounded-t-[15px] object-cover h-full w-full"/>
                </div>
                <div className="flex flex-col px-3 py-2 justify-between h-1/2">
                    <div>
                        <p className="text-xs text-gray-700">{author}</p>
                        <p className="font-extrabold text-lg text-black">{title}</p>
                    </div>
                    <div className="flex flex-row justify-between text-sm">
                        <span className="flex items-center justify-center text-black">
                            <FaStar />
                            <p className="pl-1">{rating}</p>
                        </span>
                        <p className="text-black">{durationText}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export { CourseCard }