#include <iostream>
#include "Chef.hpp"
#include "Employee.hpp"
#include "ChefInterface.hpp"
#include "MealTimer.hpp"
#include "MealQueue.hpp"

Chef::Chef(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void Chef::work() const {
    std::cout << "Chef " << getName() << " is working." << std::endl;
}

void Chef::interface() const {
    ChefInterface chefInterface(getEmployeeID());
    // Implement Chef specific interface using chefInterface methods
}

void Chef::prepareMealQueue() const {
    MealQueue mealQueue("Dish Name", 1, 30); // Example dish with priority and time estimate
    mealQueue.displayQueue();
}

void Chef::OrderRecieval() const {
    // Actual implementation for receiving orders
}

void Chef::MealAlert() const {
    // Actual implementation for meal alerts
}

void Chef::prepareMealTimer() const {
    MealTimer mealTimer("Dish Name", 30); // Example dish with time required
    mealTimer.startTimer();
}

void Chef::InventoryUpdate() const {
    // Actual implementation for updating inventory
}
