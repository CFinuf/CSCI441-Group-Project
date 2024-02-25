#ifndef INVENTORY_HPP
#define INVENTORY_HPP

#include <iostream>
#include <map>
#include <string>

class Inventory {
private:
    std::map<std::string, int> ingredients;
    int plates;
    int spoons;
    int forks;
    int knives;
    int startingPlates;
    int startingSpoons;
    int startingForks;
    int startingKnives;
public:
    Inventory();
    void addIngredient(const std::string& ingredient, int quantity);
    void useIngredient(const std::string& ingredient, int quantity);
    void usePlate();
    void useUtensils(int quantity);
    void checkLowStock() const;
    void checkDepleted() const;
};

#endif /* INVENTORY_HPP */
