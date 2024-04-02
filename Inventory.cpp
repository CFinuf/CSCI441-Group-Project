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

std::string Inventory::useIngredient(const std::string& ingredient, int quantity) {
    std::string output;
    
    if (ingredients.find(ingredient) != ingredients.end()) {
        if (ingredients[ingredient] >= quantity) {
            ingredients[ingredient] -= quantity;
            output = "Ingredient " + ingredient + " used successfully!";
        } else {
            output = "Insufficient quantity of " + ingredient + "!";
        }
    } else {
        output = "Ingredient " + ingredient + " not found!";
    }
    
    return output;
}

std::string Inventory::usePlate() {
    std::string output;
    
    if (plates > 0) {
        plates--;
        output = "Plate used successfully!";
    } else {
        output = "No more plates available!";
    }
    
    return output;
}

std::string Inventory::useUtensils(int quantity) {
    std::string output;
    
    if (spoons >= quantity && forks >= quantity && knives >= quantity) {
        spoons -= quantity;
        forks -= quantity;
        knives -= quantity;
        output = "Utensils used successfully!";
    } else {
        output = "Insufficient utensils available!";
    }
    
    return output;
}

std::string Inventory::checkLowStock() {
    std::string output = "Checking low stock...\n";
    
    for (const auto& pair : ingredients) {
        if (pair.second < startingPlates / 5) {
            output += "Low stock warning: " + pair.first + " is running low!\n";
        }
    }
    
    if (plates < startingPlates / 5) {
        output += "Low stock warning: Plates are running low!\n";
    }
    
    if (spoons < startingSpoons / 5) {
        output += "Low stock warning: Spoons are running low!\n";
    }
    
    if (forks < startingForks / 5) {
        output += "Low stock warning: Forks are running low!\n";
    }
    
    if (knives < startingKnives / 5) {
        output += "Low stock warning: Knives are running low!\n";
    }
    
    return output;
}


std::string Inventory::checkDepleted() {
    std::string outputString = "Checking for depletion...\n";

    for (const auto& pair : ingredients) {
        if (pair.second == 0) {
            outputString += "Depletion warning: " + pair.first + " is depleted!\n";
        }
    }

    if (plates == 0) {
        outputString += "Depletion warning: Plates are depleted!\n";
    }
    if (spoons == 0) {
        outputString += "Depletion warning: Spoons are depleted!\n";
    }
    if (forks == 0) {
        outputString += "Depletion warning: Forks are depleted!\n";
    }
    if (knives == 0) {
        outputString += "Depletion warning: Knives are depleted!\n";
    }

    return outputString;
}

