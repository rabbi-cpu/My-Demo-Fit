"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import type { IWorkout } from "../WorkoutType";
import SaveToList from "./SaveToList";

interface MyPlanCardProps {
    workout: IWorkout;
    onRemove: (id: IWorkout["id"]) => void;
    onDone: (id: IWorkout["id"]) => void;
    isSaved?: boolean;
}
const MyPlanCard = ({
    workout,
    onRemove,
    onDone,
    isSaved = false,
}: MyPlanCardProps) => {
    return (
        <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#191c22] p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                    />
                </div>
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
            <div className="flex flex-wrap items-center gap-2">
                <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-xl border border-white px-4 py-2 text-sm transition hover:bg-white hover:text-black"
                >
                    View Details
                </Link>
                {isSaved ? (
                    <button
                        type="button"
                        onClick={() =>
                            onRemove(workout.id)
                        }
                        className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-red-400 hover:text-red-400"
                        title="Remove from saved"
                    >
                        <FaTrash size={13} />
                        Remove
                    </button>
                ) : (
                    <>
                        <SaveToList workout={workout} />
                        <button
                            type="button"
                            onClick={() =>
                                onDone(workout.id)
                            }
                            className="rounded-xl bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
                        >
                            ✓ Mark as Done
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                onRemove(workout.id)
                            }
                            className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-red-400 hover:text-red-400"
                            title="Remove from plan"
                        >
                            <FaTrash size={13} />
                            Remove
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
export default MyPlanCard;