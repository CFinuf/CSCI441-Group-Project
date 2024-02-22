#ifndef HOSTHOSTESS_HPP
#define HOSTHOSTESS_HPP

#include "Employee.hpp"

class HostHostess : public Employee {
public:
    HostHostess(const std::string& name, int employeeID);
    void TableView() const;
    void CustomerDuration() const;
    void CustomerQueue() const;
    void work() const override;
};

#endif /* HOSTHOSTESS_HPP */
