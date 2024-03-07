#ifndef ENTREE_HPP
#define ENTREE_HPP

#include <iostream>
#include <string>

class Entree {
protected:
    std::string cook;
public:
    Entree(const std::string& name);
    virtual ~Entree();
    virtual void work() const = 0; // Pure virtual function, making Food an abstract class
    virtual void interface() const = 0; // Interface for specific food types
    // no idea if interface is needed or not for selecting the cook (rare)
    // or if you want a setCook() method
    std::string getCook() const; // Getter for cook
};

#endif /* ENTREE_HPP */
