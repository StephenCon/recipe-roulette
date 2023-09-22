import React from 'react';
import './RandomiserButton.css';

const RandomiserButton = ({ recipes, onRandomize }) => {
    const getRandomRecipe = (mealType) => {
        const applicableRecipes = recipes.filter(recipe =>
            recipe.mealType === mealType || recipe.mealType === 'All'
        );
        return applicableRecipes[Math.floor(Math.random() * applicableRecipes.length)];
    };

    const handleRandomize = () => {
        const randomizedMeals = {
            breakfast: getRandomRecipe('Breakfast'),
            lunch: getRandomRecipe('Lunch'),
            dinner: getRandomRecipe('Dinner'),
        };
        onRandomize(randomizedMeals);
    };

    return (
        <button className="randomizer-button" onClick={handleRandomize}>
            Randomize Meals
        </button>
    );
};

export default RandomiserButton;
