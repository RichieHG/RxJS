# RxJS
Repository to practice RxJS concepts


## Introduction
ReactiveX is a combination of Observer and Iterator pattern and also functional programming.

## Observables
* Are push based
* Are cold (by default), they won't do anything until there is an subscribrer
* Can emmir multiple values
* Can deliver values both synchronous and asynchronous
* Can be cancelled

### Source to produce Observables
* event
* request
* timer
* static data
* Combination of other observables sources

## Creation Operators
Manage the creation of streams from common sources:
* fromEvent
* of
* from
* interval
* timer

## 'Pipeable' Operators
We can split the RxJS operators in three categories *Filtering*, *Transformation* and *Combination*

*Operators do not change existing observable*

* Operators let you more easily compose complex asynchronous code
* Can be applied by including them in the pipe method.
* Return a new observabl without modifying the input observable
* A core set of operators can solve the majority of use cases, while others can be picked up as the situation arises.

## Marble Diagrams
Input + Operator = Output

Vertical line == Complete
X line == Error

## Operators
***Pluck***
Is already deprecated instead use map
```
pluck('target','nodeName') ==  map(event => event.target.nodeName)
```

***MapTo***
Is already deprecated instead use map
```
mapTo('Key Pressed!') == map(() => 'Key Pressed!')
```

***Tap***
tap operator will ignore the return word inside

### Filtering Operators
Ignore values based on some criteria:
* filtering out specific events
* removing duplicate emissions'
* completing observable condition

Some operators are:
* take
* takeWhile
* takeUntil
* distinctUntilChanged

***First***
first operator is a combined between filter and take(1)