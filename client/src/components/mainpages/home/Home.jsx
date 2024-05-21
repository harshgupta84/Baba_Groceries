import React, { useState, useEffect } from "react";
import { Header } from "./home_components/header";
import { About } from "./home_components/about";
import { Services } from "./home_components/services";
import { Testimonials } from "./home_components/testimonials";
import { Team } from "./home_components/Team";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./Home.css";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div >
    
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Testimonials data={landingPageData.Testimonials} />
      
    </div>
  );
};

export default Home;