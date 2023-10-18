// Importing necessary CSS and Bootstrap styles
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing React and necessary hooks
import React, { useState } from 'react';

// Importing custom components
import RecipeList from '../components/RecipeList/RecipeList';
import MealDisplay from '../components/MealDisplay/MealDisplay';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';

// Main App component
const Dashboard = () => {
    // State to store the list of recipes
    const [recipes, setRecipes] = useState([]);

    // State to store the randomized meals (breakfast, lunch, dinner)
    const [randomMeals, setRandomMeals] = useState({ breakfast: null, lunch: null, dinner: null });

    // Handler to add a new recipe to the recipes list
    const handleAddRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
    };

    // Handler to delete a recipe from the recipes list
    const handleDelete = (index) => {
        const updatedRecipes = [...recipes];
        updatedRecipes.splice(index, 1);
        setRecipes(updatedRecipes);
    };

    // Handler to edit an existing recipe in the recipes list
    const handleEdit = (index, updatedRecipe) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[index] = updatedRecipe;
        setRecipes(updatedRecipes);
    };

    // Handler to update the state with randomized meals
    const handleRandomizedMeals = (randomizedMeals) => {
        setRandomMeals(randomizedMeals);
    };

    // Rendering the main App component
    return (
        <div className="container">
            <NavigationBar />
            <hr className="hr" />
            <div className='container shadow rounded'>
                {/* Passing recipes and onRandomize to MealDisplay */}
                <MealDisplay meals={randomMeals} recipes={recipes} onRandomize={handleRandomizedMeals} />
            </div>
            <div className='container shadow rounded'>
                <RecipeList
                    recipes={recipes}
                    onDeleteRecipe={handleDelete}
                    onEditRecipe={handleEdit}
                    onAddRecipe={handleAddRecipe}
                />
            </div>
            <Footer />
        </div>
    );
};

// Exporting the App component for use in other parts of the application
export default Dashboard;