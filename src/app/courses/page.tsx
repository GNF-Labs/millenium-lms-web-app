"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { poppins } from "../fonts";
import { navigationRoute } from "../constants";
import NavigationBar from "@/components/navbar/navigation-bar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect , useReducer } from "react";
import { fetchCourses, fetchOnDemandCourses } from "@/services/handlers";
import { getCoursesByCategory, getRecommendedCourses } from "@/services/course-handlers";
import { initialState, reducer } from "./reducer";
import { CardCarousel } from "@/components/cards/card-carousel";
import { useAppSelector } from "@/redux/hooks";
import { fetchProfile } from "@/services/handlers";

/**
 * Courses Screen
 * @returns
 */
export default function Courses() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const tokenSelector = useAppSelector((state) => state.jwt)

  const SearchCourses = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(state.search === "") {return;}
    const searchParams = new URLSearchParams();
    searchParams.set("page", "1");
    searchParams.set("q", state.search);
    console.log(searchParams.toString());
    router.push("/courses/search?" + searchParams.toString());
  }

  const fetchCourse = async () => {
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
      image: course.image_url === "" ? "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg" : course.image_url
    }));
    return courses;
  }
  const fetchOnDemandCourse = async () => {
    const { status, data } = await fetchOnDemandCourses();
    if (status !== 200) {
      console.error(`Error fetching courses: ${data}`);
      return [];
    }
    const courses = data.map((course: any) => ({
      title: course.name,
      duration: course.time_estimated,
      rating: course.rating,
      id: course.id,
      image: course.image_url === "" ? "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg" : course.image_url
    }));
    return courses;
  }
  const fetchRecommendedCourse = async () => {
    const { status, data } = await getRecommendedCourses(tokenSelector.user_id ?? 1,1);
    if (status !== 200) {
      console.error(`Error fetching courses: ${data}`);
      return [];
    }
    console.log(data.image_url);
    const courses = data["data"].map((course: any) => ({
      title: course.name,
      duration: course.time_estimated,
      rating: course.rating,
      id: course.id,
      image: course.image_url === "" ? "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg" : course.image_url
    }));
    return courses;
  }

  const fetchCourseByCategory = async (categoryID:number) => {
    const { status, data } = await getCoursesByCategory(categoryID);
    if (status !== 200) {
      console.error(`Error fetching courses: ${data}`);
      return [];
    }
    const courses = data["courses"].map((course: any) => ({
      title: course.name,
      duration: course.time_estimated,
      rating: course.rating,
      id: course.id,
      image: course.image_url === "" ? "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg" : course.image_url
    }));
    return courses;
  }


  useEffect(() => {
    const init = async () => {
      const profileResponse = await fetchProfile(tokenSelector.username, tokenSelector.token || "")

      // Handle profile response
      if (profileResponse.status === 403 || profileResponse.status === 401) {
        dispatch({type: 'SET_COURSES', payload: {courses: await fetchCourse()}})
      } else {
        dispatch({type: 'SET_COURSES', payload: {courses: await fetchRecommendedCourse()}})
      }
      dispatch({type: 'SET_COURSES', payload: {index:1, courses: await fetchCourseByCategory(1)}})
      dispatch({type: 'SET_COURSES', payload: {index:2, courses: await fetchCourseByCategory(2)}})
      dispatch({type: 'SET_COURSES', payload: {index:3, courses: await fetchCourseByCategory(3)}})
      dispatch({type: 'SET_COURSES', payload: {index:4, courses: await fetchCourseByCategory(4)}})
      dispatch({type: 'SET_COURSES', payload: {index:5, courses: await fetchCourseByCategory(5)}})
      dispatch({type: 'SET_COURSES', payload: {index:6, courses: await fetchOnDemandCourse()}})
      dispatch({type: 'SET_LOAD', payload: true});
    };
    init();
  },[]);

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
                onChange={(e) => dispatch({type: 'SET_SEARCH', payload: e.target.value})}
                className="w-full px-4 py-2 border-2 border-blue-600 rounded-s-md focus:outline-none focus:border-2 focus:border-blue-800" />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-e-md border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:border-blue-600">Search
              </button>
            </form>
          </div>
        </div>
        {state.load &&
          <div className="space-y-8">
            <CardCarousel title="Recommended For You" courses={state.recommendedCourses} />
            <CardCarousel title="Popular Courses" courses={state.onDemandCourses} />
            <CardCarousel title="Programming" courses={state.category1Courses} />
            <CardCarousel title="Data Science/AI" courses={state.category3Courses} />
            <CardCarousel title="Software Development" courses={state.category5Courses} />
            <CardCarousel title="Security" courses={state.category2Courses} />
            <CardCarousel title="Others" courses={state.category4Courses} />
          </div>}

      </main>
    </>

  );
}