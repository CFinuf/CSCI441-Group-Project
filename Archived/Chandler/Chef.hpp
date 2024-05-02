//Written by: Chandler Finuf
//Tested by:
//Debugged by: Chandler Finuf, 
#ifndef CHEF_HPP
#define CHEF_HPP

#include "Employee.hpp"

class Chef : public Employee {
public:
    Chef(const std::string& name, int employeeID);
    void work() const override;
    void interface() const override;
    void prepareMealQueue() const;
    void OrderRecieval() const;
    void MealAlert() const;
    void prepareMealTimer() const;
    void InventoryUpdate() const;
    void InventoryCheck() const;
};

#endif /* CHEF_HPP */
