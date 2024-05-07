const recipeTitleInput = document.getElementById('recipeTitle');
const ingredientsTable = document.getElementById('ingredientsTable');
const addIngredientButton = document.getElementById('addIngredient');
const recipeSummary = document.getElementById('recipeSummary');
const instructionsList = document.getElementById('instructionsList');
const addInstructionButton = document.getElementById('addInstruction');
const newInstructionInput = document.getElementById('newInstruction');
const addRecipeButton = document.getElementById('addRecipeButton');

addIngredientButton.addEventListener('click', addIngredientRow);
addInstructionButton.addEventListener('click', addInstruction);
addRecipeButton.addEventListener('click', saveRecipe);

// Add a row in the ingredients table
function addIngredientRow() {
  const newRow = ingredientsTable.insertRow(-1); // Add row at the end
  
  // Create elements to insert new cells
  const qtyCell = newRow.insertCell(0);
  const sizeCell = newRow.insertCell(1);
  const ingredientCell = newRow.insertCell(2);
  const removeBtnCell = newRow.insertCell(3);

  // Add input fields and remove button to the cells
  const qtyInput = document.createElement('input');
  qtyInput.type = "text";
  qtyCell.appendChild(qtyInput);

  const sizeInput = document.createElement('input');
  sizeInput.type = "text";
  sizeCell.appendChild(sizeInput);

  const ingredientInput = document.createElement('input');
  ingredientInput.type = "text";
  ingredientCell.appendChild(ingredientInput);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = "-";
  removeBtn.className = "remove";
  removeBtnCell.appendChild(removeBtn);

  // Add event listener to remove a row
  removeBtn.addEventListener('click', () => {
    newRow.remove();
  });
}

// Add an instruction step
function addInstruction() {

  const newOL = document.createElement('ol');
  instructionsList.appendChild(newOL);

  const newInstructions = document.createElement('input')
  newInstructions.type = "text";
  newOL.appendChild(newInstructions)

  const removeBtn = document.createElement('button')
  removeBtn.textContent = "-";
  removeBtn.className = "remove";
  newOL.appendChild(removeBtn);

  removeBtn.addEventListener('click', () => {
    newOL.remove();
  });

}

function saveRecipe() {
  // 1. Get data from the form
  const recipeTitle = recipeTitleInput.value;
  const summary = recipeSummary.value;

  const ingredients = [];
  const ingredientsRows = ingredientsTable.querySelectorAll('tbody tr');
  ingredientsRows.forEach(row => {
      const qty = row.cells[0].querySelector('input').value;
      const size = row.cells[1].querySelector('input').value;
      const ingredient = row.cells[2].querySelector('input').value;
      ingredients.push({ Ingredient: ingredient, Qty: qty, Size: size });
  });

  const instructions = [];
  const instructionsListItems = document.querySelectorAll('#instructionsList ol');
  instructionsListItems.forEach(item => {
    const step = item.querySelector('input').value;
    instructions.push(step);
  });

  // 2. Find selected book
  const recipeBooks = getRecipeBooks();
  const selectedBook = recipeBooks.find(book => book.Selected);

  if (!selectedBook) {
      alert('Please select a recipe book');
      return;
  }

  // 3. Create recipe object and add it 
  const newRecipe = {
      Title: recipeTitle,
      Ingredients: ingredients,
      Summary: summary,
      Instructions: instructions
  };
  selectedBook.Recipes.push(newRecipe);

  // 4. Update local storage
  localStorage.setItem("MyPersonalRecipeBook", JSON.stringify(recipeBooks));

  alert('Recipe saved!'); 
  location.reload()
}

