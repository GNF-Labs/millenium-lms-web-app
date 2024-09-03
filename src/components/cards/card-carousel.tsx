import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { CourseCard, CourseCardProps } from './course-card';
import { useRef } from 'react';

interface CardCarouselProps {
    /**
     * The title of the carousel
     */
    title: string;
    /**
     * The list of courses to be displayed in the carousel
     */
    courses: CourseCardProps[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({ title, courses }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' });
        }
    };
    const scrollRight = () => {
        if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col">
          <div className="flex flex-row justify-stretch relative">
            <h2 className="align-top w-full font-black text-2xl">
                {title}
            </h2>
            <button onClick={scrollLeft}>
              <FaCaretLeft className="mb-4 left-0 transform text-3xl text-black" />
            </button>
            <button onClick={scrollRight}>
              <FaCaretRight className="mb-4 right-0 transform text-3xl text-black" />
            </button>
          </div>
          <div ref={carouselRef} className="flex overflow-x-hidden carousel w-full gap-x-[2.5%]">
              {courses.map((course, index) => (
              <div key={index} className="flex-shrink-0 h-auto w-[23%] pt-1 pb-5">
                  <CourseCard title={course.title} author={course.author ?? undefined} duration={course.duration} rating={course.rating} image={course.image} id={course.id} />
              </div>
              ))}
          </div>
        </div>
    )
}

export { CardCarousel }