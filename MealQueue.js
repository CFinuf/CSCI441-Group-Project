class MealQueue {
    constructor(dish, priority, time) {
        // Initialize MealQueue with dish, priority, and time
        this.dish = dish;
        this.priority = priority;
        this.time = time;
    }

    // Display meal queue item details
    displayQueue() {
        console.log(`Dish: ${this.dish} | Priority: ${this.priority} | Time remaining: ${this.time} minutes`);
    }
}

module.exports = MealQueue;
