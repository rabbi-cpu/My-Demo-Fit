import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import type { IWorkout } from "../../WorkoutType";
import PlanButtons from "@/src/app/component/PlanButtons";

const WorkoutDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const filePath = path.join(
        process.cwd(),
        "public",
        "Workout.json"
    );

    const file = await fs.readFile(filePath, "utf-8");

    const workouts: IWorkout[] = JSON.parse(file);

    const workout = workouts.find(
        (item) => String(item.id) === id
    );

    if (!workout) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0d12] text-white">
                <h1 className="mb-5 text-3xl font-bold">
                    Workout Not Found
                </h1>

                <Link
                    href="/"
                    className="rounded-xl bg-lime-400 px-5 py-3 font-bold text-black"
                >
                    ← Back to Workouts
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0b0d12] px-4 py-10 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Back */}
                <Link
                    href="/"
                    className="mb-8 inline-block text-gray-400 transition hover:text-lime-400"
                >
                    ← Back to Library
                </Link>

                {/* Main Content */}
                <div className="grid gap-8 overflow-hidden rounded-3xl border border-gray-800 bg-[#15171e] p-6 md:grid-cols-2 md:p-8">

                    {/* LEFT - IMAGE */}
                    <div className="h-full min-h-[600px]">
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-full min-h-[600px] w-full rounded-2xl border border-gray-800 object-cover shadow-2xl"
                        />
                    </div>

                    {/* RIGHT - DETAILS */}
                    <div className="flex flex-col">

                        {/* Title */}
                        <h1 className="text-4xl font-bold">
                            {workout.name}
                        </h1>

                        {/* Description */}
                        <p className="mt-5 leading-7 text-gray-400">
                            {workout.description}
                        </p>

                        {/* Muscle Groups */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-lime-400 px-4 py-1.5 text-sm font-bold text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="mt-6 rounded-2xl border border-gray-700 bg-[#0f1117] p-4">

                            {/* Equipment */}
                            <div className="flex items-center justify-between rounded-xl bg-[#181b23] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Equipment
                                </p>

                                <p className="text-sm font-semibold text-white">
                                    {workout.equipment}
                                </p>
                            </div>

                            <div className="my-2 border-t border-white/10" />

                            {/* Difficulty */}
                            <div className="flex items-center justify-between rounded-xl bg-[#181b23] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Difficulty
                                </p>

                                <p className="text-sm font-semibold text-white">
                                    {workout.difficulty}
                                </p>
                            </div>

                            <div className="my-2 border-t border-white/10" />

                            {/* Sets */}
                            <div className="flex items-center justify-between rounded-xl bg-[#181b23] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Sets
                                </p>

                                <p className="text-sm font-semibold text-white">
                                    {workout.sets}
                                </p>
                            </div>

                            <div className="my-2 border-t border-white/10" />

                            {/* Rep Range */}
                            <div className="flex items-center justify-between rounded-xl bg-[#181b23] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Rep Range
                                </p>

                                <p className="text-sm font-semibold text-white">
                                    {workout.reps}
                                </p>
                            </div>

                            <div className="my-2 border-t border-white/10" />

                            {/* Duration */}
                            <div className="flex items-center justify-between rounded-xl bg-[#181b23] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Duration
                                </p>

                                <p className="text-sm font-semibold text-white">
                                    {workout.duration} min
                                </p>
                            </div>

                            <div className="my-2 border-t border-white/10" />

                            {/* Calories */}
                            <div className="flex items-center justify-between rounded-xl bg-[#181b23] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Calories
                                </p>

                                <p className="text-sm font-semibold text-white">
                                    {workout.caloriesBurned} kcal
                                </p>
                            </div>

                            <div className="my-2 border-t border-white/10" />

                            {/* Rating */}
                            <div className="flex items-center justify-between rounded-xl bg-[#181b23] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Rating
                                </p>

                                <p className="text-sm font-bold text-lime-400">
                                    ★ {workout.rating}
                                </p>
                            </div>

                        </div>

                        {/* Instructions */}
                        <div className="mt-6 rounded-2xl border border-gray-800 bg-[#101218] p-5">

                            <h2 className="text-2xl font-bold">
                                Instructions
                            </h2>

                            <div className="mt-5 space-y-3">

                                {workout.instructions.map(
                                    (instruction, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-4 rounded-xl border border-gray-800 bg-[#181b23] p-4"
                                        >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-400 font-bold text-black">
                                                {index + 1}
                                            </span>

                                            <p className="leading-6 text-gray-400">
                                                {instruction}
                                            </p>
                                        </div>
                                    )
                                )}

                            </div>
                        </div>

                        {/* Buttons */}
                        <PlanButtons workout={workout} />

                    </div>
                </div>

            </div>
        </main>
    );
};

export default WorkoutDetails;