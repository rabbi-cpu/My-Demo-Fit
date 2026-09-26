import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import type { IWorkout } from "../../WorkoutType";
import PlanButtons from "@/src/app/component/PlanButtons";
import Navber from "@/src/app/component/Navber";

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
    const file = await fs.readFile(
        filePath,
        "utf-8"
    );
    const workouts: IWorkout[] =
        JSON.parse(file);
    const workout = workouts.find(
        (item) => String(item.id) === id
    );
    if (!workout) {
        return (
            <div className="flex min-h-screen flex-col bg-[#0b0d12] text-white">
                <Navber />
                <main className="flex flex-1 flex-col items-center justify-center px-4">
                    <h1 className="mb-5 text-center text-3xl font-bold">
                        Workout Not Found
                    </h1>
                    <Link
                        href="/"
                        className="rounded-xl bg-lime-400 px-5 py-3 font-bold text-black"
                    >
                        ← Back to Workouts
                    </Link>
                </main>
            </div>
        );
    }
    return (
        <div className="flex min-h-screen flex-col bg-[#0b0d12] text-white">
            <Navber />
            <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 overflow-hidden rounded-3xl border border-gray-800 bg-[#15171e] p-4 sm:p-6 md:grid-cols-2 md:p-8">
                        <div className="relative h-full min-h-100 md:min-h-150">
                            <Image
                                src={workout.image}
                                alt={workout.name}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="rounded-2xl border border-gray-800 object-cover shadow-2xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold sm:text-4xl">
                                {workout.name}
                            </h1>
                            <p className="mt-5 leading-7 text-gray-400">
                                {workout.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {workout.muscleGroups.map(
                                    (muscle) => (
                                        <span
                                            key={muscle}
                                            className="rounded-full bg-lime-400 px-4 py-1.5 text-sm font-bold text-black"
                                        >
                                            {muscle}
                                        </span>
                                    )
                                )}
                            </div>
                            <div className="mt-6 rounded-2xl border border-gray-700 bg-[#0f1117] p-3 sm:p-4">
                                <div className="flex flex-col gap-1 rounded-xl bg-[#181b23] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Equipment
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        {workout.equipment}
                                    </p>
                                </div>
                                <div className="my-2 border-t border-white/10" />
                                <div className="flex flex-col gap-1 rounded-xl bg-[#181b23] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Difficulty
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        {workout.difficulty}
                                    </p>
                                </div>
                                <div className="my-2 border-t border-white/10" />
                                <div className="flex flex-col gap-1 rounded-xl bg-[#181b23] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Sets
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        {workout.sets}
                                    </p>
                                </div>
                                <div className="my-2 border-t border-white/10" />
                                <div className="flex flex-col gap-1 rounded-xl bg-[#181b23] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Rep Range
                                    </p>
                                <p className="text-sm font-semibold text-white">
                                        {workout.reps}
                                    </p>
                                </div>
                                <div className="my-2 border-t border-white/10" />
                                <div className="flex flex-col gap-1 rounded-xl bg-[#181b23] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Duration
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        {workout.duration} min
                                    </p>
                                </div>
                                <div className="my-2 border-t border-white/10" />
                                <div className="flex flex-col gap-1 rounded-xl bg-[#181b23] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Calories
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        {workout.caloriesBurned} kcal
                                    </p>
                                </div>
                                <div className="my-2 border-t border-white/10" />
                                <div className="flex flex-col gap-1 rounded-xl bg-[#181b23] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Rating
                                    </p>
                                    <p className="text-sm font-bold text-lime-400">
                                        ★ {workout.rating}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 rounded-2xl border border-gray-800 bg-[#101218] p-4 sm:p-5">
                                <h2 className="text-2xl font-bold">
                                    Instructions
                                </h2>
                                <div className="mt-5 space-y-3">
                                    {workout.instructions.map(
                                        (
                                            instruction,
                                            index
                                        ) => (
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
                            <PlanButtons
                                workout={workout}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WorkoutDetails;