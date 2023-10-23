import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import RecipeForm from '../RecipeForm/RecipeForm';
import './RecipeList.css';

const RecipeList = ({ meals, onRandomize, onEditRecipe, onDeleteRecipe }) => {
    const [showModal, setShowModal] = useState(false);
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const token = localStorage.getItem('token');  // Assume the token is stored in local storage
        try {
            const response = await fetch('/recipes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRecipes(data);
            } else {
                console.error('Failed to fetch recipes:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);  // Empty dependency array means this useEffect runs once, similar to componentDidMount

    const handleFormSubmit = async (newRecipe) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newRecipe)
            });
            if (response.ok) {
                const addedRecipe = await response.json();
                setRecipes(prevRecipes => [...prevRecipes, addedRecipe]);
                setShowModal(false);
            } else {
                console.error('Failed to add recipe:', await response.text());
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
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

export default RecipeList;
