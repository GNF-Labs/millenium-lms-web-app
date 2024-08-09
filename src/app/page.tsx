"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { poppins } from "./fonts";
import NavigationBar from "@/components/navbar/navigation-bar";
import { NormalButton1, NormalButton2 } from "@/components/buttons/normal-button";
import { useRouter } from "next/navigation";

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

  function GoToRegister() {
    router.push("/register");
  }
  function GoToLogin() {
    router.push("/login");
  }

  return (
    <>
      <title>
        Millenium LMS by GNF Labs
      </title>
      <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} />
      <main className="flex h-screen flex-col p-4">
        <div className="parallax-bg" />
        
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
          <div className="md:h-16"/>
          <div className="flex flex-row space-x-4">
            <NormalButton2 text="Register" onClick={GoToRegister}/>
            <NormalButton1 text="Log In" onClick={GoToLogin}/>
          </div>
        </div>




      </main>
    </>

  );
}
