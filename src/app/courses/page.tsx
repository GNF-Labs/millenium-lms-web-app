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
import { useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "./reducer";
import { getCourses } from "@/services/course-handlers";
import axios from "axios";

/**
 * Courses Screen
 * @returns
 */
export default function Courses() {
  const router = useRouter();
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

  const [recommendationState, recommendationDispatch] = useReducer(reducer, initialState);
  
  useEffect(()=> {
    const fetchCourses = async () => {
      // fetch for recommendation 
      try {
        setAllDataLoaded(false);
        const {data:data1, status:status1} = await getCourses();
        if (status1 !== axios.HttpStatusCode.Ok) {
          console.error(data1);
          recommendationDispatch({type: 'SET_ERROR', payload: data1?.error || data1})
          return;
        }

        // change the recommendation state
        console.log(data1);
        recommendationDispatch({type: 'SET_COURSES', payload: data1.courses});
      } catch (error) {
        console.error(error);
      } finally {
        setAllDataLoaded(true);
      }
    }
    fetchCourses()
  }, [])
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
          {allDataLoaded && <CardCarousel title="Recommended For You" courses={recommendationState?.courses ? recommendationState.courses as Array<any> : []} />}
          <CardCarousel title="Web Development" courses={courses} />
          <CardCarousel title="Mobile Development" courses={courses} />
          <CardCarousel title="Data Science" courses={courses} />
        </div>

      </main>
    </>

  );
}