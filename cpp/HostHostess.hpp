#ifndef HOSTHOSTESS_HPP
#define HOSTHOSTESS_HPP

#include "Employee.hpp"

class HostHostess : public Employee {
public:
    HostHostess(const std::string& name, int employeeID);
    void work() const override;
    void interface() const override;
    void TableView() const;
    void CustomerDuration() const;
    void CustomerQueue() const;
};

#endif /* HOSTHOSTESS_HPP */
