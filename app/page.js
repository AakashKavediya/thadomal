"use client"
import React, { useState, useEffect } from "react";
import App from "./CustomComponents/searchFood";
import RecipeSuggestion from "./CustomComponents/resipieSuggestion";
import Header from "./CustomComponents/header";
import HeroSection from "./CustomComponents/heroSection";
import MainPageTwo from "./CustomComponents/mainPageTwo";

export default function HomePage() {
  return(
    <div>
        <div>
          <HeroSection />
          {/* <MainPageTwo /> */}
        </div>
    </div>
  )
}

