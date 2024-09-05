'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { poppins } from "./fonts";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import ClientSideInitializer from "@/services/init";
import UserBehaviourProvider from "@/providers/UserBehaviourProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <ReduxProvider store={store}>
        <UserBehaviourProvider>
          <ClientSideInitializer onReady={() => console.log("content is ready")} />
          <body className={poppins.className}>{children}</body>
        </UserBehaviourProvider>
      </ReduxProvider>
    </html>
  );
}
