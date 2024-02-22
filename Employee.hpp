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
};

#endif /* EMPLOYEE_HPP */
