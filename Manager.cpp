#include "Manager.hpp"

Manager::Manager(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void Manager::InventoryView() const {
    // Implementation
}

void Manager::InventoryEdit() const {
    // Implementation
}

void Manager::InventoryAlert() const {
    // Implementation
}

void Manager::MenuEdit() const {
    // Implementation
}

void Manager::MenuStats() const {
    // Implementation
}

void Manager::RevenueView() const {
    // Implementation
}

void Manager::work() const {
    std::cout << "Manager " << name << " is working." << std::endl;
}
