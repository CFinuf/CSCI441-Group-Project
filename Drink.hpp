#ifndef DRINK_HPP
#define DRINK_HPP

#include "Drink.hpp"
#include <iostream>
#include <string>

class Drink {
protected:
    std::string drinkName;
public:
    Drink(const std::string& drinkName);
    virtual ~Drink();
    virtual void work() const = 0; // Pure virtual function
    virtual void interface() const = 0; // Interface
    // setter?
    std::string getName() const; // Getter for name
};

#endif /* DRINK_HPP */