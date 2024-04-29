#include <iostream>
#include <string> // Include the necessary header file for std::string
#include "mealQueue.hpp" // Include the mealQueue.hpp header file

class mealQueue {
public:
    mealQueue(std::string dish, int priority, int time) : dish(dish), priority(priority), time(time) {} // Initialize the time variable correctly

    void displayQueue() {
        std::cout << "Dish: " << dish << " | Priority: " << priority << " | Time remaining: " << time << " minutes" << std::endl;
    }

private:
    std::string dish;
    int priority;
    int time;
}; // Add a closing brace for the class definition
