import Carousel from "../../components/ImageCarousel/ImageCarousel";
import { Profile } from "./Profile/Profile";

const bruh:string[] = ["bunnyL.png", "bunnyL.png", "bunnyL.png"];

export function Home() {
  return (
    <div className="home">
      <Profile />
      <Carousel images={bruh} />
    </div>
  )
}
