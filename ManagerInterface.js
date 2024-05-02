//Written by: Braulio Mercado
//Tested by: Braulio Mercado
//Debugged by: Braulio Mercado

// Declare users array in a broader scope
let ingredients = [];

fetch('https://torpid-closed-robe.glitch.me/ingredients')
  .then(response => response.json())
  .then(data => {
    ingredients = data; // Store fetched data in the users array
    console.log(ingredients); // Logging the retrieved data to console for verification
    InventoryView();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

fetch('https://torpid-closed-robe.glitch.me/menu')
  .then(response => response.json())
  .then(data => {
    menu = data; // Store fetched data in the users array
    console.log(menu); // Logging the retrieved data to console for verification
    viewMenu();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function InventoryView() {
    // Get the inventory element
    const inventoryElement = document.getElementById('inventory-view');

    // Clear previous inventory content
    inventoryElement.innerHTML = '';

    // Create a list to display inventory items
    const inventoryList = document.createElement('ul');

    // Loop through the ingredients array and create list items
    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient.name}: ${ingredient.quantity}`;
        inventoryList.appendChild(listItem);
    });

    // Append the inventory list to the inventory element
    inventoryElement.appendChild(inventoryList);
}


function InventoryEdit(event) {
    event.preventDefault(); // Prevent form submission
    const form = event.target; // Get the form element
    const ingredient = form.elements.ingredient.value; // Get the value of the ingredient input field
    const quantity = parseInt(form.elements.quantity.value); // Get the value of the quantity input field

    // Check if ingredient is empty
    if (!ingredient) {
        console.error('Please enter an ingredient');
        return;
    }

    // Check if quantity is a valid number
    if (isNaN(quantity)) {
        console.error('Please enter a valid quantity');
        return;
    }

    // Update the inventory data
    const foundIngredientIndex = ingredients.findIndex(item => item.name === ingredient);
    if (foundIngredientIndex !== -1) {
        // Ingredient found in inventory, update its quantity
        ingredients[foundIngredientIndex].quantity += quantity;
    } else {
        // Ingredient not found, add it to the inventory
        ingredients.push({ name: ingredient, quantity });
    }

    // Update the inventory view
    InventoryView();
}

// update inventory of actual database as compared to what was retrieved
/*
function InventoryEdit(event) {
    event.preventDefault(); // Prevent form submission
    const form = event.target; // Get the form element
    const ingredient = form.elements.ingredient.value; // Get the value of the ingredient input field
    const quantity = parseInt(form.elements.quantity.value); // Get the value of the quantity input field

    // Check if ingredient is empty
    if (!ingredient) {
        console.error('Please enter an ingredient');
        return;
    }

    // Check if quantity is a valid number
    if (isNaN(quantity)) {
        console.error('Please enter a valid quantity');
        return;
    }

    // Create the data object to be sent to the server
    const data = {
        ingredient,
        quantity
    };

    // Send a POST request to your server endpoint to update the inventory
    fetch('https://your-server-url.com/update-inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        // Handle the response from the server if needed
        console.log(responseData);
        // Update the inventory view
        InventoryView();
    })
    .catch(error => {
        console.error('Error updating inventory:', error);
    });
}*/


// Function to display inventory data
function displayInventory() {
    const inventoryElement = document.getElementById('inventory-view');
    inventoryElement.innerHTML = ''; // Clear previous content

    const inventoryList = document.createElement('ul');
    for (const [ingredient, quantity] of Object.entries(inventoryData.ingredients)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient}: ${quantity}`;
        inventoryList.appendChild(listItem);
    }
    inventoryElement.appendChild(inventoryList);
}

// Add event listener to the form submission
document.getElementById('inventory-form').addEventListener('submit', InventoryEdit);
/*
// Initial inventory data (simulated)
const inventoryData = {
    ingredients: {
        "flour": 1000,
        "sugar": 500,
        "salt": 300,
        "pepper": 200,
        "oil": 1000,
        "butter": 500,
        "eggs": 100,
        "milk": 1000,
        "cheese": 300,
        "plates": 100,
        "spoons": 50,
        "forks": 50,
        "knives": 50
    },

};*/

// Display initial inventory data
//displayInventory();


function InventoryAlert() {
    const threshold = 50; // Threshold for low stock alert

    // Check if any item in the inventory is below the threshold
    const lowStockItems = ingredients.filter(item => item.quantity < threshold);

    // Display alert message if low stock items are found
    if (lowStockItems.length > 0) {
        const alertElement = document.getElementById('alert');
        alertElement.innerHTML = ''; // Clear previous content

        const alertMessage = document.createElement('p');
        alertMessage.style.color = 'red'; // Set text color to red
        alertMessage.style.fontWeight = 'bold'; // Make text bold
        alertMessage.textContent = `Alert: The following items are low in stock (${threshold} or less): ${lowStockItems.map(item => item.name).join(', ')}`;
        alertElement.appendChild(alertMessage);
    }
}




// Call InventoryAlert function to check for low stock items initially
InventoryAlert();

// Call InventoryAlert function at intervals (e.g., every 5 minutes)
setInterval(InventoryAlert, 5 * 60 * 1000); // 5 minutes in milliseconds


function MenuEdit(event) {
    event.preventDefault(); // Prevent form submission
    const form = event.target; // Get the form element
    const item = form.elements.item.value; // Get the value of the item input field
    const price = parseFloat(form.elements.price.value); // Get the value of the price input field

    // Check if item already exists in the menu
    if (menuData.hasOwnProperty(item)) {
        console.error('Item already exists in the menu');
        return;
    }

    // Add the item to the menu
    menuData[item] = price;

    // Update the menu view
    viewMenu();
}


// Add event listener to the form submission
document.getElementById('menu-form').addEventListener('submit', MenuEdit);


// Initial menu data (simulated)
const menuData = {
    "Cheeseburger": 9.99,
    "Pizza": 12.99,
    "Salad": 7.99
};

const menuRatings = {
    "Cheeseburger": [4, 5, 3],
    "Pizza": [5, 4],
    "Salad": [3, 3, 4, 4]
};

// Function to view the menu
function viewMenu() {
    const menuElement = document.getElementById('menu-view');
    menuElement.innerHTML = ''; // Clear previous content
    // Create a list to display inventory items
    const menuList = document.createElement('ul');
    // Loop through the menu array and create list items
    menu.forEach(menu => {
        const listItem = document.createElement('li');
        listItem.textContent = `${menu.dish}`;
        menuList.appendChild(listItem);
    });

    // Append the menu list to the menu element
    menuElement.appendChild(menuList);
}



function MenuStats() {
    const statsElement = document.getElementById('menu-stats');
    statsElement.innerHTML = '';

    for (const [item, price] of Object.entries(menuData)) {
        const ratings = menuRatings[item] || []; // Get ratings for the item, or an empty array if none
        const averageRating = calculateAverage(ratings);

        const listItem = document.createElement('div');
        listItem.textContent = `${item}: ${averageRating.toFixed(2)} / 5`;
        statsElement.appendChild(listItem);
    }
}

function calculateAverage(ratings) {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
}

MenuStats();


function revenueView() {
    // Dummy revenue values
    const monthlyRevenue = 500;
    const weeklyRevenue = 150;
    const dailyRevenue = 30;

    // Display the revenue
    document.getElementById('monthly-revenue').textContent = `$${monthlyRevenue.toFixed(2)}`;
    document.getElementById('weekly-revenue').textContent = `$${weeklyRevenue.toFixed(2)}`;
    document.getElementById('daily-revenue').textContent = `$${dailyRevenue.toFixed(2)}`;
}

// Call revenueView() to display the revenue
revenueView();
