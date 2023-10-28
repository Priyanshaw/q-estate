import React from "react";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/HeroSection";
import FeaturedListings from "../FeaturedListings/FeaturedListings";
import './LandingPage.css'; 

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header onPage="home" />
      <HeroSection/>
      <div className="card-container">
        <h1 className="featured-listings-title">Here are some of our featured listings:</h1>

        <FeaturedListings/>
      </div>
    </div>
  );
}

export default LandingPage;
