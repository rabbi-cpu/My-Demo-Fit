import React, { use } from "react";
import fs from "fs/promises";
import path from "path";
import type { IWorkout } from "../WorkoutType";
import Link from "next/link";
import Image from "next/image";

const WorkoutFetch = async (): Promise<IWorkout[]> => {
    const filePath = path.join(
        process.cwd(),
        "public",
        "Workout.json"
    );

    const file = await fs.readFile(filePath, "utf-8");

    return JSON.parse(file);
};

const WorkoutPromise = WorkoutFetch();

const WorkoutCard = () => {
    const workouts = use(WorkoutPromise);

    return (
        <div
            id="library"
            className="mx-auto w-full max-w-7xl px-4 pt-20"
        >
            <h2 className="text-3xl font-bold text-white">
                THE LIBRARY
            </h2>

            <p className="mt-1 text-gray-400">
                Twelve lifts covering every major muscle group.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {workouts.map((workout) => (
                    <Link
                        key={workout.id}
                        href={`/workout/${workout.id}`}
                        className="block"
                    >
                        <div
                            className="w-full overflow-hidden rounded-2xl border border-gray-800 bg-[#15171e] text-white shadow-lg transition hover:-translate-y-1 hover:border-lime-400"
                        >

                            {/* Image */}
                            <Image
                                src={workout.image}
                                alt={workout.name}
                                width={500}
                                height={300}
                                className="h-56 w-full object-cover"
                            />

                            {/* Content */}
                            <div className="p-5">

                                {/* Muscle Groups */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {workout.muscleGroups.map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black"
                                        >
                                            {muscle}
                                        </span>
                                    ))}
                                </div>

                                {/* Name + Difficulty */}
                                <div className="flex items-start justify-between gap-3">

                                    <h2 className="text-xl font-bold">
                                        {workout.name}
                                    </h2>

                                    <span className="shrink-0 rounded-full border border-gray-600 px-3 py-1 text-xs text-gray-300">
                                        {workout.difficulty}
                                    </span>

                                </div>

                                {/* Description */}
                                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-400">
                                    {workout.description}
                                </p>

                                {/* Stats */}
                                <div className="mt-5 flex items-center justify-between border border-gray-800 px-3 py-3 text-sm text-gray-400">

                                    <span>
                                        ◯ {workout.duration} min
                                    </span>

                                    <span>
                                        ♥ {workout.caloriesBurned} kcal
                                    </span>

                                    <span>
                                        ☆ {workout.rating}
                                    </span>

                                </div>

                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default WorkoutCard;