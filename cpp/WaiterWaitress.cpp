#include "WaiterWaitress.hpp"

WaiterWaitress::WaiterWaitress(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void WaiterWaitress::work() const {
    std::cout << "Waiter/Waitress " << name << " is working." << std::endl;
}

void WaiterWaitress::interface() const {
    // Waiter/Waitress specific interface
}

void WaiterWaitress::MenuView() const {
    // Implementation
}

void WaiterWaitress::SetOrders() const {
    // Implementation
}

void WaiterWaitress::CheckTables() const {
    // Implementation
}
