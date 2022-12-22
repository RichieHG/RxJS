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

### Rate Limiting Operators
Time based filtering operators:
- Emitting latest value after a pause
- Sampling stream on certain duration
- Other time-based conditions

Some operators are:
* debounceTime
* throttleTime
* sampleTime
* auditTime

### Transformation Operators
* Transform values as they flow through stream
* Flattening operators
    * mergeMap
    * concatMap
    * switchMap
    * exhaustMap
* Other operators: catchError, finalize and delay

#### What's flattening
Take an observable that emits another observable and internally subscribe to the other streams

### mergeMap
* Maps values to a new observable on emissions from source, subscribing to and emitting results of inner observables
* By default mergeMap does not limit the number of active inner obsevables
* Useful for HTTP requests you dont want cancelled, such al POSTs
* Inner observables whose lifetime you will manage
* ***NOTE:*** Remember to clean up inner observables 

### switchMap
* Switching to a new observable on emissions from source, cancelling any previously active inner observables
* Safest default for flattening, hard to create leaks like mergeMap
* Useful for HTTP requests that can be cancelled (GET)
* Great for reset, pause and resume functionality
* ***NOTE:*** Avoid switchMap when cancellation could have undesired effects, such a saves (POST)

### concatMap
* Maintains one active inner subscription, activates next observable when previous completes
* Use when order of execution is important and inner observables have finite lifespans
* ***NOTE:*** Be careful if you have a long running inner observables, as subsquent mapped observables could back up or never execute

### exhaustMap
* Ignores emited values when there is an active inner observable
* Use when quick, subsequent emissions can be ignored, like refresh button or login request.
* ***NOTE:*** Avoid if cancellation is important, or ignoring emissions from the source would cause undesired effects

### Combination Operators
Join multiple observables into a single stream:
* Combine multiple requests
* Perform calculations based on multiple stream inputs
* Tracking on values to beginning or end of stream
* Operator like: startWith, concat, merge, combineLatest, forkJoin
* Also sharing observable execution with the share operator

