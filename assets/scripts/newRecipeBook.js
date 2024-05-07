const recipeBookNameInput = document.getElementById('recipeBookName');
const addBookButton = document.getElementById('addBookButton');
const recipeBookList = document.getElementById('recipeBookList');
const topTitle = document.getElementById('h1');

// Load existing recipe books on page load
loadRecipeBooks();

// Event listener for adding a new recipe book
addBookButton.addEventListener('click', () => {
    const bookName = recipeBookNameInput.value;
    if (bookName.trim() !== '') {
        addRecipeBook(bookName);
        recipeBookNameInput.value = ''; // Clear the input field
        loadRecipeBooks(); // Refresh the list
    } else {
        alert('Please enter a recipe book name');
    }
});

// Functions to manage local storage and display
function addRecipeBook(bookName) {
    let recipeBooks = getRecipeBooks();
    newRecipeBook = {
      "Name": bookName,
      "Selected": true,
      "Recipes": []
    }
    recipeBooks.push(newRecipeBook);
    localStorage.setItem("MyPersonalRecipeBook", JSON.stringify(recipeBooks));
}

function getRecipeBooks() {
    let recipeBooks = localStorage.getItem("MyPersonalRecipeBook");
    return recipeBooks ? JSON.parse(recipeBooks) : [];
}

function loadRecipeBooks() {
    recipeBookList.innerHTML = ''; // Clear the list
    const recipeBooks = getRecipeBooks();

    if (recipeBooks.length === 0) {
        recipeBookList.textContent = 'No recipe books yet.';
    } else {
        recipeBooks.forEach(bookName => {
            const listItem = document.createElement('li');
            listItem.textContent = bookName.Name;
            recipeBookList.appendChild(listItem);
        });
    }
}

// Handle book selection
recipeBookList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const bookName = event.target.textContent;
        selectRecipeBook(bookName);
    }
});

function selectRecipeBook(bookName) {
    let recipeBooks = getRecipeBooks();
    recipeBooks.forEach(book => {
        book.Selected = book.Name === bookName; // Update 'Selected' state
    });
    localStorage.setItem("MyPersonalRecipeBook", JSON.stringify(recipeBooks));
    loadRecipeBooks(); // Refresh the display
    location.reload()
}

