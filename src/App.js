import React, { useState } from 'react';
import RecipeForm from '../src/components/RecipeForm/RecipeForm';
import RecipeList from './components/RecipeList/RecipeList';

const App = () => {
  const [recipes, setRecipes] = useState([]);

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
  

  return (
    <div className="app-container">
      <h1>Meal Mixer</h1>
      <RecipeForm onAddRecipe={handleAddRecipe} />
      <RecipeList recipes={recipes} onDeleteRecipe={handleDelete} onEditRecipe={handleEdit} />

    </div>
  );
};

export default App;
