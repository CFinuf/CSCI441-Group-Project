// Written by: Chandler Finuf
// Tested by:
// Debugged by: Chandler Finuf

// Include necessary imports for fetch and other modules if needed

import { Inventory } from './Inventory.js';
import { MealQueue } from './MealQueue.js';
import { MealTimer } from './MealTimer.js';

const mealQueue = new MealQueue();
const mealTimer = new MealTimer();
const inventory = new Inventory();

const orderQueueDiv = document.getElementById("queue");
const currentOrderDiv = document.getElementById("current-order");
const timerDiv = document.getElementById("timer");

// Function to display the order queue for all tables
async function displayQueue(tableList) {
    try {
        await mealQueue.fetchOrders(); // Fetch orders using MealQueue
        console.log("Meal Queue Fetch Orders: ");
        for (var i = 0; i < mealQueue.queue.length; i++) {
            console.log(mealQueue.queue[i]);
        }
        tableList.innerHTML = ''; // Clear the existing content of the table list
        mealQueue.queue.forEach(async table => {
            const li = document.createElement('li');
            if (Array.isArray(table.order)) {
                const orders = await Promise.all(table.order.map(async order => {
                    const dishTime = await mealTimer.calculateTotalTime(order); // Get the time for the dish
                    return `${order.dish} (${order.quantity.toString()} ${dishTime ? 'minutes' : ''})`; // Convert quantity to string and include the dish time
                }));
                li.textContent = `Table ${table.tableNumber}: ${orders.join(', ')}`;
            } else {
                li.textContent = `Table ${table.tableNumber}: No orders`;
            }
            tableList.appendChild(li); // Append the list item to the table list
        });
    } catch (error) {
        console.error('Error displaying queue:', error);
    }
}








// Function to start the timer for the meal
function startTimer(cookingTime) {
    let timeRemaining = cookingTime;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = `Time Remaining: ${timeRemaining} minutes`;

    const timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `Time Remaining: ${timeRemaining} minutes`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            document.dispatchEvent(new Event('timerExpired')); // Trigger timerExpired event
        }
    }, 60000); // Update timer every minute
}

// Function to update the ChefInterface.html with order queue, current order, and timer
async function updateInterface() {
    try {
        const tableList = document.getElementById('table-list'); // Get the table list element
        await displayQueue(tableList); // Call the displayQueue function passing the tableList parameter
        // Display current order and start timer if an order is in progress
        const currentOrder = mealQueue.queue.find(item => item.status === 0);
        if (currentOrder) {
            document.getElementById('current-order').innerText = `Table: ${currentOrder.tableNumber} | Order: ${currentOrder.order.map(item => `${item.dish} (${item.quantity})`).join(', ')}`;
            const totalTime = await mealTimer.calculateTotalTime(currentOrder.order);
            const totalTimeSeconds = totalTime * 60;
            startTimer(totalTime);
        } else {
            document.getElementById('current-order').innerText = 'No current order';
            stopTimer(); // Stop the timer if there's no current order
        }
    } catch (error) {
        console.error('Error updating interface:', error);
    }
}



// Function to stop the timer
function stopTimer() {
    clearInterval(mealTimer.timerInterval);
    document.getElementById('timer').innerText = '';
}

// Start order for a specific table
async function startOrder(tableNumber) {
    try {
        // Fetch the orders to find the specific order for the table
        await mealQueue.fetchOrders(); // Fetch orders using MealQueue
        const order = mealQueue.queue.find(order => order.tableNumber === tableNumber);

        if (order) {
            // Log the fetched order to check its format
            console.log('Fetched order:', order);

            // Implement startOrder functionality
            console.log(`Starting order for table ${tableNumber}`);

            // Calculate total time for the order using MealTimer
            console.log('Calculating total time for order...');
            const orderTotalTime = await mealTimer.calculateTotalTime(order.order);
            console.log(`Total time for order: ${orderTotalTime} minutes`);

            // Start timer for the order
            startTimer(orderTotalTime);
            
            // No need to update the order status as it's already 0 (cooking)
        } else {
            console.log(`Order not found for table ${tableNumber}.`);
        }
    } catch (error) {
        console.error('Error starting order:', error);
    }
}




// Function to complete order for a specific table
async function completeOrder() {
    try {
        // Fetch the orders
        await mealQueue.fetchOrders(); // Fetch orders using MealQueue
        
        // Get the table number from the queue
        const tableNumber = mealQueue.queue[0].tableNumber; // Assuming the first order in the queue
        
        const orderIndex = mealQueue.queue.findIndex(order => order.tableNumber === tableNumber);

        if (orderIndex !== -1) {
            // Implement completeOrder functionality
            console.log(`Completing order for table ${tableNumber}`);
            
            // Update the order status to 1 (cooked and ready to be delivered)
            mealQueue.queue[orderIndex].status = 1; // Update status locally
            updateInterface(); // Update interface after completing the order
            
            // Remove the completed order from the queue
            mealQueue.queue.splice(orderIndex, 1);

            sendAlert(`Table ${tableNumber}'s food is ready!`);
            document.dispatchEvent(new Event('orderCompleted')); // Trigger orderCompleted event
        } else {
            console.log(`Order not found for table ${tableNumber}.`);
        }
    } catch (error) {
        console.error('Error completing order:', error);
    }
}


// Function to send alert for completed order to waiter/waitress
async function sendAlert(message) {
    console.log(`Alert sent: ${message}`);
}

// Event listeners and other code
// Event listener for the start button
document.getElementById('start-btn').addEventListener('click', () => {
    updateInterface(); // Start updating the interface
});

// Event listener for the complete button
document.getElementById('complete-btn').addEventListener('click', () => {
    completeOrder(); // Complete the order for the current table
});

// Event listener for the timerExpired event
document.addEventListener('timerExpired', () => {
    completeOrder(); // Complete the order if time runs out
    const nextOrder = mealQueue.queue.find(item => item.status === 1);
    if (nextOrder) {
        startOrder(nextOrder.tableNumber); // Start the next order if available
    }
});

// Initial function to kick off the program
function init() {
    updateInterface(); // Update the interface initially
}

window.onload = init;