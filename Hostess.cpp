#include "Hostess.hpp"

HostHostess::HostHostess(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void HostHostess::TableView() const {
    // Implementation
}

void HostHostess::CustomerDuration() const {
    // Implementation
}

void HostHostess::CustomerQueue() const {
    // Implementation
}

void HostHostess::work() const {
    std::cout << "Host/Hostess " << name << " is working." << std::endl;
}
