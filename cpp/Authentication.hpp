#ifndef AUTHENTICATION_HPP
#define AUTHENTICATION_HPP

#include <iostream>

class Authentication {
public:
    Authentication();
    bool MatchID(int inputID) const;
};

#endif /* AUTHENTICATION_HPP */
