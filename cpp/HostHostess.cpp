#include "HostHostess.hpp"

HostHostess::HostHostess(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void HostHostess::work() const {
    std::cout << "Host/Hostess " << name << " is working." << std::endl;
}

void HostHostess::interface() const {
    // Host/Hostess specific interface
}

void HostHostess::TableView() const {
    // Implementation
}

void HostHostess::CustomerDuration() const {
    // Implementation
}

void HostHostess::CustomerQueue() const {
    // Implementation
}
