#include "BusboyBusgirl.hpp"

BusboyBusgirl::BusboyBusgirl(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void BusboyBusgirl::work() const {
    std::cout << "Busboy/Busgirl " << name << " is working." << std::endl;
}

void BusboyBusgirl::interface() const {
    // Busboy/Busgirl specific interface
}

void BusboyBusgirl::TableAlert() const {
    // Implementation
}
