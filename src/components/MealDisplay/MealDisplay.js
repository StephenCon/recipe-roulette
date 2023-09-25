import React from 'react';

const MealDisplay = ({ meals }) => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Today's Meals</h2>
            
            <div className="mb-4">
                <h3 className="mb-3">Breakfast</h3>
                {meals.breakfast ? (
                    <div>
                        <strong className="d-block mb-2">{meals.breakfast.name}</strong>
                        <p><span className="fw-bold">Ingredients:</span> {meals.breakfast.ingredients.join(', ')}</p>
                        <p><span className="fw-bold">Instructions:</span> {meals.breakfast.instructions}</p>
                    </div>
                ) : (
                    <p>No breakfast recipe selected.</p>
                )}
            </div>

            <div className="mb-4">
                <h3 className="mb-3">Lunch</h3>
                {meals.lunch ? (
                    <div>
                        <strong className="d-block mb-2">{meals.lunch.name}</strong>
                        <p><span className="fw-bold">Ingredients:</span> {meals.lunch.ingredients.join(', ')}</p>
                        <p><span className="fw-bold">Instructions:</span> {meals.lunch.instructions}</p>
                    </div>
                ) : (
                    <p>No lunch recipe selected.</p>
                )}
            </div>

            <div className="mb-4">
                <h3 className="mb-3">Dinner</h3>
                {meals.dinner ? (
                    <div>
                        <strong className="d-block mb-2">{meals.dinner.name}</strong>
                        <p><span className="fw-bold">Ingredients:</span> {meals.dinner.ingredients.join(', ')}</p>
                        <p><span className="fw-bold">Instructions:</span> {meals.dinner.instructions}</p>
                    </div>
                ) : (
                    <p>No dinner recipe selected.</p>
                )}
            </div>
        </div>
    );
};

export default MealDisplay;
