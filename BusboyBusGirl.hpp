#ifndef BUSBOYBUSGIRL_HPP
#define BUSBOYBUSGIRL_HPP

#include "Employee.hpp"

class BusboyBusgirl : public Employee {
public:
    BusboyBusgirl(const std::string& name, int employeeID);
    void TableAlert() const;
    void work() const override;
};

#endif /* BUSBOYBUSGIRL_HPP */
