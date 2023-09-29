import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import RecipeForm from '../RecipeForm/RecipeForm';
import './RecipeList.css';

const RecipeList = ({ recipes, onDeleteRecipe, onEditRecipe, onAddRecipe }) => {
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = (newRecipe) => {
        onAddRecipe(newRecipe);
        setShowModal(false); // Close the modal after adding the recipe
    };

    return (
        <div className="recipe-list">
            <div className="row align-items-center mb-4">
                <div className="col">
                    <h2>Recipes</h2>
                </div>
                <div className="col-auto">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        <span className="font-weight-bold">+</span>
                    </Button>
                </div>
            </div>

            {recipes.length === 0 ? (
                <p>No recipes added yet.</p>
            ) : (
                <ul>
                    {recipes.map((recipe, index) => (
                        <li key={index}>
                            <h3>{recipe.name}</h3>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Meal Type:</strong> {recipe.mealType}</p>
                            <button onClick={() => onEditRecipe(index)}>Edit</button>
                            <button onClick={() => onDeleteRecipe(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipeForm onAddRecipe={handleFormSubmit} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RecipeList;
