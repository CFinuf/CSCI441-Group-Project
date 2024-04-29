const Inventory = require('./Inventory');

class Chef {
    constructor(name, employeeID) {
        // Initialize Chef with name, employee ID, and Inventory object
        this.name = name;
        this.employeeID = employeeID;
        this.Inventory = new Inventory(); // Instantiate Inventory object
    }

    // Log that the chef is working
    work() {
        console.log(`Chef ${this.name} is working.`);
    }

    // Implement Chef specific interface using methods
    interface() {
        // Implement Chef specific interface
    }

    // Display meal preparation queue
    prepareMealQueue() {
        console.log("Displaying order queue");
    }

    // Receive orders
    OrderRecieval() {
        // Actual implementation for receiving orders
    }

    // Alert for completed meals
    MealAlert() {
        // Actual implementation for meal alerts
    }

    // Start timer for meal preparation
    prepareMealTimer() {
        console.log("Timer started for dish: Dish Name for 30 minutes.");
    }

    // Update inventory
    InventoryUpdate() {
        // Actual implementation for updating inventory
    }

    // Check inventory for low stock and depletion
    InventoryCheck() {
        console.log(this.Inventory.checkLowStock());
        console.log(this.Inventory.checkDepleted());
        console.log(this.Inventory.listInventory());
    }
}

module.exports = Chef;
