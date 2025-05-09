---
title: 28 - Basic inheritance
description: needs to be done
---

# Basic inheritance

Code reuse is probable one of the most powerful features of an object oriented programming language. While most programming languages provide functions / procedures which provide a low-level construct for code reuse, object oriented programming languages take this an important step further. OOP languages allow us to define classes and create relations between these classes, facilitating not only code reuse but also better overall design.

Inheritance is one of the main pillars of an object-oriented programming language and provides a clean way of reusing functionality. It allows a class to inherit both the attributes and methods of another class. Common data and functionality is structured inside a **base class** (also called **superclass** or **parent class**) from which the more specific classes inherit (called **derived classes**, or also called **subclasses** or **child classes**) properties and behavior.

::: warning Copy paste is not reuse
For all you copy-paste fanatics out there, copying code from one place to another is not considered code reuse. If the original code is ever extended, changed or corrected, chances are that you will forget to alter one of the copies.
:::

As with most in an OOP language, the solution revolves around the class. Instead of creating classes from scratch we can use existing ones and extend them or embed them within our classes. The main advantages of this approach is that:

* we reuse code that has been tested and debugged
* code is not duplicated
* classes can be kept small and thus more manageable

The trick is to use the classes without soiling the existing code. There are two ways to accomplish this and one has already been discussed in this course.

The first approach is to create and embed objects of the already existing class inside the class you are developing. This is called **composition** as the new class is composed of objects of existing classes.

The second approach is to create a new class as a derived type of an existing class. You literally take the form of an existing class and extend it, and this without modifying the code of existing class. This is called **inheritance**.

Both approaches are important cornerstones of an object oriented programming language.

## Computer store example

Consider a first example that is being build for an online computer web shop. A beginning developer has modeled some of the items that his client wants to sell online. However he has come to the conclusion that his design needs to be refactored. Below is a partial UML class diagram of the classes modeled without the use of inheritance. Each class has the full functionality implemented into the class itself.

![Computer store without inheritance](./img/computer_store_without_inheritance.png)

While they are not documented in the UML, the attributes can have getters and setters.

In a first iteration of the refactoring process, the most common attributes are extracted to a base class to have a cleaner design. A good name might be `Product`. Since it is a store that sells products, it seems a logical choice. When selecting attributes from the derived classes to be placed inside `Product`, we must ask our self the question if that attribute is a logical property of computer store product. If not, then something is wrong or our models are wrong.

![Computer store with inheritance](./img/computer_store_with_inheritance.png)

::: tip Inheritance in UML class diagram
In a UML class diagram inheritance is depicted using a solid line and a hollow arrow attached at the side of the base class.
:::

### Code always changes

Something to remember is that code evolves. It changes over time as things get added, removed or refactored. Static code will eventually become outdated and die. On top of that your boss, client, teacher, ... will never tell you the whole story. Once they get the first prototype, and they like it, there will always be a "would it be possible to add ..." moment. That is also why it is also more fun to program based on methodologies such as SCRUM and Agile as they take the fact of change into account.

So let us retake the computer store example: our developer needs help again as his client asked him to also add games to the list of products to sell. The overeager developer created a new class `Game` that inherits from the `Product` class. At first sight nothing seems wrong with it.

![Adding a Game class](./img/computer_store_with_game.png)

First of all it needs to be noted that adding a new product class was really easy as a lot of the functionality and properties are inherited from the `Product` class.

Now taking a closer look at the classes, something can be noticed. Does a game have a model or a brand? In real life: no. Then why does it have a model and brand in the application?

Actually the class `Product` is not entirely accurate since games came into play. While each computer hardware product does have a model and brand, software and games do not. Basically we need to add a class `Hardware` which inherits from the `Product` class. Then our hardware products can inherit from `Hardware` and implicitly also from `Product`, while `Game` directly inherits from `Product`.

![Adding a Hardware class](./img/computer_store_with_hardware.png)

## Introducing inheritance

Inheritance allows a class to inherit (get) the properties and methods of another class. In other words, the **derived classes** inherits the state and behavior from the **base class**. The derived classes can add their own additional attributes and methods. These additional attributes and methods differentiate the derived classes from the base class.

::: tip Inheritance = extension
Inheritance is also often described as a mechanism to **extend** the behavior and properties of the base class. This is just the reason why Java for example uses the *extends* keyword for inheritance.
:::

It is also possible to change the implementation of certain methods in the base class, which is also known as **method overriding**.

::: warning Method overloading vs. method overriding
Do not confuse method overloading with method overriding. Method overloading is a feature that allows a class to have two or more methods having same name, if their argument lists are different. Constructor overloading allows a class to have more than one constructors having different argument lists. Overloaded methods are differentiated by the number and the type of the arguments passed into the method. Method overriding replaces the implementation of a method of the base class.
:::

A base class can have any number of derived classes. While in C# (and Java), a derived class can have only one base class, in C++ it is possible to inherit from multiple base classes, known as **multiple inheritance** (however not always a good idea or good practice).

## Private, protected and public members

Attributes and methods are declared with an **access specifier** such as `private`, `protected` or `public`. These allow the developer to determine who can access the class, attributes or methods.

Very important to know is that a **derived class inherits all the members of its base class**, even the private ones. However it cannot access the **private members** (both attributes and methods) of its base class. For this reason getters and setters need to be provided for derived classes to have access to the attributes of their base class.

Another solution would be to make the attributes `protected`. This would allow derived classes to access the attributes directly, while still keeping them inaccessible for outside classes. This can be a good solution in some cases, but most of the time it is cleaner to use accessors (getters and setters).

Do note that you can also make methods protected, allowing derived classes to use them, but not outside classes.

Let's take another example: consider a class `SpaceObject` with a derived class `Planet`. Next to that is a class `Space` which is composed of several `SpaceObject`s and `Planet`s. As shown below, protected attributes and methods are noted using the `#` symbol in UML.

![A Space example using protected attributes](./img/protected_space_example.png)

In the example the `size` of a `SpaceObject` can only be accessed by `SpaceObject` itself, not even by the derived class `Planet`. However the `coordinates` are accessible by both `SpaceObject` and all of its derived classes (such as `Planet`). However not accessible from outside. `MAX_SIZE` is a `const` and `static` class variable which is made `public` and so accessible by all. However as it is `const` it can only be read and not written.

Below is an overview:

| Attribute of SpaceObject | Accessible by Planet? | Accessible by Space? |
|----|----|----|
|size|NO|NO|
|coordinates|YES|NO|
|MAX_SIZE|YES|YES|

The same rules apply for access specifiers of methods.

## Is-a relationships

The base class and derived class have an **"is-a"** relationship between them. Take the basic example of pets shown below.

![Pets](./img/pets.png)

Here we can for example state that a `Cat` is-a `Pet`, a `Bunny` is-a `Pet` and a `Dog` is-a `Pet`.

If you cannot logically state that 'derived class' is-a 'base class' than you made a mistake to make 'derived class' inherit from 'base class'. An example of this would be the case when you would create a derived class `Mosquito` from `Pet` because `Mosquito` also has color, favorite food and an age. This may seem DRY but it is illogical. You can't state that `Mosquito` is-a `Pet`.

## Inheritance in C++

To implement inheritance in C++ all you need is a base class and a derived class. The derived class needs to *extend* the base class and this can be accomplished by using the syntax shown below:

```cpp
class <derived class> : public <base class> {
  // Implementation
}
```

Note that extending the base class is exactly what we are doing when implementing inheritance. We take a general class and add something to it: data, behavior or both.

Depending on the context and strategy, inheritance can also be though of as **generalization**, where functionality of derived classes is extracted and placed inside a more generalized base class.

<!--
### Detailed Animal, Pet and Cat example

Cfr. example in the class: we are going to refactor [this code example](https://github.com/LudovicEspeel/course-object-oriented-programming-with-cpp-examples/tree/main/animals) and apply inheritance (and later also polymorphism).
-->

## Constructors and inheritance

<!-- Constructors are not inherited in C++. Should make this very clear somewhere -->

When creating objects, C++ will not only call the constructor of the type you are creating but it will implicitly call a constructor of each base class. Take a look at the inheritance hierarchy shown below.

![Inheritance hierarchy of computer hardware](./img/computer_hardware_inheritance.png)

When for example creating an object of type `QuadCore`, the constructor of `QuadCore` will implicitly call the constructor of `Processor` which will call the constructor of `ComputerHardware` which will call the constructor of `Product`. These calls are provided by default by C++ and are done before anything else. That means that the rest of you constructor code will be executed after the contructor call to the base class.

This basically means that if you create an instance of a `QuadCore`, the `Product` portion will be constructed first, next the `ComputerHardware` portion, after which the `Processor` portion and last the `QuadCore` portion. This is a bit logical as you can only initialize the specific data of `ComputerHardware` after the data of `Product` has been initialized.

There is however a catch to this whole constructing system.

Remember that if you do not define a constructor in C++, it will provide you with a **default constructor** (a constructor without arguments) for a class. However once you create a constructor yourself, C++ will not provide this default constructor anymore. That means if you create a single constructor that takes arguments, your class will not have a default constructor anymore. Since C++ will add an implicit call to the default constructor of the base class for each derived class, it will not find one and the compiler will turn up a compiler error. In other words if no default constructor exists for the base class your program will fail.

This can be fixed using two approaches:

* add a default constructor to the base class. This is however not always possible or even advisable as you may not have access to the implementation of the base class or it might not make sense to add a default constructor.
* explicitly call another constructor of the base class. This can be achieved by using the **constructor initialization list** to call a specific constructor of the base class.

The second approach mostly takes the preference.

An example of this for the both constructors of the `Tank` class would be:

```cpp
Tank::Tank(std::string description)
  : Vehicle(description) {

  // ....
}

Tank::Tank(std::string description, long id)
  : Vehicle(description, id) {

  // ....
}
```

Note how the name of the base class is used to call a base class constructor.

<!-- Here we should place the example with the call hierarchy when also applying composition. -->

Quick summarization

* C++ provides a default constructor if you provide no constructor(s).
* With inheritance each constructor is called from bottom to top but actually executed from top to bottom.
* If no default constructor exists for the base class you will need to add one or call another constructor explicitly using the constructor initialization list and provide the required arguments.

## Method overriding

Method overriding, in object oriented programming, is a language feature that allows a derived class or child class to provide a specific implementation of a method that is already provided by one of its base classes. The implementation in the derived class overrides (replaces) the implementation in the base class by providing a method that has the same name and the same parameters (a.k.a. **signature**), and same return type as the method in the base class. An overriding method can also return a derived type of the type returned by the overridden method. This derived type is called a covariant return type.

The version of a method that is executed will be determined by the object that is used to invoke it. If an object of a base class is used to invoke the method, then the version in the base class will be executed, but if an object of the derived class is used to invoke the method, then the version in the child class will be executed.

The ability of a derived class to override a method allows a class to inherit from a base class whose behavior is "close enough" and then to modify behavior as needed.

![Method overriding](./img/shapes_method_overriding.png)

The UML diagram above shows a couple of examples of method overriding. First of all there is the `draw()` method that is defined for the `Shape` class and its descendants. It takes no arguments and has no return value. Next there are the `getArea()` and `getCircumference()` methods which do return a `double`. Last is the `doesContain()` method which checks if the `Shape` contains a `Point`. It takes an argument and returns a value. Important to note is that the signature and return type of all these methods are the same!

The rules for method overriding can be summarized as follows:

* The argument list should be exactly the same as that of the overridden method.
* The return type should be the same or a derived type of the return type declared in the original overridden method in the base class.
* The access level cannot be more restrictive than the overridden method’s access level. For example: if the base class method is declared public then the overriding method in the derived class cannot be either private or protected.
* A derived class can only override methods declared public or protected.
* Constructors cannot be overridden.

You can call methods of the base class by using the name of the base class followed by **scope resolution operator** `::` followed by the name of the method you wish to call. This can be useful if you do not want to replace the implementation of the base class but rather want to extend it.

For example the `getString()` implementations of `Cat` can make use of the already existing implementation of the `getString()` method of `Pet` as follows:

```cpp
std::string Cat::getString(void) {
  std::stringstream ss;
  ss << Pet::getString();
  ss << " | He/she purrs when happy and loves to eat fish and meat.";
  return ss.str();
}
```

