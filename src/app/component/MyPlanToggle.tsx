"use client";

interface MyPlanToggleProps {
    activeTab: "today" | "saved";
    onChange: (tab: "today" | "saved") => void;
}

const MyPlanToggle = ({
    activeTab,
    onChange,
}: MyPlanToggleProps) => {
    return (
        <div className="flex gap-2 rounded-xl bg-white/5 p-1">

            <button
                type="button"
                onClick={() => onChange("today")}
                className={`rounded-lg px-5 py-2 font-semibold transition ${activeTab === "today"
                    ? "bg-black text-lime-400"
                    : "text-white hover:bg-white/10"
                    }`}
            >
                Today&apos;s Plan
            </button>

            <button
                type="button"
                onClick={() => onChange("saved")}
                className={`rounded-lg px-5 py-2 font-semibold transition ${activeTab === "saved"
                    ? "bg-black text-lime-400"
                    : "text-white hover:bg-white/10"
                    }`}
            >
                Saved
            </button>

        </div>
    );
};

export default MyPlanToggle;