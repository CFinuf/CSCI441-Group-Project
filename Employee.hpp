#ifndef EMPLOYEE_HPP
#define EMPLOYEE_HPP

#include <iostream>
#include <string>

class Employee {
protected:
    std::string name;
    int employeeID;
public:
    Employee(const std::string& name, int employeeID);
    virtual ~Employee();
    virtual void work() const = 0; // Pure virtual function, making Employee an abstract class
    virtual void interface() const = 0; // Interface for specific employee types
    std::string getName() const; // Getter for name
    int getEmployeeID() const; // Getter for employeeID
};

#endif /* EMPLOYEE_HPP */
