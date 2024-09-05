"use client";

import { navigationRoute } from "@/app/constants";
import NavigationBar from "@/components/navbar/navigation-bar";
import { CourseCard, CourseCardProps } from "@/components/cards/course-card";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { searchCourses } from "@/services/course-handlers";

/**
 * Course Search Screen
 * @returns
 */
export default function Courses() {
    const router = useRouter();
    const [params, setParams] = useState(new URLSearchParams(useSearchParams()));
    const [load, setLoad] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(params.get("q") ?? "");
    const [courseState, setCourseState] = useState([{title:"", duration:0, rating:0, id:0, author:"", image:""}]);

    const SearchCourses = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        if(search !== "") {
            searchParams.set("q", search);
        }
        searchParams.set("page", "1");
        router.push("/courses/search?" + searchParams.toString());
        setParams(searchParams);
    }
    const ChangePage = (newPage: number) => {
        const searchParams = new URLSearchParams();
        searchParams.set("q", search);
        searchParams.set("page", newPage.toString());
        router.push("/courses/search?" + searchParams.toString());
        setParams(searchParams);
    }
    
    const fetchCourseData = async () => {
        const { status, data } = await searchCourses(params);
        if (status !== 200) {
            console.error(`Error fetching courses: ${data}`);
            return [];
        }
        setTotalPages(data["total_pages"]);
        const courses = data["courses"].map((course: any) => ({
            title: course.name,
            duration: course.time_estimated,
            rating: course.rating,
            id: course.id,
            author: "m",
            image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg"
        }))
        return courses;
    }

    const GetPageNumbers = () => {
        let pages = [];
        let currPage = parseInt(params.get("page") ?? "1");
    
        // Always include the first page
        pages.push(1);
    
        // Pages within range of ±2 from the current page
        for (let i = currPage - 2; i <= currPage + 2; i++) {
          if (i > 1 && i < totalPages) {
            pages.push(i);
          }
        }
    
        // Always include the last page
        if (totalPages > 1) {
          pages.push(totalPages);
        }
    
        // Filter out duplicates and return
        return pages;
      };
    const pageNumbers = GetPageNumbers();
    
    
    const init = async () => {
        const dbCourses = await fetchCourseData();
        setCourseState(dbCourses);
        setLoad(true);
    };
    useEffect(() => {
        setLoad(false);
        init();
    },[params]);

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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-blue-600 rounded-s-md focus:outline-none focus:border-2 focus:border-blue-800" />
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-e-md border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:border-blue-600">Search
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-5 gap-x-4">
                {load ? courseState.map((course,index) => (
                        <div key={index} className="flex-shrink-0 w-full pt-1 pb-5">
                            <CourseCard title={course.title} author={course.author} duration={course.duration} rating={course.rating} image={course.image} id={course.id} />
                        </div>
                )): null}
                </div>
            </div>
            <div className="flex flex-row justify-center align-middle relative my-3">
                <button 
                    disabled={parseInt(params.get("page") ?? "1") === 1}
                    onClick={() => ChangePage(parseInt(params.get("page") ?? "1")-1)}>
                    <FaCaretLeft className="left-0 transform text-3xl text-black disabled:text-gray-600" />
                </button>
                <div className="flex space-x-1">
                    {pageNumbers.map((pageNumber, index) => {
                    // Check if a gap is needed between this and the previous page number
                    const isGap = index > 0 && pageNumber !== pageNumbers[index - 1] + 1;
                    return (
                        <div key={index} className="flex items-center">
                        {isGap && <span className="px-2 text-black">...</span>}
                        <button
                            onClick={() => ChangePage(pageNumber)}
                            className={`px-3 py-1 ${
                                parseInt(params.get("page") ?? "1") === pageNumber
                                ? 'text-black font-black'
                                : 'text-gray-600'
                            }`}
                        >
                            {pageNumber}
                        </button>
                        </div>
                    );
                    })}
                </div>
                <button
                    disabled={parseInt(params.get("page") ?? "1") === totalPages}
                    onClick={() => ChangePage(parseInt(params.get("page") ?? "1")+1)}>
                    <FaCaretRight className="right-0 transform text-3xl text-black disabled:text-gray-600" />
                </button>
            </div>
        </main>
        </>

    );
}