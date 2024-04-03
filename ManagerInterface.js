

function InventoryView() {
    // Simulate fetching inventory data from a server
    setTimeout(function() {
        // Mock inventory data 
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
                "cheese": 300
            },
            plates: 100,
            spoons: 50,
            forks: 50,
            knives: 50
        };

        // Get the inventory element
        const inventoryElement = document.getElementById('inventory-view');

        // Clear previous inventory content
        inventoryElement.innerHTML = '';

        // Create a list to display inventory items
        const inventoryList = document.createElement('ul');

        // Loop through the inventory data and create list items
        for (const [ingredient, quantity] of Object.entries(inventoryData.ingredients)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient}: ${quantity}`;
            inventoryList.appendChild(listItem);
        }

        // Add plates, spoons, forks, and knives to the inventory list
        const platesItem = document.createElement('li');
        platesItem.textContent = `Plates: ${inventoryData.plates}`;
        inventoryList.appendChild(platesItem);

        const spoonsItem = document.createElement('li');
        spoonsItem.textContent = `Spoons: ${inventoryData.spoons}`;
        inventoryList.appendChild(spoonsItem);

        const forksItem = document.createElement('li');
        forksItem.textContent = `Forks: ${inventoryData.forks}`;
        inventoryList.appendChild(forksItem);

        const knivesItem = document.createElement('li');
        knivesItem.textContent = `Knives: ${inventoryData.knives}`;
        inventoryList.appendChild(knivesItem);

        // Append the inventory list to the inventory element
        inventoryElement.appendChild(inventoryList);
    }, 1000); // Simulate a delay of 1 second
}

function InventoryEdit(event) {
    event.preventDefault(); // Prevent form submission
    const form = event.target; // Get the form element
    const ingredient = form.elements.ingredient.value; // Get the value of the ingredient input field
    const quantity = parseInt(form.elements.quantity.value); // Get the value of the quantity input field

    // Simulate adding or using the ingredient in the inventory
    if (quantity > 0) {
        // Add the specified quantity of the ingredient
        if (inventoryData.ingredients.hasOwnProperty(ingredient)) {
            inventoryData.ingredients[ingredient] += quantity;
        } else {
            inventoryData.ingredients[ingredient] = quantity;
        }
    } else {
        // Use the specified quantity of the ingredient
        if (inventoryData.ingredients.hasOwnProperty(ingredient)) {
            const remainingQuantity = inventoryData.ingredients[ingredient] + quantity;
            if (remainingQuantity >= 0) {
                inventoryData.ingredients[ingredient] = remainingQuantity;
            } else {
                console.error('Error: Insufficient quantity of ' + ingredient);
                return; // Don't proceed further if there's insufficient quantity
            }
        } else {
            console.error('Error: Ingredient ' + ingredient + ' not found');
            return; // Don't proceed further if the ingredient is not found
        }
    }

    // Update the inventory view
    displayInventory();
}

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

};

// Display initial inventory data
displayInventory();


function InventoryAlert() {
    const threshold = 50; // Threshold for low stock alert

    // Check if any item in the inventory is below the threshold
    const lowStockItems = [];
    for (const [ingredient, quantity] of Object.entries(inventoryData.ingredients)) {
        if (quantity < threshold) {
            lowStockItems.push(ingredient);
        }
    }

    // Display alert message if low stock items are found
    if (lowStockItems.length > 0) {
        const alertElement = document.getElementById('alert');
        alertElement.innerHTML = ''; // Clear previous content

        const alertMessage = document.createElement('p');
        alertMessage.style.color = 'red'; // Set text color to red
        alertMessage.style.fontWeight = 'bold'; // Make text bold
        alertMessage.textContent = `Alert: The following items are low in stock (${threshold} or less): ${lowStockItems.join(', ')}`;
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

    const menuList = document.createElement('ul');
    for (const [item, price] of Object.entries(menuData)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${item}: $${price.toFixed(2)}`;
        menuList.appendChild(listItem);
    }
    menuElement.appendChild(menuList);
}

// Call viewMenu function to display the menu initially
viewMenu();

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
