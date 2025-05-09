---
title: 30 - Abstract classes and interfaces
description: needs to be done
---

# Abstract classes and interfaces

* **Abstract classes** cannot be used to instantiate objects.
* Abstract base classes are too general to create real objects: they specify only what is common among derived classes (it's a kind of foodprint).
* Classes that can be used to instantiate objects are called **concrete classes**.
* Concrete classes provide the specifics that make it reasonable to instantiate objects.
<br>
<br>
* An abstract class contains one or more abstract methods. **Abstract methods do not provide implementations.** 
Concrete derived classes **must** provide the implementations (not needed to do it in the directly derived class, can also be done in a indirectly derived class).
    * If the directly derived class doesn't contain the implementation in C++, then this class is also considered as an abstract class. So you can't instantiate objects of this class too.

* An abstract class declares common attributes and behaviors of the various classes that inherit from it, either directly or indirectly, in a class hierarchy.
    * An abstract class typically contains one or more abstract methods that concrete derived classes must override. The instance variables and concrete methods of an abstract class are subject to the normal rules of inheritance.

* We can use abstract base classes to declare variables that can hold references to objects of any concrete classes derived from those abstract classes.
    * You can use such variables to manipulate derived-class objects polymorphically.

* You'll get compilation errors when:
    * Attempting to instantiate an object of an abstract class.
    * Forgetting to implement a base class's abstract method in a derived class unless the derived class is also abstract.

## Format

Unlike C# and Java, we don't have the keywords `abstract` (and `interface`), but it's possible by applying these steps:
* Declare one or more methods as a "pure virtual" methods.
* Initialize the virtual method to zero (it has nothing to do with its return type!).
* The directly or indirectly derived class must override this method.

```cpp
virtual string getSound() const = 0;
```

## Abstract class vs. interface

* If a class has at least one abstract method (in C++ "pure virtual" method), then it can be considered as an **abstract class**. 
* If all methods are "pure virtual" and the constructors/destructors are removed, then it can be considered as an **interface**.

## Code example

Class *Animal* is here an abstract base class containing an abstract method:

```cpp
// Animal.h:
class Animal
{
    public:
        // Constructors, destructor, methods, getters and setters
        // ...
        virtual string getSound() const = 0; // Pure virtual method, must be overridden!
        virtual string getString() const; // Normal virtual method, can be overridden!
    private:
        // ...
};
```

```cpp
// Animal.cpp:
#include "Animal.h"

// Constructors, destructor, methods, getters and setters
// ...

// No implementation for method getSound()!

string Animal::getString() const
{
    // Implementation
    // ...
}
```

```cpp
// Pet.h:
#include "Animal.h"

class Pet : public Animal
{
    public:
        // Constructors, destructor, methods, getters and setters
        // ...
        virtual string getSound() const override;
        virtual string getString() const override;  
    private:
        // ...
};
```

```cpp
// Pet.cpp:
string Pet::getSound() const
{
    // Implementation (mandatory in the deepest derived class!)
}

string Pet::getString() const
{
    // Override getString() of base class (not mandatory)
}
```

```cpp
Animal *animal = new Animal(...); // No longer possible (the same for a stack object), class contains at least 1 abstract method!

Animal *pet = new Pet(...); // Is possible
pet->getSound(); // (*)

Animal *animals[] = { pet }; // Is also possible
pet[0]->getSound(); // (*)
```

(*) At-compile time: *getSound()* of *Animal* will be probably executed although it's declared as abstract. In reality at-runtime, *getSound()* of *Pet* is executed.