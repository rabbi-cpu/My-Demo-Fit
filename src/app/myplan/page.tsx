"use client";

import {
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";

import Link from "next/link";

import MyPlanCard from "@/src/app/component/MyPlanCard";
import MyPlanToggle from "../component/MyPlanToggle";
import type { IWorkout } from "@/src/app/WorkoutType";

const PLAN_KEY = "my-plan";
const SAVED_KEY = "savedWorkouts";

// ========================================
// Today's Plan
// ========================================

const subscribePlan = (callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener("planUpdated", callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("planUpdated", callback);
    };
};

const getPlanSnapshot = () => {
    return localStorage.getItem(PLAN_KEY) ?? "[]";
};

const getPlanServerSnapshot = () => {
    return "[]";
};

// ========================================
// Saved Workouts
// ========================================

const subscribeSaved = (callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener(
        "savedWorkoutsUpdated",
        callback
    );

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(
            "savedWorkoutsUpdated",
            callback
        );
    };
};

const getSavedSnapshot = () => {
    return localStorage.getItem(SAVED_KEY) ?? "[]";
};

const getSavedServerSnapshot = () => {
    return "[]";
};

// ========================================
// My Plan
// ========================================

const MyPlan = () => {
    const [activeTab, setActiveTab] = useState<
        "today" | "saved"
    >("today");

    const [sortBy, setSortBy] = useState("Duration");

    // ========================================
    // Today's Plan Data
    // ========================================

    const planSnapshot = useSyncExternalStore(
        subscribePlan,
        getPlanSnapshot,
        getPlanServerSnapshot
    );

    const workouts = useMemo<IWorkout[]>(() => {
        try {
            const plan = JSON.parse(planSnapshot);

            return Array.isArray(plan) ? plan : [];
        } catch (error) {
            console.error(
                "Failed to load my plan:",
                error
            );

            return [];
        }
    }, [planSnapshot]);

    // ========================================
    // Saved Workouts Data
    // ========================================

    const savedSnapshot = useSyncExternalStore(
        subscribeSaved,
        getSavedSnapshot,
        getSavedServerSnapshot
    );

    const savedWorkouts = useMemo<IWorkout[]>(() => {
        try {
            const saved = JSON.parse(savedSnapshot);

            return Array.isArray(saved) ? saved : [];
        } catch (error) {
            console.error(
                "Failed to load saved workouts:",
                error
            );

            return [];
        }
    }, [savedSnapshot]);

    // ========================================
    // Active Workouts
    // ========================================

    const activeWorkouts =
        activeTab === "today"
            ? workouts
            : savedWorkouts;

    // ========================================
    // Remove From Today's Plan
    // ========================================

    const handleRemove = (id: IWorkout["id"]) => {
        const updatedPlan = workouts.filter(
            (workout) => workout.id !== id
        );

        localStorage.setItem(
            PLAN_KEY,
            JSON.stringify(updatedPlan)
        );

        window.dispatchEvent(
            new CustomEvent("planUpdated", {
                detail: updatedPlan.length,
            })
        );
    };

    // ========================================
    // Done
    // ========================================

    const handleDone = (id: IWorkout["id"]) => {
        const updatedPlan = workouts.filter(
            (workout) => workout.id !== id
        );

        localStorage.setItem(
            PLAN_KEY,
            JSON.stringify(updatedPlan)
        );

        window.dispatchEvent(
            new CustomEvent("planUpdated", {
                detail: updatedPlan.length,
            })
        );
    };

    // ========================================
    // Remove Saved Workout
    // ========================================

    const handleRemoveSaved = (
        id: IWorkout["id"]
    ) => {
        const updatedSavedWorkouts =
            savedWorkouts.filter(
                (workout) => workout.id !== id
            );

        localStorage.setItem(
            SAVED_KEY,
            JSON.stringify(updatedSavedWorkouts)
        );

        window.dispatchEvent(
            new CustomEvent("savedWorkoutsUpdated")
        );
    };

    // ========================================
    // Sort
    // ========================================

    const sortedWorkouts = [...activeWorkouts].sort(
        (a, b) => {
            if (sortBy === "Duration") {
                return a.duration - b.duration;
            }

            if (sortBy === "Calories") {
                return (
                    b.caloriesBurned -
                    a.caloriesBurned
                );
            }

            if (sortBy === "Rating") {
                return b.rating - a.rating;
            }

            return 0;
        }
    );

    // ========================================
    // Stats
    // ========================================

    const totalExercises = activeWorkouts.length;

    const totalMinutes = activeWorkouts.reduce(
        (total, workout) =>
            total + workout.duration,
        0
    );

    const totalCalories = activeWorkouts.reduce(
        (total, workout) =>
            total + workout.caloriesBurned,
        0
    );

    // ========================================
    // UI
    // ========================================

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

            {/* ========================================
                1. Header
            ======================================== */}

            <div className="mb-8 sm:mb-10">
                <h1 className="text-3xl font-bold sm:text-4xl">
                    My Plan
                </h1>

                <p className="mt-2 text-sm text-gray-400 sm:text-base">
                    Cap of five lifts for today.
                    Finish them, then load more.
                </p>
            </div>

            {/* ========================================
                2. Stats
            ======================================== */}

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">

                {/* Exercises */}
                <div className="rounded-2xl border border-white/10 bg-[#191c22] p-6 sm:p-8">
                    <p className="text-sm text-gray-400">
                        Exercises
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-lime-400 sm:text-4xl">
                        {totalExercises}
                    </h2>
                </div>

                {/* Minutes */}
                <div className="rounded-2xl border border-white/10 bg-[#191c22] p-6 sm:p-8">
                    <p className="text-sm text-gray-400">
                        Minutes
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        {totalMinutes}
                    </h2>
                </div>

                {/* Calories */}
                <div className="rounded-2xl border border-white/10 bg-[#191c22] p-6 sm:p-8">
                    <p className="text-sm text-gray-400">
                        Calories
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        {totalCalories}
                    </h2>
                </div>

            </div>

            {/* ========================================
                3. Toggle + Sort
            ======================================== */}

            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                {/* Toggle - Left */}
                <div className="w-full sm:w-auto">
                    <MyPlanToggle
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />
                </div>

                {/* Sort By - Right */}
                <div className="grid w-full gap-2 sm:w-auto">
                    <span className="text-sm font-extralight text-white">
                        Sort By
                    </span>

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-[#15171c] px-4 py-2 text-sm outline-none sm:w-40"
                    >
                        <option value="Duration">
                            Duration
                        </option>

                        <option value="Calories">
                            Calories
                        </option>

                        <option value="Rating">
                            Rating
                        </option>
                    </select>
                </div>

            </div>

            {/* ========================================
                4. Workout Cards
            ======================================== */}

            <div className="space-y-4">

                {sortedWorkouts.length > 0 ? (

                    sortedWorkouts.map((workout) => (
                        <MyPlanCard
                            key={workout.id}
                            workout={workout}
                            onRemove={
                                activeTab === "today"
                                    ? handleRemove
                                    : handleRemoveSaved
                            }
                            onDone={handleDone}
                        />
                    ))

                ) : (

                    <div className="rounded-2xl border border-white/10 bg-[#191c22] p-8 text-center sm:p-10">

                        <h3 className="text-2xl font-semibold sm:text-3xl">
                            Nothing here yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                            Browse the library and add a lift to get today moving.
                        </p>

                        <Link
                            href="/#library"
                            className="mt-4 inline-block rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300 sm:text-base"
                        >
                            Browse Workouts
                        </Link>

                    </div>
                )}

            </div>

        </main>
    );
};

export default MyPlan;