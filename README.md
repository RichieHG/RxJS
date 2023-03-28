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

### [Subject](https://rxjs.dev/guide/subject)
* Is an **observable**:
    * Has a pipe method
    * You can subscribe to it to receive inmediate values
* Is also an **observer**:
    * Has next, error and complete methods which can be ivoke to send notifications to subscribers of the subject
* Are multicast:
    * The subscribers of a subject are registered and share an ejecution of an observable.
    * We can send a single notifications to multiple subscribers at once.
* Subject.next(0): the subject will deliver the new value to all subscribers.
* Subject.complete(): will send a complete notification.
* You can subscribe your subject to any observable and this one will notify any event to its subscribers.
* There are some types of Subjects:
    * ***BehaviourSubject***: share all executions and also an initial value. And per each new subscribir this kind of subject emits the current state.
    * ***ReplySubject***: reply a certain number of values to subscribers. With not a initial value. If we don't define a number of replies, it will reply all previous values to new subscribers.
    * ***AsyncSubject***: only emit the last value before completion.


### withLatestFrom
Returns the latest state from an Observable

### shareReply
Turns unicast observable to multicast, replying all values to new subscribers (by default)
Put 1 as first param new subscribers only will receive the last value
Use the second param to define life time of the new values to share. If a subscriber comes after that time it won't receive the value