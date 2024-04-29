// MealTimer.cpp

#include "MealTimer.hpp"

MealTimer::MealTimer(const std::string& dishName, int timeRequired) : dish(dishName), time(timeRequired) {
    // Constructor implementation
}

void MealTimer::startTimer() {
    // Implementation of the startTimer function
    std::cout << "Timer started for dish: " << dish << " for " << time << " minutes." << std::endl;
}
