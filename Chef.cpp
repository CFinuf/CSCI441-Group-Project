#include "Chef.hpp"

Chef::Chef(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void Chef::MealQueue() const {
    // Implementation
}

void Chef::OrderRecieval() const {
    // Implementation
}

void Chef::MealAlert() const {
    // Implementation
}

void Chef::MealTimer() const {
    // Implementation
}

void Chef::InventoryUpdate() const {
    // Implementation
}

void Chef::work() const {
    std::cout << "Chef " << name << " is working." << std::endl;
}
