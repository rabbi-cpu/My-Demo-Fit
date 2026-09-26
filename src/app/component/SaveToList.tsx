"use client";

import { useState } from "react";
import type { IWorkout } from "../WorkoutType";

interface SaveToListProps {
    workout: IWorkout;
}

const SaveToList = ({ workout }: SaveToListProps) => {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        const existing = localStorage.getItem("savedWorkouts");

        const savedWorkouts: IWorkout[] = existing
            ? JSON.parse(existing)
            : [];

        const alreadySaved = savedWorkouts.some(
            (item) => item.id === workout.id
        );

        if (alreadySaved) {
            setSaved(true);
            return;
        }

        const updatedWorkouts = [...savedWorkouts, workout];

        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(updatedWorkouts)
        );

        setSaved(true);
    };

    return (
        <button
            type="button"
            onClick={handleSave}
            className="rounded-xl border border-white/20 px-5 py-3 font-semibold transition hover:border-lime-400 hover:text-lime-400"
        >
            {saved ? "✓ Saved to List" : "+ Save to List"}
        </button>
    );
};

export default SaveToList;