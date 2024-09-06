"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { poppins } from "./fonts";
import NavigationBar from "@/components/navbar/navigation-bar";
import { NormalButton1, NormalButton2 } from "@/components/buttons/normal-button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProfile } from "@/services/handlers";
import { CardCarousel } from "@/components/cards/card-carousel";
import { getRecommendedCourses } from "@/services/course-handlers";

/**
 * Home Screen (For landing page)
 * @returns
 */
export default function Home() {
  const router = useRouter();
  const navigationRoute = [
    { name: "Home", route: "/" },
    { name: "Dashboard", route: "/dashboard" },
    { name: "Courses", route: "/courses" },
    { name: "Informations", route: "/informations" },
    { name: "Profile", route: "/profile" },
  ];

  const [courses, setCourses] = useState([])

  function GoToRegister() {
    router.push("/register");
  }
  function GoToLogin() {
    router.push("/login");
  }
  function GoToCourses() {
    router.push("/courses");
  }

  
  const dispatch = useAppDispatch();
  const tokenSelector = useAppSelector((state)=>state.jwt)
  const [loggedIn,setLoggedIn] = useState<boolean>(false)


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
  useEffect(() => {
    const req = async () => {
        try {
            const { status, data } = await fetchProfile(tokenSelector.username, tokenSelector.token || "");
            if (status === 403 || status === 401) {
                setLoggedIn(false)
            } else {
                setLoggedIn(true)
                setCourses(await fetchRecommendedCourse())
            }
        } catch (error) {
            
        }
    }
      req();
  }, [router, tokenSelector])

  return (
    <>
      <title>
        Millenium LMS by GNF Labs
      </title>
      <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} />
      <main className="flex h-screen flex-col p-4">
        <div className="parallax-bg" />
        {loggedIn && <div className="py-6"/>}
        <div className="flex flex-col justify-center h-full pl-12">

          <div className="flex flex-col justify-self-center space-y-2 max-w-[55%]">
            <h2>
              Halo Para Generasi Emas
            </h2>
            <h1>
              Kembangkan bakat digitalmu bersama Millenium LMS
            </h1>
            <h2>
              Belajarlah sesuai minat dan bakat anda!
            </h2>
          </div>
          <div className={`${loggedIn ? "h-8" : "h-16"}`}/>
          {loggedIn
            ?
            <>
            <CardCarousel title="Recommended For You" courses={courses} />
            {/* <div className="w-48 self-center">
              <NormalButton2 text="Find More" onClick={GoToCourses} />
            </div> */}
            </>
            :
            <div className="flex flex-row space-x-4">
              <NormalButton2 text="Register" onClick={GoToRegister}/>
              <NormalButton1 text="Log In" onClick={GoToLogin}/>
            </div>
          }
        </div>




      </main>
    </>

  );
}
