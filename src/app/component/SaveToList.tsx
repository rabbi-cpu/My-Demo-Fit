"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import type { IWorkout } from "../WorkoutType";

interface SaveToListProps {
    workout: IWorkout;
}
const SaveToList = ({ workout }: SaveToListProps) => {
    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        const savedWorkouts: IWorkout[] = JSON.parse(
            localStorage.getItem("savedWorkouts") || "[]"
        );
        const alreadySaved = savedWorkouts.some(
            (item) => item.id === workout.id
        );
        if (alreadySaved) {
            setSaved(true);
            toast.warning("Already saved");
            return;
        }
        const updatedWorkouts = [
            ...savedWorkouts,
            workout,
        ];
        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(updatedWorkouts)
        );
        window.dispatchEvent(
            new CustomEvent("savedWorkoutsUpdated", {
                detail: updatedWorkouts.length,
            })
        );
        setSaved(true);
        toast.success("Added to saved");
    };
    return (
        <button
            type="button"
            onClick={handleSave}
            className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold transition hover:border-lime-400 hover:text-lime-400"
        >
            {saved
                ? "✓ Saved"
                : "+ Save to List"}
        </button>
    );
};

export default SaveToList;