#ifndef MANAGER_HPP
#define MANAGER_HPP

#include "Employee.hpp"

class Manager : public Employee {
public:
    Manager(const std::string& name, int employeeID);
    void InventoryView() const;
    void InventoryEdit() const;
    void InventoryAlert() const;
    void MenuEdit() const;
    void MenuStats() const;
    void RevenueView() const;
    void work() const override;
};

#endif /* MANAGER_HPP */
