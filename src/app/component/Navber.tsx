
"use client";

import React, {
    useSyncExternalStore,
} from "react";

import Image from "next/image";
import Link from "next/link";

import logo from "@/asset/logo.png";

const getPlanCount = () => {
    if (typeof window === "undefined") {
        return "[]";
    }

    return localStorage.getItem("my-plan") || "[]";
};

const getSavedCount = () => {
    if (typeof window === "undefined") {
        return "[]";
    }

    return localStorage.getItem("savedWorkouts") || "[]";
};

const subscribePlan = (callback: () => void) => {
    window.addEventListener("planUpdated", callback);
    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener(
            "planUpdated",
            callback
        );

        window.removeEventListener(
            "storage",
            callback
        );
    };
};

const subscribeSaved = (callback: () => void) => {
    window.addEventListener(
        "savedWorkoutsUpdated",
        callback
    );

    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener(
            "savedWorkoutsUpdated",
            callback
        );

        window.removeEventListener(
            "storage",
            callback
        );
    };
};

const getPathname = () => {
    if (typeof window === "undefined") {
        return "/";
    }
    return window.location.pathname;
};

const subscribePathname = (
    callback: () => void
) => {
    window.addEventListener(
        "popstate",
        callback
    );
    return () => {
        window.removeEventListener(
            "popstate",
            callback
        );
    };
};

const Navber = () => {
    const planData = useSyncExternalStore(
        subscribePlan,
        getPlanCount,
        () => "[]"
    );

    const savedData = useSyncExternalStore(
        subscribeSaved,
        getSavedCount,
        () => "[]"
    );

    const pathname = useSyncExternalStore(
        subscribePathname,
        getPathname,
        () => "/"
    );

    const planCount =
        JSON.parse(planData).length;

    const savedCount =
        JSON.parse(savedData).length;

    const isWorkoutsActive =
        pathname === "/" ||
        pathname.startsWith("/workout/");

    const isMyPlanActive =
        pathname === "/my-plan";

    return (
        <div className="sticky top-0 z-50 navbar border-b border-white/10 bg-[#090a0c]">
            <div className="mx-auto flex w-full max-w-7xl items-center px-3 sm:px-6">
                <div className="navbar-start">
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
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content z-50 mt-3 w-48 rounded-box bg-[#15171c] p-2 text-white shadow-lg"
                        >
                            <li>
                                <Link
                                    href="/"
                                    className={
                                        isWorkoutsActive
                                            ? "font-semibold text-lime-400"
                                            : "text-gray-300"
                                    }
                                >
                                    Workouts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/my-plan"
                                    className={
                                        isMyPlanActive
                                            ? "font-semibold text-lime-400"
                                            : "text-gray-300"
                                    }
                                >
                                    My Plan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="ml-1 flex items-center"
                        >
                            <Image
                                src={logo}
                                alt="FITLOG"
                                width={45}
                                height={45}
                                className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                            />
                        </Link>

                        <Link
                            href="/"
                            className="ml-2 text-base font-black text-white sm:text-xl"
                        >
                            FITLOG
                        </Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link
                                href="/"
                                className={
                                    isWorkoutsActive
                                        ? "relative cursor-pointer font-semibold text-lime-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-lime-400"
                                        : "cursor-pointer font-semibold text-gray-400 transition hover:text-white"
                                }
                            >
                                Workouts
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/my-plan"
                                className={
                                    isMyPlanActive
                                        ? "relative cursor-pointer font-semibold text-lime-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-lime-400"
                                        : "cursor-pointer font-semibold text-gray-400 transition hover:text-white"
                                }
                            >
                                My Plan
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className="flex items-center gap-2 text-xs sm:gap-5 sm:text-sm">
                        <Link
                            href="/my-plan"
                            className="flex items-center text-gray-300 transition hover:text-white"
                        >
                            <span>
                                Plan
                            </span>
                            <span className="ml-1 rounded-full bg-lime-400 px-2 py-0.5 text-xs font-bold text-black sm:ml-2">
                                {planCount}
                            </span>
                        </Link>

                        <Link
                            href="/my-plan"
                            className="flex items-center text-gray-300 transition hover:text-white"
                        >
                            <span>
                                Saved
                            </span>
                            <span className="ml-1 rounded-full bg-gray-700 px-2 py-0.5 text-xs text-white sm:ml-2">
                                {savedCount}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navber;
