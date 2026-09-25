import Banner from "./component/Banner";
import MyPlanCard from "./component/MyPlanCard";
import Navber from "./component/Navber";
import WorkoutCard from "./component/WorkoutCard";

export default function Home() {
  return (
    <>
      <Navber />
      <Banner />
      <WorkoutCard />
    </>
  );
}