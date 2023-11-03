import express from "express";
import bodyParser from "body-parser";
import {
  createRecipe,
  createIngredient,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getIngredientsForRecipe,
  addIngredientToRecipe,
  deleteIngredientFromRecipe,
} from './bd';

const app = express();

app.use(bodyParser.json());



// Definimos las rutas
app.post('/createIngredient', createIngredient);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);
app.delete('/recipes/:id', deleteRecipe);
app.get('/recipes/:id/ingredients', getIngredientsForRecipe);
app.post('/recipes/:id/ingredients', addIngredientToRecipe);
app.delete('/recipes/:id/ingredients/:ingredientId', deleteIngredientFromRecipe);


app.post('/recipes/', async (req, res)=>{
  const { name, ingredients, instructions, image, rate } = req.body;
  const result =  await createRecipe(
    name,
    ingredients,
    instructions,
    image,
    rate
  );
  return res.send(result.values)


});

app.put('/recipes/:id', updateRecipe);


// Iniciamos el servidor
app.listen(3000, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});
