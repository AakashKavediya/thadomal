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
export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('hero');

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
      <Header />
      <div className="pt-0"> {/* Add padding to account for fixed header */}
        {renderPage()}
      </div>
      
      {/* Navigation buttons for demo */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        <button 
          onClick={() => setCurrentPage('hero')}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          Hero
        </button>
        <button 
          onClick={() => setCurrentPage('search')}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Search
        </button>
        <button 
          onClick={() => setCurrentPage('suggestions')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Suggestions
        </button>
        <button 
          onClick={() => setCurrentPage('RecipeNutritionCalculator')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Main Page
        </button>
        
        <button 
          onClick={() => setCurrentPage('login')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  )
}

