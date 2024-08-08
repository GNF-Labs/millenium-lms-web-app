'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { poppins } from "./fonts";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <ReduxProvider store={store}>

        <body className={poppins.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
