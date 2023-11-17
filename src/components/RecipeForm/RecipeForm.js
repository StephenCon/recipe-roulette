import React, { useState, useEffect } from 'react';

// RecipeForm functional component with a prop 'onAddRecipe'
const RecipeForm = ({ onAddRecipe }) => {
    // State variables for recipeName, mealType, and token
    const [recipeName, setRecipeName] = useState('');
    const [mealType, setMealType] = useState('');
    const [token, setToken] = useState('');

    // useEffect hook to fetch token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior

        // Check if token exists
        if (!token) {
            console.error('Token is missing. Please log in.');
            return;
        }

        try {
            // Making a POST request to add a recipe
            const response = await fetch('http://localhost:3001/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    recipeName,
                    mealType,
                }),
            });

            // Handling response
            if (response.ok) {
                // Resetting form fields
                setRecipeName('');
                setMealType('');

                // Callback function if provided
                if (onAddRecipe) {
                    onAddRecipe();
                }
            } else {
                // Handling errors
                const errorMessage = await response.text();
                console.error('Error submitting recipe:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // JSX for rendering the form
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
