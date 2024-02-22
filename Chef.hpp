#ifndef CHEF_HPP
#define CHEF_HPP

#include "Employee.hpp"

class Chef : public Employee {
public:
    Chef(const std::string& name, int employeeID);
    void MealQueue() const;
    void OrderRecieval() const;
    void MealAlert() const;
    void MealTimer() const;
    void InventoryUpdate() const;
    void work() const override;
};

#endif /* CHEF_HPP */
