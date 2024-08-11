"use client";

import { navigationRoute } from "@/app/constants";
import NavigationBar from "@/components/navbar/navigation-bar";
import { CourseCard } from "@/components/cards/course-card";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, } from "react";
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

/**
 * Course Search Screen
 * @returns
 */
export default function Courses() {
    const router = useRouter();
    const currentParams = useSearchParams();
    const [search, setSearch] = useState(currentParams.get("q") ?? "");
    
    const title = currentParams.get("q") ?? ""
    const page = parseInt(currentParams.get("page") ?? "1")
    const totalPages = 5 // ganti dengan jumlah halaman yang sesuai

    const SearchCourses = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(search === "") {return;}
        const searchParams = new URLSearchParams();
        searchParams.set("q", search);
        router.push("/courses/search?" + searchParams.toString());
    }
    const ChangePage = (newPage: number) => {
        const searchParams = new URLSearchParams();
        searchParams.set("page", newPage.toString());
        searchParams.set("q", search);
        router.push("/courses/search?" + searchParams.toString());
    }
    
    const courses = [
        { title: "Course 1 asdfjahsdfjha  asdfasdf", author: "Author 1", duration: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 1 },
        { title: "Course 2", author: "Author 2", duration: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 2 },
        { title: "Course 3", author: "Author 3", duration: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 3 },
        { title: "Course 4", author: "Author 4", duration: 180, rating: 4.9, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 4 },
        { title: "Course 5", author: "Author 5", duration: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 5 },
        { title: "Course 6", author: "Author 6", duration: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 6 },
        { title: "Course 7", author: "Author 7", duration: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 7 },
        { title: "Course 8", author: "Author 8", duration: 180, rating: 4.9, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 8 },
        { title: "Course 9", author: "Author 9", duration: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 9 },
        { title: "Course 10", author: "Author 10", duration: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 10 },
        { title: "Course 11", author: "Author 11", duration: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 11 },
        { title: "Course 12", author: "Author 12", duration: 180, rating: 4.9, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 12 },
        { title: "Course 13", author: "Author 13", duration: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 13 },
        { title: "Course 14", author: "Author 14", duration: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 14 },
        { title: "Course 15", author: "Author 15", duration: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 15 },
    ]
    const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(title.toLowerCase()))
    // const shownCourses = filteredCourses.slice((page-1)*5, 10)

    const GetPageNumbers = () => {
        let pages = [];
    
        // Always include the first page
        pages.push(1);
    
        // Pages within range of ±2 from the current page
        for (let i = page - 2; i <= page + 2; i++) {
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
                    {filteredCourses.map((course,index) => (
                        <div key={index} className="flex-shrink-0 w-full pt-1 pb-5">
                            <CourseCard title={course.title} author={course.author} duration={course.duration} rating={course.rating} image={course.image} id={course.id} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center align-middle relative my-3">
                <button 
                    disabled={page === 1}
                    onClick={() => ChangePage(page-1)}>
                    <FaCaretLeft className="left-0 transform text-3xl text-black" />
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
                            page === pageNumber
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
                    disabled={page === totalPages}
                    onClick={() => ChangePage(page+1)}>
                    <FaCaretRight className="right-0 transform text-3xl text-black" />
                </button>
            </div>
        </main>
        </>

    );
}