//Written by: Chandler Finuf
//Tested by:
//Debugged by: Chandler Finuf, 
// ChefInterface.hpp

#ifndef CHEFINTERFACE_HPP
#define CHEFINTERFACE_HPP

#include <iostream>
#include <string>

class ChefInterface {
private:
    int employeeID;

public:
    ChefInterface(int empID);
    void displayQueue();
    void startOrder(int tableNumber);
    void completeOrder(int tableNumber);
};

#endif