//Written by: Chandler Finuf
//Tested by:
//Debugged by: Chandler Finuf, 


const Inventory = require('./Inventory');
const fetch = require('node-fetch');
const MealQueue = require('./MealQueue');
const MealTimer = require('./MealTimer');

class ChefInterface {
    constructor(empID) {
        // Initialize ChefInterface with employee ID and base URL
        this.employeeID = empID;
        this.baseUrl = 'https://torpid-closed-robe.glitch.me';
        // Instantiate Inventory object
        this.Inventory = new Inventory();

        this.mealQueue = new MealQueue();

        this.MealTimer = new MealTimer();

        // Bind functions to maintain context
        this.displayQueue = this.displayQueue.bind(this);
        this.updateInterface = this.updateInterface.bind(this);
        this.completeOrder = this.completeOrder.bind(this);

        // Update the interface initially
        this.updateInterface();
    }

    // Display the order queue for all tables
    async displayQueue() {
        await this.mealQueue.fetchOrders(); // Fetch orders using MealQueue
        this.mealQueue.displayQueue(); // Display meal queue
        this.updateInterface(); // Update the interface after fetching orders
    }

    // Update the ChefInterface.html with order queue, current order, and timer
    async updateInterface() {
        await this.displayQueue(); // Display the updated queue
        // Display current order and start timer if an order is in progress
        const currentOrder = this.mealQueue.queue.find(item => item.status === 0);
        if (currentOrder) {
            document.getElementById('current-order').innerText = `Table: ${currentOrder.tableNumber} | Order: ${JSON.stringify(currentOrder.order)}`;
            const totalTime = await this.mealTimer.calculateTotalTime(currentOrder.order);
            this.startTimer(totalTime);
        } else {
            document.getElementById('current-order').innerText = 'No current order';
            this.stopTimer(); // Stop the timer if there's no current order
        }
    }

    // Start timer for the meal
    startTimer(cookingTime) {
        let timeRemaining = cookingTime;
        const timerElement = document.getElementById('timer');
        timerElement.innerText = `Time Remaining: ${timeRemaining} minutes`;

        this.timerInterval = setInterval(() => {
            timeRemaining--;
            timerElement.innerText = `Time Remaining: ${timeRemaining} minutes`;
            if (timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.completeOrder(); // Complete the order if time runs out
            }
        }, 60000); // Update timer every minute
    }

    // Stop the timer
    stopTimer() {
        clearInterval(this.timerInterval);
        document.getElementById('timer').innerText = '';
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
            // Fetch the orders to find the specific order for the table
            await this.mealQueue.fetchOrders(); // Fetch orders using MealQueue
            const order = this.mealQueue.queue.find(order => order.tableNumber === tableNumber);

            if (order) {
                // Implement startOrder functionality
                console.log(`Starting order for table ${tableNumber}`);

                // Calculate total time for the order using MealTimer
                const orderTotalTime = await this.mealTimer.calculateTotalTime(order.order);
                console.log(`Total time for order: ${orderTotalTime} minutes`);

                // Start timer for the order
                this.mealTimer.startTimer(orderTotalTime);
                
                // No need to update the order status as it's already 0 (cooking)
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
        // Fetch the orders to find the specific order for the table
        const response = await fetch(`${this.baseUrl}/orders`);
        const orders = await response.json();
        const order = orders.find(order => order.tableNumber === tableNumber);

        if (order) {
            // Implement completeOrder functionality
            console.log(`Completing order for table ${tableNumber}`);
            
            // Update the order status to 1 (cooked and ready to be delivered) using PUT
            await fetch(`${this.baseUrl}/orders`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    ...order,
                    status: 1
                })
            });
            
            console.log(`Order status updated for table ${tableNumber} to 1 (cooked and ready to be delivered).`);
            this.updateInterface(); // Update interface after completing the order
            this.sendAlert(tableNumber + " food is ready!");
        } else {
            console.log(`Order not found for table ${tableNumber}.`);
        }
    } catch (error) {
        console.error('Error completing order:', error);
    }
}


    // Send alert for completed order to waiter/waitress
    async sendAlert(message) {
        console.log(`Alert sent: ${message}`);
    }
}

module.exports = ChefInterface;
