import React, { useState } from 'react';

const RecipeForm = ({ onAddRecipe }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [mealType, setMealType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecipe = {
            name: recipeName,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            instructions,
            mealType,
        };

        onAddRecipe(newRecipe);

        setRecipeName('');
        setIngredients('');
        setInstructions('');
        setMealType('');
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
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
                <label className="form-label">Ingredients (comma-separated):</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Instructions:</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Meal Type:</label>
                <select value={mealType} onChange={(e) => setMealType(e.target.value)} required className="form-select">
                    <option value="">Select a meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="All">All</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;
