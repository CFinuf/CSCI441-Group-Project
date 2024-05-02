//Written by: Chandler Finuf
//Tested by:
//Debugged by: Chandler Finuf, 
// MealTimer.hpp

#ifndef MEALTIMER_HPP
#define MEALTIMER_HPP

#include <iostream>
#include <string>

class MealTimer {
private:
    std::string dish;
    int time;

public:
    MealTimer(const std::string& dishName, int timeRequired) : dish(dishName), time(timeRequired) {} // Definition of the constructor
    void startTimer();
};

#endif
