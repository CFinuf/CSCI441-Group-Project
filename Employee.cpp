#include "Employee.hpp"

Employee::Employee(const std::string& name, int employeeID) : name(name), employeeID(employeeID) {}

Employee::~Employee() {}

std::string Employee::getName() const {
    return name;
}

int Employee::getEmployeeID() const {
    return employeeID;
}
