"use client";

import Image from "next/image";
import Link from "next/link";
import type { IWorkout } from "../WorkoutType";

interface MyPlanCardProps {
    workout: IWorkout;
    onRemove: (id: IWorkout["id"]) => void;
    onDone: (id: IWorkout["id"]) => void;
}

const MyPlanCard = ({
    workout,
    onRemove,
    onDone,
}: MyPlanCardProps) => {
    return (
        <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#191c22] p-4 md:flex-row md:items-center md:justify-between">

            {/* Left Side */}
            <div className="flex min-w-0 items-center gap-4">

                {/* Image */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Information */}
                <div className="min-w-0">

                    <h3 className="text-lg font-semibold">
                        {workout.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        {workout.equipment}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">

                        <span className="text-gray-400">
                            ◷ {workout.duration} min
                        </span>

                        <span className="text-gray-400">
                            ♨ {workout.caloriesBurned} kcal
                        </span>

                        <span className="text-gray-400">
                            ☆ {workout.rating}
                        </span>

                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex shrink-0 items-center gap-2">

                {/* View Details */}
                <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full border border-white px-4 py-2 text-sm transition hover:bg-white hover:text-black"
                >
                    View Details
                </Link>

                {/* Mark as Done */}
                <button
                    type="button"
                    onClick={() => onDone(workout.id)}
                    className="rounded-full bg-lime-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-lime-300"
                >
                    ✓ Mark as Done
                </button>

                {/* Remove */}
                <button
                    type="button"
                    onClick={() => onRemove(workout.id)}
                    className="px-2 text-xl text-gray-400 transition hover:text-red-400"
                    title="Remove from plan"
                >
                    ×
                </button>

            </div>
        </div>
    );
};

export default MyPlanCard;