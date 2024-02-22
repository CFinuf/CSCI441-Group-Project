#include "BusboyBusgirl.hpp"

BusboyBusgirl::BusboyBusgirl(const std::string& name, int employeeID) : Employee(name, employeeID) {}

void BusboyBusgirl::TableAlert() const {
    // Implementation
}

void BusboyBusgirl::work() const {
    std::cout << "Busboy/Busgirl " << name << " is working." << std::endl;
}
