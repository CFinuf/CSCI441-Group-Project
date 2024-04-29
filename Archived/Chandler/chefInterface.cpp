// ChefInterface.cpp

#include "ChefInterface.hpp"

ChefInterface::ChefInterface(int empID) {
    employeeID = empID;
}

void ChefInterface::displayQueue() {
    // Implementation to display the order queue
    std::cout << "Displaying order queue" << std::endl;
}

void ChefInterface::startOrder(int tableNumber) {
    // Implementation to start processing an order for a specific table
    std::cout << "Starting order for table " << tableNumber << std::endl;
}

void ChefInterface::completeOrder(int tableNumber) {
    // Implementation to mark an order as completed for a specific table
    std::cout << "Completing order for table " << tableNumber << std::endl;
}
