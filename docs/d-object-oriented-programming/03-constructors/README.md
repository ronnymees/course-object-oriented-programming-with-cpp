---
title: 26 - Constructors
description: needs to be done
---

# Constructors

The attributes in the `Point` example class have already been initialized to a default value of 0. However when creating a `Point` object it would be much cleaner if it could be initialized on creation with the correct coordinates.

This is where constructors come into play. Constructors are

* methods that carry the **exact same name as the class**
* have **no return type**

The main purpose of a constructor is to **initialize new objects and put them in a valid state, ready for first use**.

Let's create a basic constructor for the `Point` class that initializes the coordinates to the user supplied values. First a prototype needs to be added to the class definition.

```cpp
// Point.h
#pragma once

namespace Geometry {

  class Point {

    // Constructors
    public:
      Point(double x, double y);

    // Methods
    public:
      void moveTo(double x, double y);
      void moveBy(double deltaX, double deltaY);

    public:
      double getX(void) const;
      double getY(void) const;

    // Attributes (instance variables)
    private:
      double x = 0;
      double y = 0;

  };

};
```

The constructor here takes two arguments, namely the x and y coordinates. While it is not mandatory to split up the constructors and methods, it often creates a clearer image for the user of the class.

The implementation of the constructor can actually use the `moveTo()` method to implement it behavior. That's DRY!

```cpp
// point.cpp
#include "Point.h"

namespace Geometry {

  Point::Point(double x, double y) {
    moveTo(x, y);
  }

  void Point::moveTo(double x, double y) {
    this->x = x;
    this->y = y;
  }
  
  void Point::moveBy(double deltaX, double deltaY) {
    this->x += deltaX;
    this->y += deltaY;
  }

  double Point::getX(void) const {
    return x;
  }

  double Point::getY(void) const {
    return y;
  }

};
```

Now when creating `Point` objects, the coordinates can be set via the constructor when the object is instanciated.

```cpp
#include <iostream>
#include "Point.h"

using namespace std;

int main() {
  cout << "Point demo" << endl;

  Geometry::Point center(8, 77);

  cout << "The point is at ["
    << center.getX() << ", " << center.getY()
    << "]" << endl;

  return 0;
}
```

::: codeoutput
Point demo
The point is at [8, 77]
:::

## Default constructors

There is one thing missing from this implementation and that is a default constructor.

Just as in C# and Java, C++ generates a **default constructor (one without arguments)** for you if you do not define any constructor yourself. At the moment you define a constructor inside the class, even if not a default constructor, you lose this functionality from the compiler.

This means that before we created the constructor with the coordinates, the C++ compiler generated a constructor for us, which we lost when we added our own constructor.

This basically means that the original instantiation of a `Point` object will fail:

```cpp
Point origin;        // Fails, no default constructor
```

Luckily in C++, a class can have more than one constructor, as long as each has a different list of arguments. This concept is known as **constructor overloading** and is quite similar to method/function overloading.

* Overloaded constructors essentially have the same name (name of the class) and different number of arguments.
* A constructor is called depending upon the number and type of arguments passed.
* While creating the object, arguments must be passed to let compiler know, which constructor needs to be called.

So to add a default constructor to the `Point` class we first need to declare it in the class:

```cpp
// Point.h
#pragma once

namespace Geometry {

  class Point {

    // Constructors
    public:
      Point(void);    // Default constructor
      Point(double x, double y);

    // Methods
    public:
      void moveTo(double x, double y);
      void moveBy(double deltaX, double deltaY);

    public:
      double getX(void) const;
      double getY(void) const;

    // Attributes (instance variables)
    private:
      double x = 0;
      double y = 0;

  };

};
```

The implementation of the default constructor can actually be left empty because the attributes are already being initialized to zero. It can however be argued that it's cleaner to call the `moveTo()` method using two zero values.

```cpp
// point.cpp
#include "Point.h"

namespace Geometry {

  Point::Point(void) { }

  Point::Point(double x, double y) {
    moveTo(x, y);
  }

  void Point::moveTo(double x, double y) {
    this->x = x;
    this->y = y;
  }
  
  void Point::moveBy(double deltaX, double deltaY) {
    this->x += deltaX;
    this->y += deltaY;
  }

  double Point::getX(void) const {
    return x;
  }

  double Point::getY(void) const {
    return y;
  }

};
```

Now both constructors can be used to create objects of the class `Point`:

```cpp
Point center(12, 145);      // Init constructor
Point origin;               // Default constructor
```

::: warning Default Constructor Parentheses
Don't place parenthes `()` after the object name when creating an instance using the default constructor. This will throw off the C++ compiler and make it think you are declaring a function `origin()` that returns an object of type `Point`. Welcome to the world of C++ :).
:::

<!-- ## TODO -->

<!-- Should we introduce constructor initialization list here or how to call other constructors? -->
<!-- Copy constructor -->

## Exercise

Try to solve the exercise yourself. Don't go copy pasting other people's solution.

### 1. Die Throwing

Create a `Die` class for a `6` sided die. Implement a `roll()` method that returns a random number between `1` and `6`.

Create a small demo app that demonstrates the usage of the class `Die`. Roll the die a couple of times using a `for` construct.

Now refactor the `Die` class so the `6` limit is not a magic number anymore. Make sure it can be passed via the `Die` constructor of the class. This way you should be able to create a 6-sided die or a 20-sided die.