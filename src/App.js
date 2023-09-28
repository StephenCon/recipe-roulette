import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import RecipeForm from './components/RecipeForm/RecipeForm';
import RecipeList from './components/RecipeList/RecipeList';
import MealDisplay from './components/MealDisplay/MealDisplay';
import RandomiserButton from './components/RandomiserButton/RandomiserButton';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';

const App = () => {
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

  return (
    <div className="container">
      {/* Navigation Bar  */}
      <NavigationBar />
      <div className='container'>
        {/* Display the randomized meals */}
        <MealDisplay meals={randomMeals} />
        {/* Button to trigger the randomization of meals */}
        <RandomiserButton recipes={recipes} onRandomize={handleRandomizedMeals} />
      </div>
      {/* Recipe form to add a new recipe */}
      <RecipeForm onAddRecipe={handleAddRecipe} />
      {/* List display of all recipes with options to edit or delete */}
      <RecipeList recipes={recipes} onDeleteRecipe={handleDelete} onEditRecipe={handleEdit} />
      <Footer />
    </div>
  );
};

export default App;
