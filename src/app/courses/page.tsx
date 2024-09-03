"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { poppins } from "../fonts";
import { navigationRoute } from "../constants";
import NavigationBar from "@/components/navbar/navigation-bar";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { CourseCard } from "@/components/cards/course-card";
import { CardCarousel } from "@/components/cards/card-carousel";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchCourses } from "@/services/handlers";

/**
 * Courses Screen
 * @returns
 */
export default function Courses() {
  const router = useRouter();
  const [courseState, setCourseState] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [allDataLoaded, setAllDataLoaded] = useState(true);
  const SearchCourses = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(search === "") {return;}
    const searchParams = new URLSearchParams();
    searchParams.set("page", "1");
    searchParams.set("q", search);
    console.log(searchParams.toString());
    router.push("/courses/search?" + searchParams.toString());
  }

  const fetchCourseData = async () => {
    const { status, data } = await fetchCourses();
    if (status !== 200) {
      console.error(`Error fetching courses: ${data}`);
      return [];
    }
    const courses = data.map((course: any) => ({
      title: course.name,
      duration: course.time_estimated,
      rating: course.rating,
      id: course.id,
      author: "m",
      image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg"
    }));
    return courses;
  }
  useEffect(() => {
    const init = async () => {
      const dbCourses = await fetchCourseData();
      setCourseState(dbCourses);
      setLoad(true);
    };
    init();
  },[]);
  
  const courses = [
    { name: "Course 1 asdfjahsdfjha  asdfasdf", author: "Author 1", time_estimated: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 1 },
    { name: "Course 2", author: "Author 2", time_estimated: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 2 },
    { name: "Course 3", author: "Author 3", time_estimated: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 3 },
    { name: "Course 4", author: "Author 4", time_estimated: 180, rating: 4.9, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 4 },
    { name: "Course 5", author: "Author 5", time_estimated: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 5 },
    { name: "Course 6", author: "Author 6", time_estimated: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 6 },
    { name: "Course 7", author: "Author 7", time_estimated: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 7 },
    { name: "Course 8", author: "Author 8", time_estimated: 180, rating: 4.9, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 8 },
  ]
  if(!load){
    return
  }
  console.log(courseState);
  console.log(courses);

  return (
    <>
      <title>
        Millenium LMS by GNF Labs
      </title>
      <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} />
      <main className="flex h-full flex-col px-8 pt-24 pb-4">
        <div className="parallax-bg" />
        <div className="flex flex-col pb-4 gap-y-3">
          <h2 className="font-black text-2xl">
            Search Course
          </h2>
          <div className="flex flex-row">
            <form onSubmit={SearchCourses} className="flex items-center mb-8 w-1/3">
              <input type="text" 
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-600 rounded-s-md focus:outline-none focus:border-2 focus:border-blue-800" />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-e-md border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:border-blue-600">Search
              </button>
            </form>
          </div>
        </div>
        <div className="space-y-8">
          <CardCarousel title="Recommended For You" courses={courseState} />
          <CardCarousel title="Web Development" courses={courses} />
          <CardCarousel title="Mobile Development" courses={courses} />
          <CardCarousel title="Data Science" courses={courses} />
        </div>

      </main>
    </>

  );
}