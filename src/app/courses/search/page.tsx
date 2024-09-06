"use client";

import Search from "./halaman"
import { Suspense } from "react";

/**
 * Course Search Screen
 * @returns
 */
export default function SearchPage() {
    return(
        <Suspense>
            <Search />
        </Suspense>
    )
}