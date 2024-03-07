#ifndef FRIES_HPP
#define FRIES_HPP

#include "Fries.hpp"
#include <iostream>
#include <string>

class Fries {
public:
    Fries();
    virtual ~Fries();
    virtual void work() const = 0; // Pure virtual function
    virtual void interface() const = 0; // Interface
};

#endif /* FRIES_HPP */