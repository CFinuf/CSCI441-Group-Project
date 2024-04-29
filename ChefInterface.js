const Inventory = require('./Inventory');
const fetch = require('node-fetch');

class ChefInterface {
    constructor(empID) {
        // Initialize ChefInterface with employee ID and base URL
        this.employeeID = empID;
        this.baseUrl = 'https://torpid-closed-robe.glitch.me';
        // Instantiate Inventory object
        this.inventory = new Inventory();
    }

    // Display the order queue for all tables
    async displayQueue() {
        try {
            const response = await fetch(`${this.baseUrl}/tables`);
            const tables = await response.json();

            console.log("Displaying order queue");
            tables.forEach(table => {
                if (table.status === 1) {
                    console.log(`Table ${table.tableNumber}: No orders`);
                } else {
                    console.log(`Table ${table.tableNumber}: Orders pending`);
                }
            });
        } catch (error) {
            console.error('Error fetching table status:', error);
        }
    }

    // Fetch and display users
    async getUsers() {
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            const users = await response.json();
            console.log("Users:", users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Fetch and display menu
    async getMenu() {
        try {
            const response = await fetch(`${this.baseUrl}/menu`);
            const menu = await response.json();
            console.log("Menu:", menu);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    }

    // Display ingredients from inventory
    async getIngredients() {
        console.log("Ingredients:", this.inventory.listIngredients());
    }

    // Display items from inventory
    async getItems() {
        console.log("Items:", this.inventory.listInventory());
    }

    // Start order for a specific table
    async startOrder(tableNumber) {
        try {
            // Fetch the menu to get the dish and its ingredients
            const menuResponse = await fetch(`${this.baseUrl}/menu`);
            const menu = await menuResponse.json();
            
            // Find the order in the menu by tableNumber
            const order = menu.find(item => item._id === tableNumber);
    
            if (order) {
                // Fetch the ingredients
                const ingredientsResponse = await fetch(`${this.baseUrl}/ingredients`);
                const ingredients = await ingredientsResponse.json();
    
                // Check if we have enough ingredients for the order
                const ingredientsNeeded = order.dish.split(', '); // Assuming dish property contains comma-separated ingredient names
                let hasEnoughIngredients = true;
    
                ingredientsNeeded.forEach(ingredient => {
                    const requiredIngredient = ingredients.find(item => item.name === ingredient);
                    if (!requiredIngredient || requiredIngredient.quantity === 0) {
                        console.log(`Not enough ${ingredient} to start order.`);
                        hasEnoughIngredients = false;
                    }
                });
    
                if (hasEnoughIngredients) {
                    // Implement startOrder functionality
                    console.log(`Starting order for table ${tableNumber}`);
                } else {
                    console.log(`Cannot start order for table ${tableNumber}. Insufficient ingredients.`);
                }
            } else {
                console.log(`Order not found for table ${tableNumber}.`);
            }
        } catch (error) {
            console.error('Error starting order:', error);
        }
    }
    
    // Complete order for a specific table
    async completeOrder(tableNumber) {
        try {
            // Implement completeOrder functionality
            console.log(`Completing order for table ${tableNumber}`);
            this.sendAlert(tableNumber + " food is ready!");
        } catch (error) {
            console.error('Error completing order:', error);
        }
    }

    // Send alert for completed order to waiter/waitress
    async sendAlert(message) {
        // Send alert to waiter/waitress
        //Needs implemented
        console.log(`Alert sent: ${message}`);
    }
}

module.exports = ChefInterface;
