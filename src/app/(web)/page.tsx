import { getFeaturedRoom } from "@/libs/apis";
import Gallery from "../Gallery/Gallery";
import FeaturedRoom from "../components/FeaturedRoom/FeaturedRoom";
import HeroSection from "../components/HeroSection/HeroSection";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import PageSearch from "../components/PageSearch/PageSearch";



const Home = async () => {
  const featuredRoom = await getFeaturedRoom();
  
  
  return <>
  <HeroSection/>
  <PageSearch/>
  <FeaturedRoom featuredRoom={featuredRoom}/> 
  <Gallery/>
  <NewsLetter/>
  </>;
} 

export default Home;


