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
import AuthWrapper from '../components/AuthWrapper/AuthWrapper';

/**
 * Main Dashboard component.
 * @return {React.Component} - The rendered Dashboard component.
 */
const Dashboard = () => {
    // State to store the list of recipes
    const [recipes, setRecipes] = useState([]);

    // State to store the randomized meals (breakfast, lunch, dinner)
    const [randomMeals, setRandomMeals] = useState({ breakfast: null, lunch: null, dinner: null });

    /**
     * Adds a new recipe to the recipes list.
     * @param {Object} newRecipe - The recipe to be added.
     */
    const handleAddRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
    };

    /**
     * Deletes a recipe from the recipes list.
     * @param {number} index - The index of the recipe to be deleted.
     */
    const handleDelete = (index) => {
        const updatedRecipes = [...recipes];
        updatedRecipes.splice(index, 1);
        setRecipes(updatedRecipes);
    };

    /**
     * Edits an existing recipe in the recipes list.
     * @param {number} index - The index of the recipe to be edited.
     * @param {Object} updatedRecipe - The updated recipe data.
     */
    const handleEdit = (index, updatedRecipe) => {
        const updatedRecipes = [...recipes];
        updatedRecipes[index] = updatedRecipe;
        setRecipes(updatedRecipes);
    };

    /**
     * Updates the state with randomized meals.
     * @param {Object} randomizedMeals - The randomized meals.
     */
    const handleRandomizedMeals = (randomizedMeals) => {
        setRandomMeals(randomizedMeals);
    };

    // Rendering the main Dashboard component
    return (
        <AuthWrapper>
            <div className="container">
                <NavigationBar />
                <hr className="hr" />
                <div className='container shadow rounded'>
                    {/* Displaying randomized meals */}
                    <MealDisplay meals={randomMeals} recipes={recipes} onRandomize={handleRandomizedMeals} />
                </div>
                <div className='container shadow rounded'>
                    {/* Displaying and managing the recipe list */}
                    <RecipeList
                        recipes={recipes}
                        onDeleteRecipe={handleDelete}
                        onEditRecipe={handleEdit}
                        onAddRecipe={handleAddRecipe}
                    />
                </div>
                <Footer />
            </div>
        </AuthWrapper>
    );
};

// Exporting the Dashboard component for use in other parts of the application
export default Dashboard;
