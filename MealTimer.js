class MealTimer {
    constructor(dishName, timeRequired) {
        // Initialize MealTimer with dish name and time required
        this.dishName = dishName;
        this.timeRequired = timeRequired;
    }

    // Start timer for the meal
    startTimer() {
        console.log(`Timer started for dish: ${this.dishName} for ${this.timeRequired} minutes.`);
    }
}

module.exports = MealTimer;
