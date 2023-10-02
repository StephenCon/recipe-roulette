import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; // Assuming Button and Modal are from react-bootstrap
import RecipeForm from '../RecipeForm/RecipeForm'; // Assuming RecipeForm is located here
import './RecipeList.css';

const MealDisplay = ({ meals, recipes, onRandomize, onEditRecipe, onDeleteRecipe, onAddRecipe }) => {
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = (newRecipe) => {
        onAddRecipe(newRecipe);
        setShowModal(false);
    };

    return (
        <div className="recipe-list bg-white container mt-5 p-4 rounded">
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col">
                    <h2>Recipes</h2>
                </div>
                <div className="col-auto">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        <span className="font-weight-bold">+</span>
                    </Button>
                </div>
            </div>
            <hr className="hr" />

            {recipes.length === 0 ? (
                <p>No recipes added yet.</p>
            ) : (
                <div className="row">
                    {recipes.map((recipe, index) => (
                        <div key={recipe.id} className="col-md-3 mb-4"> {/* Assuming each recipe has a unique id */}
                            <div className="recipe-card p-3 border rounded">
                                <h3 className="mb-2">{recipe.name}</h3>
                                <p><strong>Meal Type:</strong> {recipe.mealType}</p>
                                <Button variant="outline-secondary" onClick={() => onEditRecipe(index)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => onDeleteRecipe(index)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipeForm onAddRecipe={handleFormSubmit} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MealDisplay;
