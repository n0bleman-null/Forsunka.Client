// import { useState, useEffect } from "react";

import { LandingNavigation } from "./../../components/navigationLanding";
import { Header } from "./../../components/header";
import { Features } from "./../../components/features";
import { About } from "../../components/about";
import { Services } from "./../../components/services";
import { Gallery } from "./../../components/gallery";
import { Testimonials } from "./../../components/testimonials";
import SmoothScroll from "smooth-scroll";
import "./Home.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
  offset: function (anchor, toggle) {
    return 80;
  },
});

const Home = () => {
  return (
    <>
      <LandingNavigation />
      <Header />
      <Features />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
    </>
  );
};

export default Home;
