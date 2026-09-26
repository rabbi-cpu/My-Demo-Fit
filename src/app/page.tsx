import Banner from "./component/Banner";
import Navber from "./component/Navber";
import WorkoutCard from "./component/WorkoutCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0d12]">
      <Navber />
      <main>
        <Banner />
        <WorkoutCard />
      </main>
    </div>
  );
}