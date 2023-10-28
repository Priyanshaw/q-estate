import React from "react";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/HeroSection";
import FeaturedListings from "../FeaturedListings/FeaturedListings";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header onPage="home" />
      <HeroSection/>
      <FeaturedListings/>
    </div>
  );
}

export default LandingPage;
