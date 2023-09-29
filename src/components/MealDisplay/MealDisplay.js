import React from 'react';
import RandomiserButton from '../RandomiserButton/RandomiserButton'; // Importing RandomiserButton
import './MealDisplay.css';

const MealDisplay = ({ meals, recipes, onRandomize }) => {
    return (
        <div className="meal-display container p-4 rounded">
            {/* Title and RandomiserButton on the same row */}
            <div className="d-flex justify-content-between align-items-center">
                <h2>Today's Meals</h2>
                {/* Adding RandomiserButton here */}
                <RandomiserButton recipes={recipes} onRandomize={onRandomize} />
            </div>
            <hr className="hr" />
            <div className="row">
                {/* Breakfast Section */}
                <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h3 className="card-title">Breakfast</h3>
                            {meals.breakfast ? (
                                <div>
                                    <strong>{meals.breakfast.name}</strong>
                                </div>
                            ) : (
                                <p className="card-text">No breakfast recipe selected.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lunch Section */}
                <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h3 className="card-title">Lunch</h3>
                            {meals.lunch ? (
                                <div>
                                    <strong>{meals.lunch.name}</strong>
                                </div>
                            ) : (
                                <p className="card-text">No lunch recipe selected.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Dinner Section */}
                <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h3 className="card-title">Dinner</h3>
                            {meals.dinner ? (
                                <div>
                                    <strong>{meals.dinner.name}</strong>
                                </div>
                            ) : (
                                <p className="card-text">No dinner recipe selected.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDisplay;
