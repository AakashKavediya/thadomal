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
  
  const mainRef = useRef(null);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals || []));

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => res.json())
      .then((data) => setCuisines(data.meals || []));
  }, []);

  // Initial page animations
  useEffect(() => {
    const pageTl = gsap.timeline();
    
    // Animate title
    pageTl.fromTo('h1',
      { y: -50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );
    
    // Animate search form
    pageTl.fromTo(searchRef.current?.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
    
    // Animate search button
    pageTl.fromTo('.search-button',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.8)' },
      '-=0.3'
    );

    // Setup scroll animations
    const setupScrollAnimations = () => {
      gsap.fromTo('.recipe-card',
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.recipe-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    };

    // Setup interactive animations
    const setupInteractiveAnimations = () => {
      // Search form hover effects
      const inputs = document.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, { 
            scale: 1.02, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        });
        input.addEventListener('blur', () => {
          gsap.to(input, { 
            scale: 1, 
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
    };

    setupScrollAnimations();
    setupInteractiveAnimations();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSearch = async () => {
    // Animate search button
    gsap.to('.search-button', { 
      scale: 0.95, 
      duration: 0.1, 
      yoyo: true, 
      repeat: 1 
    });

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
    
    // Animate results appearance
    setTimeout(() => {
      gsap.fromTo('.recipe-card',
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }, 100);
  };

  const openRecipe = async (id) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    setSelectedRecipe(data.meals[0]);
    setActiveTab("ingredients");
    
    // Animate modal appearance
    setTimeout(() => {
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }, 100);
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
    <div ref={mainRef} className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Advanced Recipe Search
        </h1>

        <div ref={searchRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((c) => (
              <option key={c.strArea} value={c.strArea}>
                {c.strArea}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            onClick={handleSearch}
            className="search-button px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        <div ref={resultsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {recipes.map((r) => (
            <div
              key={r.idMeal}
              className="recipe-card bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition"
              onClick={() => openRecipe(r.idMeal)}
            >
              <img
                src={r.strMealThumb}
                alt={r.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {r.strMeal}
                </h2>
                <p className="text-sm text-gray-700 font-medium">
                  {r.strArea} • {r.strCategory}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedRecipe.strMeal}
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                {selectedRecipe.strArea} • {selectedRecipe.strCategory}
              </p>
              <img
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
                className="w-full rounded-lg mb-4"
              />

              <div className="flex border-b mb-4">
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === "ingredients"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-700"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("instructions")}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === "instructions"
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-700"
                  }`}
                >
                  Instructions
                </button>
              </div>

              {activeTab === "ingredients" ? (
                <ul className="list-disc pl-5 space-y-1 text-gray-800 font-medium">
                  {getIngredients(selectedRecipe).map((item, idx) => (
                    <li key={idx}>
                      {item.ing} — <span className="text-gray-600">{item.measure}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800 leading-relaxed whitespace-pre-line font-medium">
                  {selectedRecipe.strInstructions}
                </p>
              )}

              <a
                href={selectedRecipe.strSource || selectedRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-indigo-600 font-semibold hover:underline"
              >
                View Full Recipe
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}