import React from 'react';

const Testimonials = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">What Our Users Are Saying</h2>
            <div className="row">
                <div className="col-md-4 text-center">
                    <h5>John Doe</h5>
                    <p>"This app is amazing! I've found so many great recipes."</p>
                </div>
                <div className="col-md-4 text-center">
                    <h5>Jane Smith</h5>
                    <p>"I love how easy it is to use. Highly recommended!"</p>
                </div>
                <div className="col-md-4 text-center">
                    <h5>Emily Johnson</h5>
                    <p>"A game-changer for meal planning. Thank you!"</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
