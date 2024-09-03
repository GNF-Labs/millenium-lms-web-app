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

  const courses = [
    { title: "Course 1 asdfjahsdfjha  asdfasdf", author: "Author 1", duration: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 1 },
    { title: "Course 2", author: "Author 2", duration: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 2 },
    { title: "Course 3", author: "Author 3", duration: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 3 },
    { title: "Course 4", author: "Author 4", duration: 180, rating: 4.9, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 4 },
    { title: "Course 5", author: "Author 5", duration: 120, rating: 4.5, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 5 },
    { title: "Course 6", author: "Author 6", duration: 90, rating: 4.2, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 6 },
    { title: "Course 7", author: "Author 7", duration: 150, rating: 4.7, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 7 },
    { title: "Course 8", author: "Author 8", duration: 180, rating: 4.9, image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", id: 8 },
  ]

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


  useEffect(() => {
    const req = async () => {
        try {
            const { status, data } = await fetchProfile(tokenSelector.username, tokenSelector.token || "");
            if (status === 403 || status === 401) {
                setLoggedIn(false)
            } else {
                setLoggedIn(true)
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
