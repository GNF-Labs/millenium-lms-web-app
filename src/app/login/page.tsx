"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { poppins } from "@/app/fonts";
import NavigationBar from "@/components/navbar/navigation-bar";
import LoginBox from "@/components/loginbox/loginbox";
import { NormalButton1, NormalButton2 } from "@/components/buttons/normal-button";

/**
 * Login Screen
 * @returns
 */
export default function Login() {
  const navigationRoute = [
    { name: "Home", route: "/" },
    { name: "Dashboard", route: "/dashboard" },
    { name: "Courses", route: "/courses" },
    { name: "Informations", route: "/informations" },
    { name: "Profile", route: "/profile" },
  ];

  return (
    <>
      <title>
        Login
      </title>
      <main className="flex h-screen flex-col p-4">
        <div className="parallax-bg" />
        <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} />
        <LoginBox isLogin={true}/>
      </main>
    </>

  );
}
