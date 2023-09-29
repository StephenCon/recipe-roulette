import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import RecipeList from './components/RecipeList/RecipeList';
import MealDisplay from './components/MealDisplay/MealDisplay';
import RandomiserButton from './components/RandomiserButton/RandomiserButton';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';

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
    <div className="container">
      <NavigationBar />
      <hr className="hr" />
      <div className='container border rounded'>
        <MealDisplay meals={randomMeals} />
        <RandomiserButton recipes={recipes} onRandomize={handleRandomizedMeals} />        
      </div>
      <RecipeList 
          recipes={recipes} 
          onDeleteRecipe={handleDelete} 
          onEditRecipe={handleEdit} 
          onAddRecipe={handleAddRecipe}  // Passing the onAddRecipe prop
      />
      <hr className="hr" />      
      <Footer />
    </div>
  );
};

export default App;
