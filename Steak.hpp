#ifndef STEAK_HPP
#define STEAK_HPP

#include "Entree.hpp"

class Steak : public Entree {
public:
    Steak();
    virtual ~Steak();
    void work() const override; // Pure virtual function
    void interface() const override; // Interface
};

#endif /* STEAK_HPP */