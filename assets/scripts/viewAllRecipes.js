const recipeSelect = document.getElementById('recipeSelect');
const recipeDetails = document.getElementById('recipeDetails');
const currentRecipeBookDisplay = document.getElementById('currentRecipeBook');

loadRecipeBookAndRecipes();

recipeSelect.addEventListener('change', displayRecipe);

function loadRecipeBookAndRecipes() {
    const recipeBooks = getRecipeBooks();
    const selectedBook = recipeBooks.find(book => book.Selected);

    currentRecipeBookDisplay.textContent = selectedBook ? selectedBook.Name : '';

    // Clear any existing options before populating
    recipeSelect.innerHTML = '';

    if (selectedBook) {
        selectedBook.Recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.value = recipe.Title; // Assuming recipe titles are unique
            option.textContent = recipe.Title;
            recipeSelect.appendChild(option);
        });
    }
}

function displayRecipe() {
    const recipeBooks = getRecipeBooks();
    const selectedBook = recipeBooks.find(book => book.Selected);
    const selectedRecipeTitle = recipeSelect.value;

    if (selectedBook && selectedRecipeTitle) {
        const recipe = selectedBook.Recipes.find(r => r.Title === selectedRecipeTitle);
        renderRecipeDetails(recipe); 
    } else {
        recipeDetails.innerHTML = ''; // Clear details if nothing is selected
    }
}

function renderRecipeDetails(recipe) {
    recipeDetails.innerHTML = ''; // Clear previous details

    const title = document.createElement('h3');
    title.textContent = recipe.Title;
    recipeDetails.appendChild(title);

    recipe.Ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = `${ingredient.Qty} ${ingredient.Size} ${ingredient.Ingredient}`;
      recipeDetails.appendChild(li);
    });

    const summary = document.createElement ('p')
    summary.textContent = recipe.Summary;
    recipeDetails.appendChild(summary);

    recipe.Instructions.forEach(function (instruction, i) {
      const ul = document.createElement('ul');
      ul.textContent = `${i+1}. ${instruction}`;
      recipeDetails.appendChild(ul);
    });
}
