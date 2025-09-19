"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample recipe database with instructions and images
const sampleRecipes = [
  {
    id: 1,
    name: "Pasta Primavera",
    ingredients: ["pasta", "tomato", "bell pepper"],
    instructions:
      "Boil pasta. Saute vegetables. Mix together with sauce. Serve hot.",
    image: "https://www.themealdb.com/images/media/meals/xxxyyy.jpg",
  },
  {
    id: 2,
    name: "Chicken Curry",
    ingredients: ["chicken", "onion", "garlic"],
    instructions:
      "Saute onions and garlic. Add chicken and spices. Cook until tender.",
    image: "https://www.themealdb.com/images/media/meals/abcxyz.jpg",
  },
  {
    id: 3,
    name: "Veggie Stir Fry",
    ingredients: ["broccoli", "carrot", "soy sauce"],
    instructions:
      "Chop vegetables. Stir fry in wok. Add soy sauce. Serve immediately.",
    image: "https://www.themealdb.com/images/media/meals/stirfry.jpg",
  },
  {
    id: 4,
    name: "Omelette",
    ingredients: ["egg", "cheese", "milk"],
    instructions:
      "Beat eggs with milk. Cook in pan. Add cheese. Fold and serve.",
    image: "https://www.themealdb.com/images/media/meals/omelette.jpg",
  },
  {
    id: 5,
    name: "Quinoa Salad",
    ingredients: ["quinoa", "tomato", "cucumber"],
    instructions:
      "Cook quinoa. Chop vegetables. Mix together with dressing. Serve cold.",
    image: "https://www.themealdb.com/images/media/meals/quinoa.jpg",
  },
];

export default function RecipeSuggestion() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [inputError, setInputError] = useState("");

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedRecipe) {
        setSelectedRecipe(null);
      }
    };

    if (selectedRecipe) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
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
    const matched = sampleRecipes
      .map((recipe) => ({
        ...recipe,
        matchCount: recipe.ingredients.filter((i) =>
          ingredients.includes(i)
        ).length,
      }))
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 5);
    setSuggestions(matched);
  };

  const removeIngredient = (ing) =>
    setIngredients(ingredients.filter((i) => i !== ing));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-900">
        🤖 AI Recipe Assistant
      </h1>

      <div className="max-w-3xl mx-auto mb-6">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              id="ingredient-input"
              value={ingredientInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter an ingredient (press Enter or click Add)"
              className={`flex-1 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 border text-gray-900 placeholder-gray-500 ${
                inputError 
                  ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                  : 'border-gray-300 focus:ring-indigo-500'
              }`}
              aria-label="Enter ingredient name"
              aria-describedby={inputError ? "input-error" : undefined}
              autoComplete="off"
              autoFocus
              maxLength={50}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Add ingredient to list"
            >
              Add
            </button>
          </div>
          {inputError && (
            <div id="input-error" className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span>
              <span>{inputError}</span>
            </div>
          )}
        </form>

        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Selected ingredients">
          {ingredients.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No ingredients added yet. Add some ingredients above to get started!</p>
          ) : (
            ingredients.map((ing) => (
              <motion.div
                key={ing}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-indigo-200 text-indigo-900 px-3 py-2 rounded-full flex items-center gap-2 shadow-sm"
                role="listitem"
              >
                <span className="font-medium">{ing}</span>
                <button
                  onClick={() => removeIngredient(ing)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg leading-none focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full w-5 h-5 flex items-center justify-center"
                  aria-label={`Remove ${ing} from ingredients`}
                  title={`Remove ${ing}`}
                >
                  ×
                </button>
              </motion.div>
            ))
          )}
        </div>

        <button
          onClick={generateSuggestions}
          disabled={ingredients.length === 0}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            ingredients.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 hover:shadow-lg'
          }`}
          aria-label="Generate recipe suggestions based on selected ingredients"
        >
          {ingredients.length === 0 
            ? 'Add ingredients to get suggestions' 
            : `Get Recipe Suggestions (${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''})`
          }
        </button>
      </div>

      <AnimatePresence>
        <div className="max-w-4xl mx-auto mt-8 space-y-4">
          {suggestions.length === 0 && ingredients.length > 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No recipes found matching your ingredients.</p>
              <p className="text-gray-400 text-sm mt-2">Try adding more ingredients or different ones!</p>
            </div>
          ) : (
            suggestions.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                onClick={() => setSelectedRecipe(recipe)}
                className="p-6 rounded-xl shadow-lg bg-white border-l-4 border-green-500 cursor-pointer hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
                <h3 className="font-bold text-xl text-gray-900 mb-2">{recipe.name}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <span className="font-medium">Ingredients:</span> {recipe.ingredients.join(", ")}
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {recipe.matchCount} match{recipe.matchCount !== 1 ? 'es' : ''}
                  </span>
                  <span className="text-gray-400 text-xs">Click to view recipe</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </AnimatePresence>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
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
              className="bg-white max-w-2xl w-full rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close recipe modal"
                title="Close"
              >
                ✕
              </button>
              <h2 id="recipe-title" className="text-3xl font-bold text-gray-900 mb-6 pr-8">
                {selectedRecipe.name}
              </h2>
              <img
                src={selectedRecipe.image}
                alt={`Delicious ${selectedRecipe.name}`}
                className="w-full rounded-xl mb-6 shadow-lg"
                loading="lazy"
              />
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-green-600">🥘</span>
                    Ingredients
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 font-medium">
                    {selectedRecipe.ingredients.map((i, idx) => (
                      <li key={idx} className="capitalize">{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-green-600">👨‍🍳</span>
                    Instructions
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {selectedRecipe.instructions}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}