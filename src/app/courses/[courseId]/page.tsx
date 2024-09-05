"use client";

import NavigationBar from "@/components/navbar/navigation-bar";
import ProgressBar from "@/components/progress-bar/progress-bar";
import Accordion from "@/components/accordion/accordion";
import Review from "@/components/review/review";
import { useRef, useState, useEffect } from 'react';
import { navigationRoute } from "@/app/constants";
import { Tabs } from "@/components/tabs/tabs";
import { fetchCourseById } from "@/services/handlers";
import { FaStar } from "react-icons/fa";

/**
 * Course Screen
 * @returns
 */
export default function Course({ params }: { params: { courseId: number } }) {
    const [selectedTab, setSelectedTab] = useState("Content")
    const [enrolled, setEnrolled] = useState(false)
    const [dbCourse, setDbCourse] = useState<any>(null)
    const fetchCourseData = async () => {
      const { status, data } = await fetchCourseById(params.courseId);
      if (status !== 200) {
        console.error(`Error fetching courses: ${data}`);
        return [];
      }
      const course = {
        title: data.name,
        duration: data.time_estimated,
        rating: data.rating,
        id: data.id,
        description: data.description,
        author: "m",
        image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg"
      };
      return course;
    }
    useEffect(() => {
      const init = async () => {
        const dbCourse = await fetchCourseData();
        setDbCourse(dbCourse);
        console.log(dbCourse);
      };
      init();
    },[]);
    // const course = courses.find((course) => course.id === params.courseId)


    const tabOptions = ["Content", "Course Info", "Reviews", "Announcements"]
    const changeTab = (selectedOption: string) => { setSelectedTab(selectedOption) }

    const renderOverview = () => {
      if(enrolled){
        return (
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
        )
      } else {
        return(
          <div className="backdrop-blur-md bg-[rgba(255,254,254,0.73)] rounded-2xl shadow-md h-full w-2/5 p-4 space-y-2">
            <h3 className="font-black text-black text-2xl">
              Course Overview
            </h3>
            <span className="flex items-center text-black">
              <>
                <p className="pr-2">Overall Rating</p>
                <FaStar color="yellow"/>
              </>
              <p className="pl-1">{dbCourse !== null ? dbCourse.rating : "-"}</p>
            </span>
            <div className="h-10"/>
            <button className="w-full h-12 bg-[rgba(0,168,225,1)] text-white text-[16px] font-thin rounded-xl hover:bg-[rgb(2,110,148)] transition-colors">
              Enroll Course
            </button>
          </div>
        )
      }
    }
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
                    <p>{dbCourse?.description}</p>
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
                    <p>{dbCourse?.author}</p>
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
                    <h1 className="flex flex-row w-full font-black py-4">
                        {dbCourse?.title}
                    </h1>
                    <div className="flex flex-row h-96 w-full justify-between space-x-4">
                        <img
                        className="rounded-2xl h-full w-3/5 object-cover shadow-md" 
                        src={dbCourse?.image ?? ""}
                        alt={dbCourse?.title ?? ""}
                        />
                        {renderOverview()}
                    </div>
                    <div className="py-2"/>
                    <Tabs options={tabOptions} onSelectTab={changeTab} />
                    <div className="p-4 backdrop-blur-md bg-[rgba(255,254,254,0.73)] rounded-b-2xl">{renderTabContent()}</div>
                </div>

            </main>
        </>
    )
}