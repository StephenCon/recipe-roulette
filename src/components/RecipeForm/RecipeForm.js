import React, { useState } from 'react';
import './RecipeForm.css';

const RecipeForm = ({ onAddRecipe }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [mealType, setMealType] = useState(''); // e.g., 'Breakfast', 'Lunch', 'Dinner'

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new recipe object
        const newRecipe = {
            name: recipeName,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()), // Convert comma-separated string to array
            instructions,
            mealType,
        };

        // Pass the new recipe to a parent component or save it to state
        onAddRecipe(newRecipe);

        // Clear the form fields
        setRecipeName('');
        setIngredients('');
        setInstructions('');
        setMealType('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Recipe Name:</label>
                <input
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Ingredients (comma-separated):</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    
                />
            </div>
            <div>
                <label>Instructions:</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    
                />
            </div>
            <div>
                <label>Meal Type:</label>
                <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
                    <option value="">Select a meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="All">All</option> {/* Added "All" option */}
                </select>
            </div>
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;
