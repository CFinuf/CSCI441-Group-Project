// MealQueue.hpp

#ifndef MEALQUEUE_HPP
#define MEALQUEUE_HPP

#include <iostream>
#include <string>

class MealQueue {
private:
    std::string dish;
    int priority;
    int time;

public:
    MealQueue(const std::string& dishName, int dishPriority, int timeEstimate);
    void displayQueue();
};

#endif
