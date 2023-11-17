/**
 * @fileoverview This file defines a React component named 'HowItWorks' which
 * displays a three-step process in a stylized format. It is structured with 
 * Bootstrap classes for layout and styling.
 */

import React from 'react';

/**
 * HowItWorks functional component.
 * This component renders a section explaining the three-step process of 
 * signing up, selecting recipes, and enjoying a meal.
 * 
 * @returns {React.Component} The 'HowItWorks' component.
 */
const HowItWorks = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">How It Works</h2>
            <div className="row">
                {/* Step 1: Sign Up */}
                <div className="col-md-4 text-center">
                    <div className="mb-3">
                        <span className="badge bg-primary p-3 text-white" style={{ fontSize: '2rem' }}>1</span>
                    </div>
                    <h5>Sign Up</h5>
                    <p>Create a free account to get started.</p>
                </div>

                {/* Step 2: Select Recipes */}
                <div className="col-md-4 text-center">
                    <div className="mb-3">
                        <span className="badge bg-primary p-3 text-white" style={{ fontSize: '2rem' }}>2</span>
                    </div>
                    <h5>Select Recipes</h5>
                    <p>Browse and select your favorite recipes.</p>
                </div>

                {/* Step 3: Enjoy Your Meal */}
                <div className="col-md-4 text-center">
                    <div className="mb-3">
                        <span className="badge bg-primary p-3 text-white" style={{ fontSize: '2rem' }}>3</span>
                    </div>
                    <h5>Enjoy Your Meal</h5>
                    <p>Follow the instructions and enjoy your meal!</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
