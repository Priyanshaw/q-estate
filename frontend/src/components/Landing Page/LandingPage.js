import React from "react";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/HeroSection";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header onPage="home" />
      <HeroSection/>
    </div>
  );
}

export default LandingPage;
