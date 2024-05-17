import Carousel from "../../components/ImageCarousel";
import { Profile } from "./Profile/Profile";

const bruh:string[] = ["bunnyL.jpg", "bunnyL.jpg", "bunnyL.jpg"];
export function Home() {
  return (
    <div className="home">

      <Profile />

      <Carousel images={bruh} />

    </div>
  )
}
