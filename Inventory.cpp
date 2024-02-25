#include "Inventory.hpp"

Inventory::Inventory() : plates(100), spoons(50), forks(50), knives(50), startingPlates(100), startingSpoons(50), startingForks(50), startingKnives(50) {
    // Initialize ingredients with default quantities
    ingredients["flour"] = 1000; 
    ingredients["sugar"] = 500; 
    ingredients["salt"] = 300; 
    ingredients["pepper"] = 200; 
    ingredients["oil"] = 1000; 
    ingredients["butter"] = 500; 
    ingredients["eggs"] = 100; 
    ingredients["milk"] = 1000; 
    ingredients["cheese"] = 300; 
}

void Inventory::addIngredient(const std::string& ingredient, int quantity) {
    ingredients[ingredient] += quantity;
}

void Inventory::useIngredient(const std::string& ingredient, int quantity) {
    if (ingredients.find(ingredient) != ingredients.end()) {
        if (ingredients[ingredient] >= quantity) {
            ingredients[ingredient] -= quantity;
        } else {
            std::cout << "Insufficient quantity of " << ingredient << "!" << std::endl;
        }
    } else {
        std::cout << "Ingredient " << ingredient << " not found!" << std::endl;
    }
}

void Inventory::usePlate() {
    if (plates > 0) {
        plates--;
    } else {
        std::cout << "No more plates available!" << std::endl;
    }
}

void Inventory::useUtensils(int quantity) {
    if (spoons >= quantity && forks >= quantity && knives >= quantity) {
        spoons -= quantity;
        forks -= quantity;
        knives -= quantity;
    } else {
        std::cout << "Insufficient utensils available!" << std::endl;
    }
}

void Inventory::checkLowStock() const {
    std::cout << "Checking low stock..." << std::endl;
    for (const auto& pair : ingredients) {
        if (pair.second < startingPlates / 5) {
            std::cout << "Low stock warning: " << pair.first << " is running low!" << std::endl;
        }
    }
    if (plates < startingPlates / 5) {
        std::cout << "Low stock warning: Plates are running low!" << std::endl;
    }
    if (spoons < startingSpoons / 5) {
        std::cout << "Low stock warning: Spoons are running low!" << std::endl;
    }
    if (forks < startingForks / 5) {
        std::cout << "Low stock warning: Forks are running low!" << std::endl;
    }
    if (knives < startingKnives / 5) {
        std::cout << "Low stock warning: Knives are running low!" << std::endl;
    }
}

void Inventory::checkDepleted() const {
    std::cout << "Checking for depletion..." << std::endl;
    for (const auto& pair : ingredients) {
        if (pair.second == 0) {
            std::cout << "Depletion warning: " << pair.first << " is depleted!" << std::endl;
        }
    }
    if (plates == 0) {
        std::cout << "Depletion warning: Plates are depleted!" << std::endl;
    }
    if (spoons == 0) {
        std::cout << "Depletion warning: Spoons are depleted!" << std::endl;
    }
    if (forks == 0) {
        std::cout << "Depletion warning: Forks are depleted!" << std::endl;
    }
    if (knives == 0) {
        std::cout << "Depletion warning: Knives are depleted!" << std::endl;
    }
}
