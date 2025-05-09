---
description: needs to be done
---

# Operator overloading

> 🌐 Supporting learning material
>
> Tutorialspoint: [Input/Output Operators Overloading in C++](https://www.tutorialspoint.com/cplusplus/input_output_operators_overloading.htm)

Why operator overloading?
* To use traditional operators with user-defined objects instead of using a function call on an object and passing another object to it.
E.g.
    * Classic manner: *object3 = object1.**add**(object2)*
    * With operator overloading: *object3 = object1 **+** object2*
* Is straightforward and natural way to extend C++ (or other programming languages), but it requires great care:
    * When overloading is misused, the code is difficult to understand!
* Use operator overloading to improve readability:
    * But avoid excessive or inconsistent usage!

## Format

* Write the function definition as normal.
* The function name is the **keyword ***operator*** followed by the symbol** for the operator being overloaded.
E.g. *classtype1 operator+(classtype1, classtype1)*

* **operator+** would be used to overload the addition operator (+).
* The **two operands** are given in the parameter list:
    * It is as if you define a function *+(7, 3)* that can be called by the syntax: *7 + 3;*
    * And it returns an integer (by reference in this case) to the result.

## Default overloaded operators

* Assignment operator (=)
    * Memberwise assignment: object1 = object2
* Address-operator (&)
    * Place of the object within memory.
* Comma operator (,)
    * Chaining: Time t1, t2, t3;

## Overloading and restrictions 

Most of C++'s operators can be overloaded like:
```
+   -   *   /   %   ^   &   |
~	!	=	<	>	+=	-=  *=  
/=	%=	^=	&=	|=	<<	>>	>>=
<<=	==	!=	<=	>=	&&	||	++
--	->*	,	->	[]	()	

new		delete		new[]		delete[]
```

Operators that cannot be overloaded:
```
.   .*  ::  ?:
```

The number of operands cannot be changed:
* Unary operators (~) remain unary and binary operators remain binary.
* Operators &, *, + and - each have unary and binary versions:
    * Unary and binary versions must be overloaded separately.
* No new operators can be created.
    * Use only the existing operators.
* Overloading is not for built-in types:
    * You cannot change how two integers are added.

## Overloading options

In C++, there are 3 options to apply overloading:
1. Overloading with a normal function
1. Overloading with a member function
1. Overloading with a friend function

This will be discussed here below.

### 1. Overloading with a normal function

The operator overload function is not part of the class, so it's declared outside the class definition:

```cpp
// BankAccount.h
class BankAccount
{
    public:
        BankAccount();
        BankAccount(int balance);
    private:
        int balance;
};

BankAccount operator+(const BankAccount &bankAccount1, const BankAccount &bankAccount2); 
```
```cpp
// BankAccount.cpp
BankAccount operator+(const BankAccount &bankAccount1, const BankAccount &bankAccount2)
{
    int sum = 0;
    sum = bankAccount1.balance + bankAccount2.balance; // (*)
    return BankAccount(sum);
}
```
```cpp
int main()
{
    BankAccount bankAccount1, bankAccount2, bankAccount3, bankAccount4, bankAccount5;
    bankAccount3 = bankAccount1 + bankAccount2;
    bankAccount4 = bankAccount1 + 3;
    bankAccount5 = 3 + bankAccount1;
}
```
**(*) Problem:**
this line will generate a compile error: you can't access directly the private data of the objects because the function is not part of the class!
How to solve?
* Provide and use public getters to indirectly access the data.
* Choose another overloading option.

### 2. Overloading with a member function

The operator overload function is part of the class, so we can directly access the private data of the objects.

```cpp
// BankAccount.h
class BankAccount
{
    public:
        BankAccount();
        BankAccount(int balance);
        BankAccount operator+(const BankAccount &bankAccount);
    private:
        int balance;
};
```
Here we should add `BankAccount::` before `operator` because this function is part of the class.
```cpp
// BankAccount.cpp
BankAccount BankAccount::operator+(const BankAccount &bankAccount)
{
    int sum = 0;
    sum = this->balance + bankAccount.balance;
    return BankAccount(sum);
}
```

```cpp
int main()
{
    BankAccount bankAccount1, bankAccount2, bankAccount3, bankAccount4, bankAccount5;
    bankAccount3 = bankAccount1 + bankAccount2; 
    bankAccount4 = bankAccount1 + 3;
    bankAccount5 = 3 + bankAccount2; // (*)
}
```
**(*) Problem:**
this line will generate a compile error: the left operand is an integer which is a builtin type.
How to solve?
* No solution unless you choose another overloading option. 

### 3. Overloading with a friend function 

This options solves the problems in option 1 and 2. But what are friend functions?

Friend functions can access private and protected members of another class, but are not member functions of the class.

Let's take next example where `setX` is declared as friend function. Note that the friend function is still declared within the class with keyword ***friend***, but doesn't make part of the private, public and protected members!

```cpp
// Count.h
class Count
{
    friend void setX(Count &c, int val);
    public:
        Count();
        void print() const;
    private:
        int x;
};
```

Remark: function `setX` must **not** be prepended by `Count::`

```cpp
// Count.cpp
Count::Count() : x(0) {}

void Count::print() const
{
    cout << x << endl;
}

void setX(Count &c, int val)
{
    c.x = val;
}
```
```cpp
int main()
{
    Count counter;
    cout << "counter.x after instantiation: ";
    counter.print();
    setX(counter, 8);
    cout << "counter.x after call to setX friend function: ";
    counter.print();
}
```
::: codeoutput
<pre>
counter.x after instantiation: 0
counter.x after call to setX friend function: 8
</pre>
:::

In fact, try to avoid using friend functions as much as possible because this is not using OOP properly.

But in some situations like operator overloading here below, they can be particularly useful to solve the problems in option 1 and 2:

```cpp
// BankAccount.h
class BankAccount
{
    friend BankAccount operator+(const BankAccount &bankAccount1, const BankAccount &bankAccount2);
    public:
        BankAccount();
        BankAccount(int balance);
    private:
        int balance;
};
```

```cpp
// BankAccount.cpp
BankAccount operator+(const BankAccount &bankAccount1, const BankAccount &bankAccount2)
{
    int sum = 0;
    sum = bankAccount1.balance + bankAccount2.balance;
    return BankAccount(sum);
}
```

```cpp
int main()
{
    BankAccount bankAccount1, bankAccount2, bankAccount3, bankAccount4, bankAccount5;
    bankAccount3 = bankAccount1 + bankAccount2; 
    bankAccount4 = bankAccount1 + 3;
    bankAccount5 = 3 + bankAccount2;
}
```

## The << and >> operator in C++

* The << and >> operators are originally binary operators used for shifting.
* However, when you use `cout << "Some text";` or `cin >> variable;` in C++, these operators serve a different purpose and are called **stream operators**. C++ achieves this through operator overloading.
    * The first operand is the predefined object cout/cin (of type ostream)
    * The second operand is the string "some text".

