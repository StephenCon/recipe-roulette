import React from 'react';

// MealDisplay is a stateless functional component that displays meals for the day.
// It expects a `meals` prop which contains objects for breakfast, lunch, and dinner.
const MealDisplay = ({ meals }) => {
    return (
        <div className="meal-display container mt-5">
            {/* Title Section */}
            <h2 className="text-center mb-4">Today's Meals</h2>
            <div className="row">

                {/* Breakfast Section */}
                <div className="col-md-4 meal-section">
                    <h3>Breakfast</h3>
                    {/* Check if there's a breakfast meal, if so display its details, otherwise show a default message */}
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

                {/* Lunch Section */}
                <div className="col-md-4 meal-section">
                    <h3>Lunch</h3>
                    {/* Check if there's a lunch meal, if so display its details, otherwise show a default message */}
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

                {/* Dinner Section */}
                <div className="col-md-4 meal-section">
                    <h3>Dinner</h3>
                    {/* Check if there's a dinner meal, if so display its details, otherwise show a default message */}
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
        </div>
    );
};

// Export the component to be used in other parts of the application.
export default MealDisplay;
