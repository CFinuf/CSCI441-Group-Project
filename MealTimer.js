// Written by: Chandler Finuf
// Tested by:
// Debugged by: Chandler Finuf
// const fetch = require('node-fetch');

export class MealTimer {
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
    
            // Check if menu is empty or undefined
            if (!menu || menu.length === 0) {
                console.error('Menu is empty or undefined.');
                return 0;
            }
    
            // Initialize total time
            this.totalTime = 0;
    
            // Check if order is an array
            if (Array.isArray(order)) {
                // Iterate over each item in the order to calculate total time
                order.forEach(item => {
                    console.log(order);
                    const dish = menu.find(menuItem => menuItem.name && menuItem.name.toLowerCase() === item.dish.toLowerCase());
                    if (dish) {
                        // Add cooking time of the dish to the total time
                        this.totalTime += dish.timeRequired * item.quantity;
                    }
                });
            } else if (typeof order === 'object') {
                // Convert order object into an array of orders
                const orderArray = Object.values(order);
                // Recursively call calculateTotalTime with the converted order array
                await this.calculateTotalTime(orderArray);
            } else {
                console.error('Invalid order format:', order);
            }
    
            return this.totalTime;
        } catch (error) {
            console.error('Error calculating total time:', error);
        }
    }
    


}

//module.exports = MealTimer;
