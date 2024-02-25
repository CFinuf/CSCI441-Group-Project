#ifndef CHEF_HPP
#define CHEF_HPP

#include "Employee.hpp"

class Chef : public Employee {
public:
    Chef(const std::string& name, int employeeID);
    void work() const override;
    void interface() const override;
    void MealQueue() const;
    void OrderRecieval() const;
    void MealAlert() const;
    void MealTimer() const;
    void InventoryUpdate() const;
};

#endif /* CHEF_HPP */
