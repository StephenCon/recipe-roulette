import React from 'react';

const Features = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Features</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <i className="fas fa-utensils fa-3x mb-3"></i>
                            <h5 className="card-title">Wide Variety</h5>
                            <p className="card-text">Choose from a wide variety of recipes to suit your taste.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <i className="fas fa-clock fa-3x mb-3"></i>
                            <h5 className="card-title">Quick Recipes</h5>
                            <p className="card-text">Get quick and easy recipes for those busy weekdays.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <i className="fas fa-heart fa-3x mb-3"></i>
                            <h5 className="card-title">Healthy Options</h5>
                            <p className="card-text">Find recipes that are both delicious and good for you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
