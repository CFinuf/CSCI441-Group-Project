#ifndef BURGER_HPP
#define BURGER_HPP

#include "Entree.hpp"

class Burger : public Entree {
public:
    Burger();
    virtual ~Burger();
    void work() const override; // Pure virtual function
    void interface() const override; // Interface
};

#endif /* BURGER_HPP */