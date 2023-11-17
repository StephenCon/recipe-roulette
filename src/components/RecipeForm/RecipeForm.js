import React, { useState, useEffect } from 'react';

/**
 * RecipeForm functional component for adding new recipes.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.onAddRecipe - Callback function to execute after adding a recipe.
 */
const RecipeForm = ({ onAddRecipe }) => {
    // State variables for the recipe name, meal type, and authentication token.
    const [recipeName, setRecipeName] = useState('');
    const [mealType, setMealType] = useState('');
    const [token, setToken] = useState('');

    /**
     * Effect hook to fetch the token from localStorage upon component mount.
     */
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    /**
     * Handles form submission to add a new recipe.
     * 
     * @param {Event} e - The event object from form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Early return if token is missing.
        if (!token) {
            console.error('Token is missing. Please log in.');
            return;
        }

        try {
            // POST request to add a new recipe.
            const response = await fetch('http://localhost:3001/recipes', {
                // Request configuration...
            });

            // Handle response...
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // JSX for rendering the form.
    return (
        <form onSubmit={handleSubmit} className="container bg-white rounded p-4">
            <div className="mb-3">
                <label className="form-label">Recipe Name:</label>
                <input
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Meal Type:</label>
                <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    required
                    className="form-select"
                >
                    <option value="">Select a meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="All">All</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;
