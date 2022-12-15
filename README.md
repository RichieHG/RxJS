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

