"use client";

import NavigationBar from "@/components/navbar/navigation-bar";
import ProgressBar from "@/components/progress-bar/progress-bar";
import Accordion from "@/components/accordion/accordion";
import Review from "@/components/review/review";
import { useRef, useState, useEffect } from 'react';
import { navigationRoute } from "@/app/constants";
import { Tabs } from "@/components/tabs/tabs";
import { fetchCourseById, fetchUserInteractions } from "@/services/handlers";
import { FaStar } from "react-icons/fa";
import ChapterCard from "@/components/cards/chapter-card";
import { useAppSelector } from "@/redux/hooks";
import { useUserBehaviour } from "@/providers/UserBehaviourProvider";

/**
 * Course Screen
 * @returns
 */
export default function Course({ params }: { params: { courseId: number } }) {
  const [selectedTab, setSelectedTab] = useState("Course Info")
  const [enrolled, setEnrolled] = useState(false)
  const [dbCourse, setDbCourse] = useState<any>(null)
  const [interactions, setInteractions] = useState<any>(null)
  const tokenSelector = useAppSelector((state) => state.jwt)
  const userBehaviourContext = useUserBehaviour();

  useEffect(() => {
    const fetchCourseData = async () => {
      const [{ status: status1, data: data1 }, { status: status2, data: data2 }] = await Promise.all([
        fetchCourseById(params.courseId),
        fetchUserInteractions(tokenSelector.username, tokenSelector.token as string, params.courseId)
      ])

      if (status1 !== 200) {
        console.error(`Error fetching courses: ${data1}`);
      }

      if (status2 !== 200) {
        console.error(`Error fetching courses: ${data2}`);
      }

      const course = {
        title: data1.name,
        duration: data1.time_estimated,
        rating: data1.rating,
        id: data1.id,
        description: data1.description,
        chapters: data1.chapters,
        image: data1.image_url === "" ? "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg" : data1.image_url
      };

      const interactions = data2.interactions || data2.interaction;
      return [course, interactions];
    }
    const init = async () => {
      const [dbCourse, interactions] = await fetchCourseData();
      setDbCourse(dbCourse);
      setInteractions(interactions);
      console.log(dbCourse);
      console.log(interactions);
    };
    init();
  }, [params.courseId, tokenSelector.token, tokenSelector.username]);
  // const course = courses.find((course) => course.id === params.courseId)

  const handleEnroll = async () => {
    try {
      const data = {
        course_id: dbCourse.id,
        user_id: Number(tokenSelector.user_id),
        last_interaction: new Date().toISOString(),
        registered: true,
      };
      console.log(data)
      console.log(tokenSelector.token)
      await userBehaviourContext.updateData(data, tokenSelector.token as string)

      console.log("course enrolled")
    } catch (error) {
      console.error(error)
    }
  }
  const tabOptions = ["Course Info", "Course Contents"]
  const changeTab = (selectedOption: string) => { setSelectedTab(selectedOption) }

  const renderOverview = () => {
    if (enrolled) {
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
          <div className="h-10" />
          <button className="w-full h-12 bg-[rgba(0,168,225,1)] text-white text-[16px] font-thin rounded-xl hover:bg-[rgb(2,110,148)] transition-colors">
            Continue Learning
          </button>
          <p className="text-center">You enrolled in the course on January 14, 2023</p>
        </div>
      )
    } else {
      return (
        <div className="backdrop-blur-md bg-[rgba(255,254,254,0.73)] rounded-2xl shadow-md h-full w-2/5 p-4 space-y-2">
          <h3 className="font-black text-black text-2xl">
            Course Overview
          </h3>
          <span className="flex items-center text-black">
            <>
              <p className="pr-2">Overall Rating</p>
              <FaStar color="yellow" />
            </>
            <p className="pl-1">{dbCourse !== null ? dbCourse.rating : "-"}</p>
          </span>
          <div className="h-10" />
          <button className="w-full h-12 bg-[rgba(0,168,225,1)] text-white text-[16px] font-thin rounded-xl hover:bg-[rgb(2,110,148)] transition-colors" onClick={handleEnroll} >
            Enroll Course
          </button>
        </div>
      )
    }
  }
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Course Contents":
        return (
          <div className="space-y-4">
            {dbCourse?.chapters.map((chapter: any) => (
              <ChapterCard key={chapter.id} id={chapter.id} name={chapter.name} />
            ))}

          </div>
        )
      case "Course Info":
        return (
          <p>{dbCourse?.description}</p>
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
      <NavigationBar logo={{ source: "images/logo_GNF.png", width: 90, height: 90 }} navigationMenu={navigationRoute} />
      <main className="flex h-full flex-col p-4">
        <div className="parallax-bg" />
        <div className="py-8" />
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
          <div className="py-2" />
          <Tabs options={tabOptions} onSelectTab={changeTab} />
          <div className="p-4 backdrop-blur-md bg-[rgba(255,254,254,0.73)] rounded-b-2xl">{renderTabContent()}</div>
        </div>

      </main>
    </>
  )
}