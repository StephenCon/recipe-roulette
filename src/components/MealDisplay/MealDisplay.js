import React from 'react';
import './MealDisplay.css';

const MealDisplay = ({ meals }) => {
    return (
        <div className="meal-display">
            <h2>Today's Meals</h2>
            <div className="meal-section">
                <h3>Breakfast</h3>
                {meals.breakfast ? (
                    <div>
                        <strong>{meals.breakfast.name}</strong>
                        <p>Ingredients: {meals.breakfast.ingredients.join(', ')}</p>
                        <p>Instructions: {meals.breakfast.instructions}</p>
                    </div>
                ) : (
                    <p>No breakfast recipe selected.</p>
                )}
            </div>

            <div className="meal-section">
                <h3>Lunch</h3>
                {meals.lunch ? (
                    <div>
                        <strong>{meals.lunch.name}</strong>
                        <p>Ingredients: {meals.lunch.ingredients.join(', ')}</p>
                        <p>Instructions: {meals.lunch.instructions}</p>
                    </div>
                ) : (
                    <p>No lunch recipe selected.</p>
                )}
            </div>

            <div className="meal-section">
                <h3>Dinner</h3>
                {meals.dinner ? (
                    <div>
                        <strong>{meals.dinner.name}</strong>
                        <p>Ingredients: {meals.dinner.ingredients.join(', ')}</p>
                        <p>Instructions: {meals.dinner.instructions}</p>
                    </div>
                ) : (
                    <p>No dinner recipe selected.</p>
                )}
            </div>
        </div>
    );
};

export default MealDisplay;
