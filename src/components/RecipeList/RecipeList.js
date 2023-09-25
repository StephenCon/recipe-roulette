import React from 'react';

const RecipeList = ({ recipes, onDeleteRecipe, onEditRecipe }) => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes added yet.</p>
            ) : (
                <ul className="list-group">
                    {recipes.map((recipe, index) => (
                        <li key={index} className="list-group-item mb-3">
                            <h3 className="mb-2">{recipe.name}</h3>
                            <p className="mb-1"><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                            <p className="mb-2"><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p className="mb-2"><strong>Meal Type:</strong> {recipe.mealType}</p>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => onEditRecipe(index)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => onDeleteRecipe(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecipeList;
