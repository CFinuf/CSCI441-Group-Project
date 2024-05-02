//Written by: Chandler Finuf
//Tested by:
//Debugged by: Chandler Finuf, 
const fetch = require('node-fetch');

class MealTimer {
    constructor() {
        // Initialize MealTimer
        this.totalTime = 0;
    }

    // Calculate total time for all dishes in an order
    async calculateTotalTime(order) {
        try {
            // Fetch the menu to get the list of dishes and their individual times
            const response = await fetch('https://torpid-closed-robe.glitch.me/menu');
            const menu = await response.json();

            // Initialize total time
            this.totalTime = 0;

            // Iterate over each item in the order to calculate total time
            order.forEach(item => {
                const dish = menu.find(menuItem => menuItem.name.toLowerCase() === item.dish.toLowerCase());
                if (dish) {
                    // Add cooking time of the dish to the total time
                    this.totalTime += dish.timeRequired * item.quantity;
                }
            });

            return this.totalTime;
        } catch (error) {
            console.error('Error calculating total time:', error);
        }
    }

    // Start timer for the meal
    startTimer(cookingTime) {
        console.log(`Timer started for ${cookingTime} minutes.`);
        // This is where you would trigger the timer in the ChefInterface.js/.html
    }
}

module.exports = MealTimer;
