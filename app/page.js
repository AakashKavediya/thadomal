"use client"
import React, { useState, useEffect } from "react";
import App from "./CustomComponents/searchFood";
import RecipeSuggestion from "./CustomComponents/resipieSuggestion";
import Header from "./CustomComponents/header";
import HeroSection from "./CustomComponents/heroSection";
import MainPageTwo from "./CustomComponents/mainPageTwo";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('hero');

  const renderPage = () => {
    switch(currentPage) {
      case 'search':
        return <App />;
      case 'suggestions':
        return <RecipeSuggestion />;
      case 'main':
        return <MainPageTwo />;
      default:
        return <HeroSection />;
    }
  };

  return(
    <div>
      <Header />
      <div className="pt-20"> {/* Add padding to account for fixed header */}
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
          onClick={() => setCurrentPage('main')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Main Page
        </button>
      </div>
    </div>
  )
}

