"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Sample recipe database with instructions and images
const sampleRecipes = [
  {
    id: 1,
    name: "Pasta Primavera",
    ingredients: ["pasta", "tomato", "bell pepper", "basil", "garlic"],
    instructions: "1. Boil pasta until al dente.\n2. Saute vegetables in olive oil.\n3. Mix together with your favorite sauce.\n4. Garnish with fresh basil and serve hot.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cookingTime: "25 min",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Chicken Curry",
    ingredients: ["chicken", "onion", "garlic", "ginger", "coconut milk", "curry spices"],
    instructions: "1. Saute onions, garlic and ginger until fragrant.\n2. Add chicken and brown on all sides.\n3. Add spices and cook for 2 minutes.\n4. Pour in coconut milk and simmer until chicken is tender.\n5. Serve with rice or naan bread.",
    image: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cookingTime: "40 min",
    difficulty: "Medium"
  },
  {
    id: 3,
    name: "Veggie Stir Fry",
    ingredients: ["broccoli", "carrot", "soy sauce", "bell pepper", "tofu", "ginger"],
    instructions: "1. Chop all vegetables into uniform pieces.\n2. Heat oil in a wok or large pan.\n3. Stir fry vegetables starting with the hardest ones first.\n4. Add tofu and sauce, cook for another 2 minutes.\n5. Serve immediately with rice or noodles.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cookingTime: "20 min",
    difficulty: "Easy"
  },
  {
    id: 4,
    name: "Classic Omelette",
    ingredients: ["egg", "cheese", "milk", "butter", "herbs"],
    instructions: "1. Beat eggs with milk and seasonings.\n2. Melt butter in a non-stick pan.\n3. Pour egg mixture and cook over medium heat.\n4. Add cheese and fillings when eggs begin to set.\n5. Fold and serve immediately.",
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cookingTime: "10 min",
    difficulty: "Easy"
  },
  {
    id: 5,
    name: "Quinoa Salad",
    ingredients: ["quinoa", "tomato", "cucumber", "red onion", "lemon juice", "olive oil"],
    instructions: "1. Cook quinoa according to package instructions.\n2. Chop all vegetables.\n3. Mix together with dressing.\n4. Chill for at least 30 minutes before serving.\n5. Garnish with fresh herbs.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cookingTime: "25 min",
    difficulty: "Easy"
  },
  {
    id: 6,
    name: "Beef Tacos",
    ingredients: ["beef", "taco seasoning", "tortillas", "lettuce", "tomato", "cheese"],
    instructions: "1. Brown ground beef in a skillet.\n2. Add taco seasoning and water, simmer.\n3. Warm tortillas according to package instructions.\n4. Assemble tacos with beef and toppings.\n5. Serve with lime wedges and hot sauce.",
    image: "https://images.unsplash.com/photo-1565299585323-38174c739b6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cookingTime: "20 min",
    difficulty: "Easy"
  },
];

export default function RecipeSuggestion() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const ingredientListRef = useRef(null);
  const suggestionsRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
    
    // Animate input area
    gsap.fromTo(inputRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
    );
    
    // Continuous animation for floating elements
    gsap.to(".floating-element", {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  // Animate ingredients list when updated
  useEffect(() => {
    if (ingredientListRef.current) {
      gsap.fromTo(ingredientListRef.current.children, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1 }
      );
    }
  }, [ingredients]);

  // Animate suggestions when updated
  useEffect(() => {
    if (suggestionsRef.current && suggestions.length > 0) {
      gsap.fromTo(suggestionsRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
      );
    }
  }, [suggestions]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedRecipe) {
        setSelectedRecipe(null);
      }
    };

    if (selectedRecipe) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedRecipe]);

  const addIngredient = () => {
    const trimmedInput = ingredientInput.trim();
    const lowerInput = trimmedInput.toLowerCase();
    
    // Clear any previous errors
    setInputError("");
    
    if (!trimmedInput) {
      setInputError("Please enter an ingredient");
      return;
    }
    
    if (trimmedInput.length > 50) {
      setInputError("Ingredient name is too long (max 50 characters)");
      return;
    }
    
    if (ingredients.includes(lowerInput)) {
      setInputError("This ingredient is already added");
      return;
    }
    
    // Valid input - add the ingredient
    setIngredients([...ingredients, lowerInput]);
    setIngredientInput("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIngredientInput(value);
    
    // Clear error when user starts typing
    if (inputError) {
      setInputError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIngredient();
  };

  const generateSuggestions = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const matched = sampleRecipes
        .map((recipe) => ({
          ...recipe,
          matchCount: recipe.ingredients.filter((i) =>
            ingredients.includes(i)
          ).length,
          matchPercentage: Math.round(
            (recipe.ingredients.filter((i) => ingredients.includes(i)).length / 
            recipe.ingredients.length) * 100
          )
        }))
        .filter(recipe => recipe.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 6);
      
      setSuggestions(matched);
      setIsLoading(false);
      
      // Scroll to suggestions
      if (matched.length > 0) {
        setTimeout(() => {
          suggestionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }, 1000);
  };

  const removeIngredient = (ing) => {
    gsap.to(`#ingredient-${ing.replace(/\s+/g, '-')}`, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIngredients(ingredients.filter((i) => i !== ing));
      }
    });
  };

  const clearAllIngredients = () => {
    if (ingredients.length === 0) return;
    
    const ingredientsToRemove = [...ingredients];
    ingredients.forEach(ing => {
      gsap.to(`#ingredient-${ing.replace(/\s+/g, '-')}`, {
        scale: 0,
        opacity: 0,
        duration: 0.3
      });
    });
    
    setTimeout(() => {
      setIngredients([]);
      setSuggestions([]);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Decorative elements */}
      <div className="floating-element absolute top-20 right-20 w-6 h-6 bg-orange-500 rounded-full opacity-60"></div>
      <div className="floating-element absolute bottom-40 left-16 w-8 h-8 bg-orange-400 rounded-full opacity-40"></div>
      <div className="absolute top-1/3 left-20 w-4 h-4 bg-orange-300 rounded-full opacity-30"></div>
      
      <div className="max-w-6xl mx-auto">
        <h1 ref={titleRef} className="text-5xl md:text-6xl font-extrabold text-center mb-8 pt-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          🍳 Recipe Wizard
        </h1>
        <p className="text-center text-orange-200 mb-12 max-w-2xl mx-auto">
          Enter ingredients you have, and we'll suggest delicious recipes you can make!
        </p>

        <div ref={inputRef} className="max-w-3xl mx-auto mb-8 p-6 bg-gray-800 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                ref={inputRef}
                value={ingredientInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter an ingredient (e.g., chicken, tomato, pasta)"
                className={`flex-1 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 border text-gray-900 placeholder-gray-500 ${
                  inputError 
                    ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                    : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                }`}
                aria-label="Enter ingredient name"
                aria-describedby={inputError ? "input-error" : undefined}
                autoComplete="off"
                autoFocus
                maxLength={50}
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-md"
                aria-label="Add ingredient to list"
              >
                Add
              </button>
            </div>
            {inputError && (
              <div id="input-error" className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <span>⚠</span>
                <span>{inputError}</span>
              </div>
            )}
          </form>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-orange-200">Your Ingredients</h2>
              {ingredients.length > 0 && (
                <button 
                  onClick={clearAllIngredients}
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div ref={ingredientListRef} className="flex flex-wrap gap-3">
              {ingredients.length === 0 ? (
                <p className="text-gray-400 text-sm italic py-2">No ingredients added yet. Add some ingredients above to get started!</p>
              ) : (
                ingredients.map((ing) => (
                  <div
                    id={`ingredient-${ing.replace(/\s+/g, '-')}`}
                    key={ing}
                    className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md"
                    role="listitem"
                  >
                    <span className="font-medium capitalize">{ing}</span>
                    <button
                      onClick={() => removeIngredient(ing)}
                      className="text-white hover:text-gray-200 font-bold text-lg leading-none focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-full w-5 h-5 flex items-center justify-center"
                      aria-label={`Remove ${ing} from ingredients`}
                      title={`Remove ${ing}`}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={generateSuggestions}
            disabled={ingredients.length === 0 || isLoading}
            className={`w-full py-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center ${
              ingredients.length === 0 || isLoading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 focus:ring-orange-500 hover:shadow-lg'
            }`}
            aria-label="Generate recipe suggestions based on selected ingredients"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding delicious recipes...
              </>
            ) : ingredients.length === 0 ? (
              'Add ingredients to get suggestions'
            ) : (
              `Find Recipes (${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''})`
            )}
          </button>
        </div>

        <div ref={suggestionsRef} className="mt-12">
          {suggestions.length > 0 && (
            <h2 className="text-3xl font-bold text-center mb-8 text-orange-200">
              Recommended Recipes
              <div className="h-1 w-24 bg-orange-500 rounded-full mx-auto mt-2"></div>
            </h2>
          )}
          
          <AnimatePresence>
            {suggestions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="bg-gray-800 p-4 rounded-2xl shadow-lg cursor-pointer border border-gray-700 hover:border-orange-500 transition-all duration-200 overflow-hidden group"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedRecipe(recipe);
                      }
                    }}
                    aria-label={`View recipe for ${recipe.name}`}
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={recipe.image}
                        alt={`Delicious ${recipe.name}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {recipe.matchPercentage}% match
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                        <h3 className="font-bold text-white text-lg">{recipe.name}</h3>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-orange-400 text-sm font-medium">{recipe.cookingTime}</span>
                      <span className="text-gray-400 text-sm capitalize">{recipe.difficulty}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm line-clamp-2">
                        <span className="font-medium text-orange-200">Matching ingredients: </span>
                        {recipe.ingredients.filter(i => ingredients.includes(i)).join(", ")}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-orange-300 text-xs">Click for details →</span>
                      <span className="text-gray-400 text-xs">
                        {recipe.matchCount}/{recipe.ingredients.length} ingredients
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedRecipe(null);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-title"
          >
            <motion.div
              className="bg-gray-900 max-w-4xl w-full rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] shadow-2xl border border-orange-500"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                aria-label="Close recipe modal"
                title="Close"
              >
                ✕
              </button>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/5">
                  <img
                    src={selectedRecipe.image}
                    alt={`Delicious ${selectedRecipe.name}`}
                    className="w-full rounded-xl mb-4 shadow-lg"
                    loading="lazy"
                  />
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 p-3 rounded-xl text-center">
                      <div className="text-orange-400 font-semibold">Prep Time</div>
                      <div className="text-white">{selectedRecipe.cookingTime}</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-xl text-center">
                      <div className="text-orange-400 font-semibold">Difficulty</div>
                      <div className="text-white capitalize">{selectedRecipe.difficulty}</div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-3/5">
                  <h2 id="recipe-title" className="text-3xl font-bold text-white mb-4 pr-8">
                    {selectedRecipe.name}
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-orange-400 mb-3 flex items-center gap-2">
                      <span className="text-orange-500">🥘</span>
                      Ingredients
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedRecipe.ingredients.map((i, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-center p-2 rounded-lg ${ingredients.includes(i) ? 'bg-orange-900 text-white' : 'bg-gray-800 text-gray-300'}`}
                        >
                          <span className={`w-2 h-2 rounded-full mr-2 ${ingredients.includes(i) ? 'bg-orange-500' : 'bg-gray-600'}`}></span>
                          <span className="capitalize">{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-3 flex items-center gap-2">
                      <span className="text-orange-500">👨‍🍳</span>
                      Instructions
                    </h3>
                    <div className="bg-gray-800 p-4 rounded-xl">
                      <p className="whitespace-pre-line text-gray-200 leading-relaxed">
                        {selectedRecipe.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}