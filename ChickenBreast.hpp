#ifndef CHICKENBREAST_HPP
#define CHICKENBREAST_HPP

#include "Entree.hpp"

class ChickenBreast : public Entree {
public:
    ChickenBreast();
    virtual ~ChickenBreast();
    void work() const override; // Pure virtual function
    void interface() const override; // Interface
};

#endif /* CHICKENBREAST_HPP */