import React, { useState } from 'react';

const RecipeForm = ({ onAddRecipe }) => {
    const [recipeName, setRecipeName] = useState('');
    const [mealType, setMealType] = useState('');

    const handleSubmit = (e) => {
        
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
