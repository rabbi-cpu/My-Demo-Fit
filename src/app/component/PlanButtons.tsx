"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import type { IWorkout } from "../WorkoutType";
interface PlanButtonsProps {
    workout: IWorkout;
}
const PlanButtons = ({ workout }: PlanButtonsProps) => {
    const [added, setAdded] = useState(false);
    const [saved, setSaved] = useState(false);
    const handleAddToPlan = () => {
        const savedPlan: IWorkout[] = JSON.parse(
            localStorage.getItem("my-plan") || "[]"
        );
        const alreadyExists = savedPlan.some(
            (item) => item.id === workout.id
        );
        if (alreadyExists) {
            setAdded(true);
            toast.warning("Already added to today's plan");
            return;
        }
        if (savedPlan.length >= 5) {
            toast.warning(
                "You can add only 5 workouts to your plan."
            );
            return;
        }
        const updatedPlan = [
            ...savedPlan,
            workout,
        ];
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
        toast.success(
            "Workout added to today's plan"
        );
    };
    const handleSaveToList = () => {
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
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
                type="button"
                onClick={handleAddToPlan}
                className="flex-1 rounded-xl bg-lime-400 px-5 py-3 font-bold text-black transition hover:bg-lime-300"
            >
                {added
                    ? "✓ Added to Plan"
                    : "+ Add to Today's Plan"}
            </button>
            <button
                type="button"
                onClick={handleSaveToList}
                className="flex-1 rounded-xl border border-gray-700 px-5 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
            >
                {saved
                    ? "✓ Saved to List"
                    : "♡ Save to List"}
            </button>
        </div>
    );
};

export default PlanButtons;