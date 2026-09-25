"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navber = () => {
    const [planCount, setPlanCount] = useState(0);

    useEffect(() => {
        const handlePlanUpdate = (event: Event) => {
            const customEvent = event as CustomEvent<number>;

            setPlanCount(customEvent.detail);
        };

        window.addEventListener("planUpdated", handlePlanUpdate);

        return () => {
            window.removeEventListener("planUpdated", handlePlanUpdate);
        };
    }, []);

    return (
        <div className="navbar bg-[#090a0c] border-b border-white/10">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">

                {/* Left Side */}
                <div className="navbar-start">

                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-sm text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        {/* Mobile Dropdown */}
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-[#15171c] text-white rounded-box z-50 mt-3 w-48 p-2 shadow-lg"
                        >
                            <li>
                                <Link
                                    href="/"
                                    className="text-lime-400"
                                >
                                    Workouts
                                </Link>
                            </li>

                            <li>
                                <Link href="/myplan">
                                    My Plan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-lg sm:text-xl font-black text-white ml-1"
                    >
                        FITLOG
                    </Link>
                </div>

                {/* Center Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-6">

                        <li>
                            <Link
                                href="/"
                                className="text-lime-400 font-semibold cursor-pointer"
                            >
                                Workouts
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/myplan"
                                className="text-gray-400 hover:text-white cursor-pointer transition"
                            >
                                My Plan
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Right Side */}
                <div className="navbar-end">
                    <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">

                        {/* Plan */}
                        <Link
                            href="/myplan"
                            className="flex items-center text-gray-300 hover:text-white transition"
                        >
                            <span>Plan</span>

                            <span className="ml-1 sm:ml-2 bg-lime-400 text-black px-2 py-0.5 rounded-full text-xs font-bold">
                                {planCount}
                            </span>
                        </Link>

                        {/* Saved */}
                        <div className="flex items-center text-gray-300">
                            <span>Saved</span>

                            <span className="ml-1 sm:ml-2 bg-gray-700 text-white px-2 py-0.5 rounded-full text-xs">
                                0
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navber;