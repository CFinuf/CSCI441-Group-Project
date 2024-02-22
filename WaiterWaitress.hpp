#ifndef WAITERWAITRESS_HPP
#define WAITERWAITRESS_HPP

#include "Employee.hpp"

class WaiterWaitress : public Employee {
public:
    WaiterWaitress(const std::string& name, int employeeID);
    void MenuView() const;
    void SetOrders() const;
    void CheckTables() const;
    void work() const override;
};

#endif /* WAITERWAITRESS_HPP */
