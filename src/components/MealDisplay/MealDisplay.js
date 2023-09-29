import React from 'react';
import './MealDisplay.css';

const MealDisplay = ({ meals }) => {
    return (
        <div className="meal-display container mt-5">
            {/* Title Section */}
            <h2 className="text-center mb-4">Today's Meals</h2>
            <div className="row">

                {/* Breakfast Section */}
                <div className="col-md-4 mb-3">
                    <div className="card bg-light gradient-card">
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
                    <div className="card bg-light gradient-card">
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
                    <div className="card bg-light gradient-card">
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
