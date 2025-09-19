"use client"

import React, { useState } from 'react';

const RecipeNutritionCalculator = () => {
  const [servings, setServings] = useState(4);
  const [cookingTime, setCookingTime] = useState(30);

  // Sample nutritional data (would come from props in a real app)
  const nutritionData = {
    calories: 485,
    protein: 18,
    carbs: 62,
    fats: 18,
    vitamins: [
      { name: 'Vitamin A', value: 120 },
      { name: 'Vitamin C', value: 95 },
      { name: 'Vitamin D', value: 15 },
      { name: 'Vitamin E', value: 22 },
      { name: 'Vitamin K', value: 85 },
      { name: 'B-Complex', value: 65 }
    ],
    minerals: [
      { name: 'Iron', value: 25 },
      { name: 'Calcium', value: 30 },
      { name: 'Potassium', value: 28 },
      { name: 'Magnesium', value: 20 },
      { name: 'Zinc', value: 18 },
      { name: 'Selenium', value: 35 }
    ]
  };

  // Sample ingredients (would come from props in a real app)
  const ingredients = [
    { name: 'Quinoa', amount: 1, unit: 'cup' },
    { name: 'Vegetable Broth', amount: 2, unit: 'cups' },
    { name: 'Bell Peppers', amount: 2, unit: 'large' },
    { name: 'Black Beans', amount: 1, unit: 'can' },
    { name: 'Avocado', amount: 1, unit: 'large' },
    { name: 'Lime Juice', amount: 2, unit: 'tbsp' }
  ];

  // Handle serving size change
  const handleServingChange = (e) => {
    const newServings = parseInt(e.target.value);
    if (newServings > 0 && newServings <= 20) {
      setServings(newServings);
    }
  };

  // Calculate scaled ingredients
  const scaledIngredients = ingredients.map(ingredient => ({
    ...ingredient,
    scaledAmount: (ingredient.amount * (servings / 4)).toFixed(2)
  }));

  // Calculate adjusted cooking time (simplified)
  const adjustedTime = cookingTime * Math.pow(servings / 4, 0.3);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recipe Nutrition & Scaling</h1>
      
      <div style={styles.content}>
        {/* Nutritional Analysis Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Nutritional Analysis</h2>
          <p style={styles.description}>
            Detailed nutritional breakdown to support your health and wellness goals
          </p>
          
          <div style={styles.nutritionGrid}>
            <div style={styles.nutritionCard}>
              <h3 style={styles.cardTitle}>Calories & Macronutrients</h3>
              <div style={styles.nutritionItem}>
                <span>Calories</span>
                <span style={styles.value}>{nutritionData.calories} kcal</span>
              </div>
              <div style={styles.nutritionItem}>
                <span>Protein</span>
                <span style={styles.value}>{nutritionData.protein}g (30%)</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{...styles.progress, ...styles.protein, width: '30%'}}></div>
              </div>
              <div style={styles.nutritionItem}>
                <span>Carbohydrates</span>
                <span style={styles.value}>{nutritionData.carbs}g (50%)</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{...styles.progress, ...styles.carbs, width: '50%'}}></div>
              </div>
              <div style={styles.nutritionItem}>
                <span>Fats</span>
                <span style={styles.value}>{nutritionData.fats}g (20%)</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{...styles.progress, ...styles.fats, width: '20%'}}></div>
              </div>
            </div>
            
            <div style={styles.nutritionCard}>
              <h3 style={styles.cardTitle}>Vitamins</h3>
              <div style={styles.vitaminGrid}>
                {nutritionData.vitamins.map((vitamin, index) => (
                  <div key={index} style={styles.vitaminItem}>
                    <div>{vitamin.name}</div>
                    <div style={styles.vitaminValue}>{vitamin.value}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.nutritionCard}>
              <h3 style={styles.cardTitle}>Minerals</h3>
              <div style={styles.vitaminGrid}>
                {nutritionData.minerals.map((mineral, index) => (
                  <div key={index} style={styles.vitaminItem}>
                    <div>{mineral.name}</div>
                    <div style={styles.vitaminValue}>{mineral.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipe Scaling Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recipe Scaling Calculator</h2>
          <p style={styles.description}>
            Adjust serving sizes and get updated ingredient measurements
          </p>
          
          <div style={styles.scalingContainer}>
            <div style={styles.sliderContainer}>
              <label htmlFor="servings" style={styles.sliderLabel}>
                Number of Servings: <strong>{servings}</strong>
              </label>
              <input
                type="range"
                id="servings"
                min="1"
                max="20"
                value={servings}
                onChange={handleServingChange}
                style={styles.slider}
              />
            </div>
            
            <div style={styles.timeAdjustment}>
              <h3 style={styles.timeTitle}>Cooking Time Adjustment</h3>
              <p style={styles.timeText}>
                Original: {cookingTime} minutes → Adjusted: {adjustedTime.toFixed(0)} minutes
              </p>
              <p style={styles.timeNote}>
                Note: Cooking time may vary based on your equipment and ingredient quantities
              </p>
            </div>
            
            <div style={styles.ingredientsContainer}>
              <h3 style={styles.ingredientsTitle}>Scaled Ingredients</h3>
              <ul style={styles.ingredientsList}>
                {scaledIngredients.map((ingredient, index) => (
                  <li key={index} style={styles.ingredientItem}>
                    <span style={styles.ingredientAmount}>{ingredient.scaledAmount} {ingredient.unit}</span>
                    <span style={styles.ingredientName}>{ingredient.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Neon theme styles with black background
const styles = {
  container: {
    background: 'linear-gradient(135deg, #0b0b0f 0%, #111827 100%)',
    color: '#e5e7eb',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#c4b5fd',
    textShadow: '0 0 12px rgba(139,92,246,0.35), 0 0 24px rgba(99,102,241,0.25)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  section: {
    backgroundColor: '#1f2937',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 15px rgba(99,102,241,0.15)',
    border: '1px solid #374151',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#a78bfa',
    textShadow: '0 0 10px rgba(139,92,246,0.35)',
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '20px',
    color: '#9ca3af',
  },
  nutritionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  nutritionCard: {
    backgroundColor: '#111827',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(99,102,241,0.15)',
    border: '1px solid #374151',
  },
  cardTitle: {
    fontSize: '1.4rem',
    marginBottom: '15px',
    color: '#c4b5fd',
    textShadow: '0 0 8px rgba(139,92,246,0.35)',
  },
  nutritionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #374151',
  },
  value: {
    fontWeight: '600',
    color: '#93c5fd',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#374151',
    borderRadius: '4px',
    margin: '10px 0',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: '4px',
  },
  protein: {
    background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
    boxShadow: '0 0 6px rgba(139,92,246,0.5)',
  },
  carbs: {
    background: 'linear-gradient(90deg, #6366f1, #60a5fa)',
    boxShadow: '0 0 6px rgba(99,102,241,0.5)',
  },
  fats: {
    background: 'linear-gradient(90deg, #a78bfa, #8b5cf6)',
    boxShadow: '0 0 6px rgba(167,139,250,0.5)',
  },
  vitaminGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '12px',
  },
  vitaminItem: {
    backgroundColor: '#1f2937',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid #374151',
  },
  vitaminValue: {
    fontWeight: 'bold',
    color: '#93c5fd',
    fontSize: '1.1rem',
    marginTop: '5px',
  },
  scalingContainer: {
    marginTop: '20px',
  },
  sliderContainer: {
    marginBottom: '25px',
  },
  sliderLabel: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '1.2rem',
    color: '#e5e7eb',
  },
  slider: {
    width: '100%',
    maxWidth: '400px',
    height: '8px',
    borderRadius: '4px',
    background: '#374151',
    outline: 'none',
    WebkitAppearance: 'none',
  },
  timeAdjustment: {
    backgroundColor: '#111827',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '25px',
    border: '1px solid #374151',
  },
  timeTitle: {
    fontSize: '1.3rem',
    marginBottom: '10px',
    color: '#a78bfa',
  },
  timeText: {
    fontSize: '1.1rem',
    marginBottom: '10px',
    color: '#93c5fd',
  },
  timeNote: {
    fontSize: '0.9rem',
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  ingredientsContainer: {
    backgroundColor: '#111827',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #374151',
  },
  ingredientsTitle: {
    fontSize: '1.3rem',
    marginBottom: '15px',
    color: '#a78bfa',
  },
  ingredientsList: {
    listStyle: 'none',
    padding: 0,
  },
  ingredientItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px dashed #374151',
  },
  ingredientAmount: {
    fontWeight: '600',
    color: '#93c5fd',
  },
  ingredientName: {
    color: '#e5e7eb',
  },
};

export default RecipeNutritionCalculator;