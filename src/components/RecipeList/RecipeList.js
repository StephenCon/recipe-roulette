import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes, onDeleteRecipe, onEditRecipe }) => {
    return (
        <div className="recipe-list">
            {/* Title and Add Button */}
            <div className="row align-items-center mb-4">
                <div className="col">
                    <h2>Recipes</h2>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary">
                        <span className="font-weight-bold">+</span>
                    </button>
                </div>
            </div>

            {/* Recipe List */}
            {recipes.length === 0 ? (
                <p>No recipes added yet.</p>
            ) : (
                <ul>
                    {recipes.map((recipe, index) => (
                        <li key={index}>
                            <h3>{recipe.name}</h3>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Meal Type:</strong> {recipe.mealType}</p>
                            <button onClick={() => onEditRecipe(index)}>Edit</button>
                            <button onClick={() => onDeleteRecipe(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecipeList;
