"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import MyPlanCard from "@/src/app/component/MyPlanCard";
import type { IWorkout } from "@/src/app/WorkoutType";

const PLAN_KEY = "my-plan";

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener("planUpdated", callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("planUpdated", callback);
    };
};

const getSnapshot = () => {
    return localStorage.getItem(PLAN_KEY) ?? "[]";
};

const getServerSnapshot = () => {
    return "[]";
};

const MyPlan = () => {
    const planSnapshot = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    const workouts = useMemo<IWorkout[]>(() => {
        try {
            const plan = JSON.parse(planSnapshot);

            return Array.isArray(plan) ? plan : [];
        } catch (error) {
            console.error("Failed to load my plan:", error);
            return [];
        }
    }, [planSnapshot]);

    const [sortBy, setSortBy] = useState("Duration");

    // Remove workout
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

    // Mark as done
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

    // Sort workouts
    const sortedWorkouts = [...workouts].sort((a, b) => {
        if (sortBy === "Duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "Calories") {
            return b.caloriesBurned - a.caloriesBurned;
        }

        if (sortBy === "Rating") {
            return b.rating - a.rating;
        }

        return 0;
    });

    // Stats
    const totalExercises = workouts.length;

    const totalMinutes = workouts.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = workouts.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    return (
        <main className="container mx-auto px-4 py-20">

            {/* Header */}
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-4xl font-bold">
                        My Plan
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* Toggle View */}
                <button
                    type="button"
                    className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 transition hover:bg-white/10"
                >
                    Toggle View
                </button>

            </div>

            {/* Stats */}
            <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">

                {/* Exercises */}
                <div className="rounded-2xl border border-white/10 p-6">
                    <p className="text-gray-400">
                        Exercises
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {totalExercises}
                    </h2>
                </div>

                {/* Minutes */}
                <div className="rounded-2xl border border-white/10 p-6">
                    <p className="text-gray-400">
                        Minutes
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {totalMinutes}
                    </h2>
                </div>

                {/* Calories */}
                <div className="rounded-2xl border border-white/10 p-6">
                    <p className="text-gray-400">
                        Calories
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {totalCalories}
                    </h2>
                </div>

            </div>

            {/* Sort */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <h2 className="text-xl font-semibold">
                    Today&apos;s Exercises
                </h2>

                <div className="flex items-center gap-2">

                    <span className="text-gray-400">
                        Sort By
                    </span>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#15171c] px-4 py-2 outline-none"
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

            {/* My Plan Cards */}
            <div className="space-y-4">

                {sortedWorkouts.length > 0 ? (

                    sortedWorkouts.map((workout) => (
                        <MyPlanCard
                            key={workout.id}
                            workout={workout}
                            onRemove={handleRemove}
                            onDone={handleDone}
                        />
                    ))

                ) : (

                    <div className="rounded-2xl border border-white/10 bg-[#191c22] p-10 text-center">

                        <h3 className="text-xl font-semibold">
                            No exercises in your plan
                        </h3>

                        <p className="mt-2 text-gray-400">
                            Add some workouts to see them here.
                        </p>

                    </div>

                )}

            </div>

        </main>
    );
};

export default MyPlan;