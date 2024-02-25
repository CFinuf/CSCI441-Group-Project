#ifndef WAITERWAITRESS_HPP
#define WAITERWAITRESS_HPP

#include "Employee.hpp"

class WaiterWaitress : public Employee {
public:
    WaiterWaitress(const std::string& name, int employeeID);
    void work() const override;
    void interface() const override;
    void MenuView() const;
    void SetOrders() const;
    void CheckTables() const;
};

#endif /* WAITERWAITRESS_HPP */
