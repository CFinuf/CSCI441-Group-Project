#ifndef BUSBOYBUSGIRL_HPP
#define BUSBOYBUSGIRL_HPP

#include "Employee.hpp"

class BusboyBusgirl : public Employee {
public:
    BusboyBusgirl(const std::string& name, int employeeID);
    void work() const override;
    void interface() const override;
    void TableAlert() const;
};

#endif /* BUSBOYBUSGIRL_HPP */
