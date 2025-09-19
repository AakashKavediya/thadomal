"use client"
import React, { useState, useEffect } from "react";
import App from "./CustomComponents/searchFood";
import RecipeSuggestion from "./CustomComponents/resipieSuggestion";
import Header from "./CustomComponents/header";
import HeroSection from "./CustomComponents/heroSection";
import MainPageTwo from "./CustomComponents/mainPageTwo";
import HomeComponent from "./mainComponents/Home";
import RecipeNutritionCalculator from "./NewPage/page";
import CulinaryMagicAuth from "./login/login";
import Loader from "./components/Loader";
export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'hero':
        return <HomeComponent />;
      case 'search':
        return <App />;
      case 'suggestions':
        return <RecipeSuggestion />;
      case 'RecipeNutritionCalculator':
        return <RecipeNutritionCalculator />;
      case 'login':
        return <CulinaryMagicAuth />;
      default:
        return <HomeComponent />;
    }
  };

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return(
    <div>
      {isLoading && <Loader />}
      <Header onNavigate={setCurrentPage} active={currentPage} />
      <div className="pt-1 md:pt-10"> {/* Space for fixed header */}
        {renderPage()}
      </div>
      
      {/* Navigation buttons for demo */}
     
    </div>
  )
}

