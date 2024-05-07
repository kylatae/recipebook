const searchIngredientInput = document.getElementById('searchIngredient');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', searchRecipes);

function searchRecipes() {
    const searchTerm = searchIngredientInput.value.toLowerCase();
    const recipeBooks = getRecipeBooks();
    const selectedBook = recipeBooks.find(book => book.Selected);

    searchResults.innerHTML = ''; // Clear previous results

    if (selectedBook) {
        const matchingRecipes = selectedBook.Recipes.filter(recipe => {
            return recipe.Ingredients.some(ingredient => 
                ingredient.Ingredient.toLowerCase().includes(searchTerm)
            );
        });

        if (matchingRecipes.length > 0) {
            matchingRecipes.forEach(recipe => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                const title = document.createElement('h3');
                title.textContent = recipe.Title;
                resultItem.appendChild(title);

                const summary = document.createElement('p');
                summary.textContent = recipe.Summary || 'No summary available';
                resultItem.appendChild(summary);

                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.textContent = 'No recipes found with that ingredient.';
        }
    } else {
        searchResults.textContent = 'Please select a recipe book';
    }
}
