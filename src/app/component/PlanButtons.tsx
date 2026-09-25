"use client";

import { useState } from "react";
import type { IWorkout } from "../WorkoutType";

interface PlanButtonsProps {
    workout: IWorkout;
}

const PlanButtons = ({ workout }: PlanButtonsProps) => {
    const [added, setAdded] = useState(false);

    const handleAddToPlan = () => {
        const savedPlan = JSON.parse(
            localStorage.getItem("my-plan") || "[]"
        ) as IWorkout[];

        const alreadyExists = savedPlan.some(
            (item) => item.id === workout.id
        );

        if (alreadyExists) {
            setAdded(true);
            return;
        }

        const updatedPlan = [...savedPlan, workout];

        localStorage.setItem(
            "my-plan",
            JSON.stringify(updatedPlan)
        );

        window.dispatchEvent(
            new CustomEvent("planUpdated", {
                detail: updatedPlan.length,
            })
        );

        setAdded(true);
    };

    return (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
                type="button"
                onClick={handleAddToPlan}
                className="flex-1 rounded-xl bg-lime-400 px-5 py-3 font-bold text-black transition hover:bg-lime-300"
            >
                {added ? "✓ Added to Plan" : "+ Add to Today's Plan"}
            </button>

            <button
                type="button"
                className="flex-1 rounded-xl border border-gray-700 px-5 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
            >
                ♡ Save to List
            </button>
        </div>
    );
};

export default PlanButtons;