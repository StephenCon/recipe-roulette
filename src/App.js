import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import RecipeForm from './components/RecipeForm/RecipeForm';
import RecipeList from './components/RecipeList/RecipeList';
import MealDisplay from './components/MealDisplay/MealDisplay';
import RandomiserButton from './components/RandomiserButton/RandomiserButton';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [randomMeals, setRandomMeals] = useState({ breakfast: null, lunch: null, dinner: null });

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleDelete = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  const handleEdit = (index, updatedRecipe) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = updatedRecipe;
    setRecipes(updatedRecipes);
  };

  const handleRandomizedMeals = (randomizedMeals) => {
    setRandomMeals(randomizedMeals);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Meal Mixer</h1>
      <RecipeForm onAddRecipe={handleAddRecipe} />
      <RecipeList recipes={recipes} onDeleteRecipe={handleDelete} onEditRecipe={handleEdit} />
      <RandomiserButton recipes={recipes} onRandomize={handleRandomizedMeals} />
      <MealDisplay meals={randomMeals} />
    </div>
  );
};

export default App;
