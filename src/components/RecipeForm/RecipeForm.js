import React, { useState, useEffect } from 'react';

const RecipeForm = ({ onAddRecipe }) => {
    const [recipeName, setRecipeName] = useState('');
    const [mealType, setMealType] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        // Fetch the token from localStorage on component mount
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            console.error('Token is missing. Please log in.');
            return;
        }

        try {
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

            if (response.ok) {
                setRecipeName('');
                setMealType('');

                if (onAddRecipe) {
                    onAddRecipe();
                }
            } else {
                const errorMessage = await response.text();
                console.error('Error submitting recipe:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
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
