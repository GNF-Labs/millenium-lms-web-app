"use client";

import NavigationBar from "@/components/navbar/navigation-bar";
import ProgressBar from "@/components/progress-bar/progress-bar";
import Accordion from "@/components/accordion/accordion";
import Review from "@/components/review/review";
import { useRef, useState } from 'react';
import { navigationRoute } from "@/app/constants";
import { Tabs } from "@/components/tabs/tabs";

/**
 * Course Screen
 * @returns
 */
export default function Course({ params }: { params: { courseId: string } }) {
    const [selectedTab, setSelectedTab] = useState("Content")
    // const course = await fetch('[apilink]').then((res) => res.json())
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
    ]
    const course = courses.find((course) => course.id === parseInt(params.courseId))


    const tabOptions = ["Content", "Course Info", "Reviews", "Announcements"]
    const changeTab = (selectedOption: string) => { setSelectedTab(selectedOption) }
    const renderTabContent = () => {
        switch(selectedTab) {
            case "Content":
                return (
                    <div className="space-y-4">
                    <Accordion 
                    title="Course Content" 
                    content= {
                        <ul className="space-y-2 text-black">
                        <li className="flex justify-between items-center">
                          <span>Apa itu HTML?</span>
                          <span>05:16</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Set Up</span>
                          <span>03:15</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Membuat Header</span>
                          <span>04:15</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Membuat List</span>
                          <span>05:15</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Tes Akhir</span>
                          <span>1 pertanyaan</span>
                        </li>
                      </ul>
                    }/>
                    <Accordion 
                    title="Course Content" 
                    content= {
                        <ul className="space-y-2 text-black">
                        <li className="flex justify-between items-center">
                          <span>Apa itu HTML?</span>
                          <span>05:16</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Set Up</span>
                          <span>03:15</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Membuat Header</span>
                          <span>04:15</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Membuat List</span>
                          <span>05:15</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Tes Akhir</span>
                          <span>1 pertanyaan</span>
                        </li>
                      </ul>
                    }/>
                    </div>
                )
            case "Course Info":
                return (
                    <p>{course?.author}</p>
                )
            case "Reviews":
                return (
                    <div className="space-y-4">
                    <Review name="John Doe" profilePicture="https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg" rating={4} reviewText="This course is amazing! I learned a lot from it." />
                    <Review name="John Doe" profilePicture="https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg" rating={4} reviewText="This course is amazing! I learned a lot from it." />
                    </div>
                )
            case "Announcements":
                return (
                    <p>{course?.author}</p>
                )
            default:
                return null
        }
    }

    return (
        <>
            <title>
                Millenium LMS by GNF Labs
            </title>
            <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} />
            <main className="flex h-full flex-col p-4">
                <div className="parallax-bg" />
                <div className="py-8"/>
                <div className="px-12">
                    <h2 className="flex flex-row w-full font-black py-4">
                        {course?.title}
                    </h2>
                    <div className="flex flex-row h-96 w-full justify-between space-x-4">
                        <img
                        className="rounded-2xl h-full w-3/5 object-cover shadow-md" 
                        src={course?.image ?? ""}
                        alt={course?.title ?? ""}
                        />
                        <div className="backdrop-blur-md bg-[rgba(255,254,254,0.73)] rounded-2xl shadow-md h-full w-2/5 p-4 space-y-2">
                            <h3 className="font-black text-black text-2xl">
                            Course Progress
                            </h3>
                            <div className="flex flex-row justify-between">
                                <p>1/23</p>
                                <p>4% Complete</p>
                            </div>
                            <ProgressBar progress={4} />
                            <div className="h-10"/>
                            <button className="w-full h-12 bg-[rgba(0,168,225,1)] text-white text-[16px] font-thin rounded-xl hover:bg-[rgb(2,110,148)] transition-colors">
                                Continue Learning
                            </button>
                            <p className="text-center">You enrolled in the course on January 14, 2023</p>
                        </div>
                    </div>
                    <div className="py-2"/>
                    <Tabs options={tabOptions} onSelectTab={changeTab} />
                    <div className="p-4 backdrop-blur-md bg-[rgba(255,254,254,0.73)] rounded-b-2xl">{renderTabContent()}</div>
                </div>

            </main>
        </>
    )
}