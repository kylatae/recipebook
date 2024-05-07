function createTopBar() {
  const body = document.body; // Get the <body> element


  const recipeBooks = getRecipeBooks();
  const selectedBook = recipeBooks.find(book => book.Selected);
  

  // Create the top bar elements dynamically
  const topBar = document.createElement('div');
  topBar.classList.add("topbar");

  const h1 = document.createElement('h1');
  // Update the recipe book display 
  h1.textContent = selectedBook ? selectedBook.Name : "Recipe Book"; 

  const dropdown = document.createElement('div');
  dropdown.classList.add("dropdown");

  // ... (Create menu button and dropdown content as before)
  const dropBtn = document.createElement("button");
  dropBtn.classList.add("dropbtn");
  dropBtn.textContent = "Menu";
  dropdown.appendChild(dropBtn);

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");
  dropdown.appendChild(dropdownContent);

  const links = [
    ["addNewRecipe.html", "Add New Recipe"],
    ["viewAllRecipes.html", "View All Recipes"],
    ["searchRecipes.html", "Search By Ingredient"],
    ["newRecipeBook.html", "New Recipe Book"]
];

  for (const [href, text] of links) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = text;
      dropdownContent.appendChild(link);
  }

  // Add the created elements to the top bar and the body
  topBar.appendChild(h1);
  topBar.appendChild(dropdown);
  body.insertBefore(topBar, body.firstChild); // Insert at the beginning of <body> 
}

function getRecipeBooks() {
  let recipeBooks = localStorage.getItem("MyPersonalRecipeBook");
  return recipeBooks ? JSON.parse(recipeBooks) : [];
}

createTopBar(); // Call the function to create the top bar