import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'password',
  database: 'test'
})

const test_connect = async () => {

  connection.connect()

  const res = await connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()

  return res;
  
}

// Function to verify that all the required fields are filled in
async function verifyRecipeFields(recipe) {
  // Check if the name field is empty
  if (!recipe.name || recipe.name.length === 0) {
    throw new Error('The name field is required');
  }

  // Check if the intrucciones field is empty
  if (!recipe.instructions || recipe.instructions.length === 0) {
    throw new Error('The instructions field is required');
  }

  // If we reach this point, all the required fields are filled in
  return true;
}

// Function to create a recipe
async function createRecipe(name, ingredients, instructions, image, rate) {
  // Verify that all required fields are filled in.
  const isFieldsValid = await verifyRecipeFields({
    name,
    ingredients,
    instructions,
    image,
    rate
  });

// If all fields are valid, create the recipe
  if (isFieldsValid) {
    const query = `
    INSERT INTO recipes (name, ingredients, instructions, image, rate)
    VALUES (?, ?, ?, ?, ?)
  `;

    return await connection.query(query, [name, ingredients, instructions, image, rate], (err, rows, fields)=>{
      if (err) throw err
  
      return rows;
    })

 

  } else {
    return new Error('The recipe fields are not valid');
  }
}

// Function to create an ingredient
function createIngredient(recipeId, name, quantity) {
  const query = `
    INSERT INTO ingredients (recipe_id, name, quantity)
    VALUES (?, ?, ?)
  `;

  connection.query(query, [recipeId, name, quantity], (err, rows, fields)=>{
    return rows;
  });
}

// Function to obtain all recipes
function getAllRecipes(req, res) {
  const query = `
    SELECT * FROM recipes
  `;
  connection.query(query,(err, rows, fields)=>{
    return res.send(rows);
  });
 
}

// Function to obtain a recipe by its ID
function getRecipeById(req, res) {
  const {id} = req.params;
  const query = `
    SELECT * FROM recipes WHERE id = ?
  `;

  connection.query(query, [id],(err, rows, fields)=>{
    return res.send(rows);
  });
}

// Function for updating a recipe
async function updateRecipe(req, res) {
  const { name, ingredients, instructions, image, rate } = req.body;
  const { id } = req.params;
  const isFieldsValid = await verifyRecipeFields({
    name,
    ingredients,
    instructions,
    image,
    rate
  });

  if (isFieldsValid) {
    const query = `
      UPDATE recipes
      SET name = ?, ingredients = ?, instructions = ?, image = ?, rate = ?
      WHERE id = ?
    `;

    await connection.query(query, [name, ingredients, instructions, image, rate, id],(err, rows, fields)=>{
      return res.send(rows)
    });
  } else {
    return new Error('The recipe fields are not valid');
  }
}

// Function to delete a recipe
function deleteRecipe(req, res) {
  const { id } = req.params;  
  const query = `
    DELETE FROM recipes
    WHERE id = ?
  `;

  connection.query(query, [id], (err, rows, fields)=>{
    return res.send(rows)
  });
}

// Function to obtain all the ingredients of a recipe
function getIngredientsForRecipe(req, res) {
  const { id } = req.params;
  const query = `
    SELECT * FROM ingredients WHERE recipe_id =?
  `;

  connection.query(query, [id], (err, rows, fields)=>{
    return res.send(rows)
  });
}


// Function to add an ingredient to a recipe
async function addIngredientToRecipe(req, res) {
  const { recipeId, name, quantity } = req.body;
  return createIngredient(recipeId, name, quantity);
}

// Function to remove an ingredient from a recipe
function deleteIngredientFromRecipe(req, res) {
  const { recipeId, ingredientId } = req.body;
  const query = `
    DELETE FROM ingredients
    WHERE recipe_id =? AND id =?
  `;

  connection.query(query, [recipeId, ingredientId], (err, rows, fields)=>{
    return res.send(rows)
  });
}


export {
  createRecipe,
  createIngredient,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getIngredientsForRecipe,
  addIngredientToRecipe,
  deleteIngredientFromRecipe
};
