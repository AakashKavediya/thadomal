"use client"
import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [isLoading, setIsLoading] = useState(false);
  
  const mainRef = useRef(null);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const modalRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then((res) => res.json())
        .then((data) => setCategories(data.meals || [])),
      fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then((res) => res.json())
        .then((data) => setCuisines(data.meals || []))
    ]).finally(() => setIsLoading(false));
  }, []);

  // Initial page animations
  useEffect(() => {
    const pageTl = gsap.timeline();
    
    // Animate stars in background
    gsap.set('.star', {
      opacity: 0,
      scale: 0
    });
    
    gsap.to('.star', {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      stagger: 0.05,
      ease: 'elastic.out(1, 0.8)'
    });
    
    // Animate title with floating effect
    pageTl.fromTo(titleRef.current,
      { y: -100, opacity: 0, rotation: -5 },
      { 
        y: 0, 
        opacity: 1, 
        rotation: 0, 
        duration: 1.2, 
        ease: 'elastic.out(1, 0.8)',
        onComplete: () => {
          // Add continuous subtle floating animation
          gsap.to(titleRef.current, {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      }
    );
    
    // Animate search form elements with staggered entrance
    pageTl.fromTo(searchRef.current?.children,
      { y: 80, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: 'back.out(1.7)' 
      },
      '-=0.8'
    );
    
    // Animate search button with bounce effect
    pageTl.fromTo(buttonRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'elastic.out(1, 0.8)' 
      },
      '-=0.5'
    );

    // Setup scroll animations for future elements
    const setupScrollAnimations = () => {
      gsap.utils.toArray('.recipe-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, scale: 0.8, rotation: -5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              markers: false
            }
          }
        );
      });
    };

    // Setup interactive animations
    const setupInteractiveAnimations = () => {
      // Search form hover effects
      const inputs = document.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, { 
            scale: 1.02, 
            boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)',
            duration: 0.3, 
            ease: 'power2.out' 
          });
        });
        input.addEventListener('blur', () => {
          gsap.to(input, { 
            scale: 1, 
            boxShadow: 'none',
            duration: 0.3, 
            ease: 'power2.out' 
          });
        });
      });

      // Button hover effects
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, { 
            scale: 1.05, 
            duration: 0.2, 
            ease: 'power2.out' 
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, { 
            scale: 1, 
            duration: 0.2, 
            ease: 'power2.out' 
          });
        });
      });
      
      // Recipe card hover effects
      const cards = document.querySelectorAll('.recipe-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    };

    // Setup animations after initial render
    setTimeout(() => {
      setupScrollAnimations();
      setupInteractiveAnimations();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [recipes]); // Re-run when recipes change

  const handleSearch = async () => {
    // Animate search button with feedback
    const buttonTl = gsap.timeline();
    buttonTl.to(buttonRef.current, { 
      scale: 0.95, 
      duration: 0.1,
      ease: 'power2.in'
    });
    buttonTl.to(buttonRef.current, { 
      scale: 1, 
      duration: 0.3, 
      ease: 'elastic.out(1, 0.8)' 
    });
    
    setIsLoading(true);
    
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    let results = data.meals || [];

    if (category) {
      const resCat = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const dataCat = await resCat.json();
      const catMeals = dataCat.meals?.map((m) => m.idMeal) || [];
      results = results.filter((r) => catMeals.includes(r.idMeal));
    }

    if (cuisine) {
      const resArea = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
      );
      const dataArea = await resArea.json();
      const areaMeals = dataArea.meals?.map((m) => m.idMeal) || [];
      results = results.filter((r) => areaMeals.includes(r.idMeal));
    }

    setRecipes(results);
    
    // Animate results appearance after a short delay
    setTimeout(() => {
      setIsLoading(false);
      if (results.length > 0) {
        gsap.utils.toArray('.recipe-card').forEach((card, i) => {
          gsap.fromTo(card,
            { y: 100, opacity: 0, scale: 0.8 },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1, 
              delay: i * 0.1,
              duration: 0.6, 
              ease: 'back.out(1.7)' 
            }
          );
        });
      }
    }, 300);
  };

  const openRecipe = async (id) => {
    // Animate card click
    const card = document.getElementById(`card-${id}`);
    if (card) {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
    
    setIsLoading(true);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    setSelectedRecipe(data.meals[0]);
    setActiveTab("ingredients");
    setIsLoading(false);
    
    // Animate modal appearance
    setTimeout(() => {
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Animate tab content
            gsap.fromTo('.tab-content',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4 }
            );
          }
        }
      );
    }, 100);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setSelectedRecipe(null)
    });
  };

  const switchTab = (tab) => {
    // Animate tab switch
    gsap.to('.tab-content', {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(tab);
        gsap.to('.tab-content', {
          opacity: 1,
          y: 0,
          duration: 0.3
        });
      }
    });
  };

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push({ ing, measure });
      }
    }
    return ingredients;
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 relative overflow-hidden">
      {/* Animated stars in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="star absolute rounded-full bg-purple-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          ></div>
        ))}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="star absolute rounded-full bg-indigo-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        <h1 ref={titleRef} className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-10 py-2">
          Culinary Explorer
        </h1>

        <div ref={searchRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-gray-700 text-white"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.strCategory} value={c.strCategory}>
                {c.strCategory}
              </option>
            ))}
          </select>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-gray-700 text-white"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((c) => (
              <option key={c.strArea} value={c.strArea}>
                {c.strArea}
              </option>
            ))}
          </select>
          <button
            ref={buttonRef}
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? "Searching..." : "Search Recipes"}
          </button>
        </div>

        {isLoading && recipes.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400 text-lg">Finding delicious recipes...</div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍳</div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">No recipes found</h2>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div ref={resultsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {recipes.map((r) => (
              <div
                id={`card-${r.idMeal}`}
                key={r.idMeal}
                className="recipe-card bg-gray-800 rounded-2xl shadow-md hover:shadow-xl cursor-pointer overflow-hidden transition-all duration-300 transform border border-gray-700"
                onClick={() => openRecipe(r.idMeal)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={r.strMealThumb}
                    alt={r.strMeal}
                    className="w-full h-48 object-cover transform hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full h-full opacity-0 hover:opacity-100 transition duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h2 className="text-lg font-bold mb-1">{r.strMeal}</h2>
                      <p className="text-sm font-medium">
                        {r.strArea} • {r.strCategory}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-white mb-1 truncate">
                    {r.strMeal}
                  </h2>
                  <p className="text-sm text-gray-300 font-medium">
                    {r.strArea} • {r.strCategory}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
            <div ref={modalRef} className="bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-700">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-gray-700 rounded-full p-2 shadow hover:bg-gray-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative h-60 overflow-hidden">
                <img
                  src={selectedRecipe.strMealThumb}
                  alt={selectedRecipe.strMeal}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                  <h2 className="text-2xl font-bold mb-1">{selectedRecipe.strMeal}</h2>
                  <p className="text-sm font-medium">
                    {selectedRecipe.strArea} • {selectedRecipe.strCategory}
                  </p>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow">
                <div className="flex border-b border-gray-700 mb-4">
                  <button
                    onClick={() => switchTab("ingredients")}
                    className={`px-4 py-2 font-semibold ${
                      activeTab === "ingredients"
                        ? "border-b-2 border-purple-500 text-purple-400"
                        : "text-gray-400 hover:text-purple-400"
                    }`}
                  >
                    Ingredients
                  </button>
                  <button
                    onClick={() => switchTab("instructions")}
                    className={`px-4 py-2 font-semibold ${
                      activeTab === "instructions"
                        ? "border-b-2 border-purple-500 text-purple-400"
                        : "text-gray-400 hover:text-purple-400"
                    }`}
                  >
                    Instructions
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === "ingredients" ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getIngredients(selectedRecipe).map((item, idx) => (
                        <li key={idx} className="bg-gray-700 rounded-lg p-3 flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          <span className="font-medium text-white">{item.ing}</span>
                          <span className="ml-auto text-gray-400 text-sm">{item.measure}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="prose max-w-none">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {selectedRecipe.strInstructions}
                      </p>
                    </div>
                  )}
                </div>

                {(selectedRecipe.strSource || selectedRecipe.strYoutube) && (
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <a
                      href={selectedRecipe.strSource || selectedRecipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 font-semibold hover:text-purple-300 transition"
                    >
                      View Full Recipe
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}