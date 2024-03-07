#include "Entree.hpp"

Entree::Entree(const std::string& cook) : cook(cook) {}

Entree::~Entree() {}

std::string Entree::getCook() const {
    return cook;
}