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
    std::string useIngredient(const std::string& ingredient, int quantity);
    std::string usePlate();
    std::string useUtensils(int quantity);
    std::string checkLowStock();
    std::string checkDepleted();
    std::string listIngredients();
    std::string listInventory();

};

#endif /* INVENTORY_HPP */
