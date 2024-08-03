"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { poppins } from "../fonts";
import NavigationBar from "@/components/navbar/navigation-bar";
import { NormalButton1, NormalButton2 } from "@/components/buttons/normal-button";
import { CourseCard } from "@/components/cards/course-card";
import { useRouter } from "next/navigation";
import { useRef } from 'react';

/**
 * Courses Screen
 * @returns
 */
export default function Courses() {
  const router = useRouter();
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

  const navigationRoute = [
    { name: "Home", route: "/" },
    { name: "Dashboard", route: "/dashboard" },
    { name: "Courses", route: "/courses" },
    { name: "Informations", route: "/informations" },
    { name: "Profile", route: "/profile" },
  ];

  const recommendedCourses = [
    { title: "Course 1 asdfjahsdfjha  asdfasdf", author: "Author 1", duration: 120, rating: 4.5, image: "images/decorations/JS bootcamp 1.png", id: 1 },
    { title: "Course 2", author: "Author 2", duration: 90, rating: 4.2, image: "images/decorations/JS bootcamp 1.png", id: 2 },
    { title: "Course 3", author: "Author 3", duration: 150, rating: 4.7, image: "images/decorations/JS bootcamp 1.png", id: 3 },
    { title: "Course 4", author: "Author 4", duration: 180, rating: 4.9, image: "images/decorations/JS bootcamp 1.png", id: 4 },
    { title: "Course 5", author: "Author 5", duration: 120, rating: 4.5, image: "images/decorations/JS bootcamp 1.png", id: 5 },
    { title: "Course 6", author: "Author 6", duration: 90, rating: 4.2, image: "images/decorations/JS bootcamp 1.png", id: 6 },
    { title: "Course 7", author: "Author 7", duration: 150, rating: 4.7, image: "images/decorations/JS bootcamp 1.png", id: 7 },
    { title: "Course 8", author: "Author 8", duration: 180, rating: 4.9, image: "images/decorations/JS bootcamp 1.png", id: 8 },
  ]

  const courses = [
    { title: "Course 1 asdfjahsdfjha  asdfasdf", author: "Author 1", duration: 120, rating: 4.5, image: "images/decorations/JS bootcamp 1.png", id: 1 },
    { title: "Course 2", author: "Author 2", duration: 90, rating: 4.2, image: "images/decorations/JS bootcamp 1.png", id: 2 },
    { title: "Course 3", author: "Author 3", duration: 150, rating: 4.7, image: "images/decorations/JS bootcamp 1.png", id: 3 },
    { title: "Course 4", author: "Author 4", duration: 180, rating: 4.9, image: "images/decorations/JS bootcamp 1.png", id: 4 },
    { title: "Course 5", author: "Author 5", duration: 120, rating: 4.5, image: "images/decorations/JS bootcamp 1.png", id: 5 },
    { title: "Course 6", author: "Author 6", duration: 90, rating: 4.2, image: "images/decorations/JS bootcamp 1.png", id: 6 },
    { title: "Course 7", author: "Author 7", duration: 150, rating: 4.7, image: "images/decorations/JS bootcamp 1.png", id: 7 },
    { title: "Course 8", author: "Author 8", duration: 180, rating: 4.9, image: "images/decorations/JS bootcamp 1.png", id: 8 },
    { title: "Course 9", author: "Author 9", duration: 120, rating: 4.5, image: "images/decorations/JS bootcamp 1.png", id: 9 },
    { title: "Course 10", author: "Author 10", duration: 90, rating: 4.2, image: "images/decorations/JS bootcamp 1.png", id: 10 },
    { title: "Course 11", author: "Author 11", duration: 150, rating: 4.7, image: "images/decorations/JS bootcamp 1.png", id: 11 },
    { title: "Course 12", author: "Author 12", duration: 180, rating: 4.9, image: "images/decorations/JS bootcamp 1.png", id: 12 },
  ]

  return (
    <>
      <title>
        Millenium LMS by GNF Labs
      </title>
      <main className="flex h-full flex-col p-4">
        <div className="parallax-bg" />
        <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} />
        <h2 className="items-center flex flex-row w-full justify-center font-black py-8">
            Recommended Courses
        </h2>
        <div ref={carouselRef} className="flex overflow-x-hidden carousel m-2 w-full">
            {recommendedCourses.map((course, index) => (
            <div key={index} className="flex-shrink-0 h-auto w-[23%] px-3 pt-1 pb-5">
                <CourseCard title={course.title} author={course.author} duration={course.duration} rating={course.rating} image={course.image} id={course.id} />
            </div>
            ))}
        </div>
        <div className="flex flex-row justify-center space-x-4 mt-4">
          <NormalButton1 text="Previous" onClick={scrollLeft} />
          <NormalButton2 text="Next" onClick={scrollRight} />
        </div>
        <div>
            <h2 className="items-center flex w-full justify-center font-black py-8">
                All Courses
            </h2>
            <div className="grid grid-cols-4">
                {courses.map((course,index) => (
                <div key={index} className="flex-shrink-0 w-full px-3 pt-1 pb-5">
                    <CourseCard title={course.title} author={course.author} duration={course.duration} rating={course.rating} image={course.image} id={course.id} />
                </div>
                ))}
            </div>
        </div>


      </main>
    </>

  );
}