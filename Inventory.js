//Written by: Chandler Finuf
//Tested by:
//Debugged by: Chandler Finuf, 
//const fetch = require('node-fetch');

export class Inventory {
    constructor() {
        // Initialize Inventory with empty items and ingredients, and base URL
        this.items = {};
        this.ingredients = {};
        this.baseUrl = 'https://torpid-closed-robe.glitch.me';
        // Fetch items and ingredients
        this.fetchItems();
        this.fetchIngredients();
    }

    // Fetch items from API and populate items object
    async fetchItems() {
        try {
            const response = await fetch(`${this.baseUrl}/items`);
            const items = await response.json();
            items.forEach(item => {
                this.items[item.name] = item.quantity;
            });
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    // Fetch ingredients from API and populate ingredients object
    async fetchIngredients() {
        try {
            const response = await fetch(`${this.baseUrl}/ingredients`);
            const ingredients = await response.json();
            ingredients.forEach(ingredient => {
                this.ingredients[ingredient.name] = ingredient.quantity;
            });
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    }

    // Add quantity to an ingredient
    addIngredient(ingredient, quantity) {
        this.ingredients[ingredient] += quantity;
    }

    // Use quantity of an ingredient
    useIngredient(ingredient, quantity) {
        if (this.ingredients[ingredient] >= quantity) {
            this.ingredients[ingredient] -= quantity;
            return `Ingredient ${ingredient} used successfully!`;
        } else {
            return `Insufficient quantity of ${ingredient}!`;
        }
    }

    // Use a plate
    usePlate() {
        if (this.items['plates'] > 0) {
            this.items['plates']--;
            return "Plate used successfully!";
        } else {
            return "No more plates available!";
        }
    }

    // Use utensils
    useUtensils(quantity) {
        if (
            this.items['spoons'] >= quantity &&
            this.items['forks'] >= quantity &&
            this.items['knives'] >= quantity
        ) {
            this.items['spoons'] -= quantity;
            this.items['forks'] -= quantity;
            this.items['knives'] -= quantity;
            return "Utensils used successfully!";
        } else {
            return "Insufficient utensils available!";
        }
    }

    // Check for low stock of ingredients and items
    checkLowStock() {
        let output = "Checking low stock...\n";
        for (const [ingredient, quantity] of Object.entries(this.ingredients)) {
            if (quantity < this.items['plates'] / 5) {
                output += `Low stock warning: ${ingredient} is running low!\n`;
            }
        }
        if (this.items['plates'] < this.items['plates'] / 5) {
            output += "Low stock warning: Plates are running low!\n";
        }
        if (this.items['spoons'] < this.items['spoons'] / 5) {
            output += "Low stock warning: Spoons are running low!\n";
        }
        if (this.items['forks'] < this.items['forks'] / 5) {
            output += "Low stock warning: Forks are running low!\n";
        }
        if (this.items['knives'] < this.items['knives'] / 5) {
            output += "Low stock warning: Knives are running low!\n";
        }
        return output;
    }

    // Check for depletion of ingredients and items
    checkDepleted() {
        let output = "Checking for depletion...\n";
        for (const [ingredient, quantity] of Object.entries(this.ingredients)) {
            if (quantity === 0) {
                output += `Depletion warning: ${ingredient} is depleted!\n`;
            }
        }
        if (this.items['plates'] === 0) {
            output += "Depletion warning: Plates are depleted!\n";
        }
        if (this.items['spoons'] === 0) {
            output += "Depletion warning: Spoons are depleted!\n";
        }
        if (this.items['forks'] === 0) {
            output += "Depletion warning: Forks are depleted!\n";
        }
        if (this.items['knives'] === 0) {
            output += "Depletion warning: Knives are depleted!\n";
        }
        return output;
    }

    // List current ingredient quantities
    listIngredients() {
        let output = "Current Ingredient Quantities:\n";
        for (const [ingredient, quantity] of Object.entries(this.ingredients)) {
            output += `${ingredient}: ${quantity}\n`;
        }
        return output;
    }

    // List current inventory
    listInventory() {
        let output = "Current Inventory:\n";
        output += this.listIngredients();
        output += `Plates: ${this.items['plates']}\n`;
        output += `Spoons: ${this.items['spoons']}\n`;
        output += `Forks: ${this.items['forks']}\n`;
        output += `Knives: ${this.items['knives']}\n`;
        return output;
    }
}

//module.exports = Inventory;
