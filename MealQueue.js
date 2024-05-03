//Written by: Chandler Finuf
//Tested by:
//Debugged by: Chandler Finuf, 

//const fetch = require('node-fetch');

export class MealQueue {
    constructor() {
        // Initialize an empty queue
        this.queue = [];
    }

    // Fetch orders from the API and populate the queue
    async fetchOrders() {
        try {
            const response = await fetch('https://torpid-closed-robe.glitch.me/orders');
            const orders = await response.json();
    
            // Clear the existing queue
            this.queue = [];
    
            // Populate the queue with formatted orders
            orders.forEach(order => {
                const formattedOrder = {
                    tableNumber: order.tableNumber,
                    order: order.order.map(item => ({ dish: item.dish, quantity: item.quantity })), // Format the order
                    status: order.status
                };
                this.queue.push(formattedOrder);
            });
    
            console.log('Meal queue updated:', this.queue);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    

    // Display meal queue item details
    displayQueue() {
        console.log('Meal queue:');
        this.queue.forEach(item => {
            console.log(`Table: ${item.tableNumber} | Status: ${item.status === 0 ? 'Cooking' : 'Ready to deliver'}`);
            console.log('Order:', item.order);
        });
    }
}
