import { Observable, map, of, range, fromEvent, from, interval, timer } from "rxjs";

// function hello(){
//     return 'Hello World!'
// }

function* hello(){
    yield 'Hello',
    yield 'World'
}

const iterator = hello();
// console.log(iterator.next().value);
// console.log(iterator.next().value);

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
}
// const observable = new Observable(subcriber => {
//     subcriber.next('Hello');
//     subcriber.next('World');
//     subcriber.complete();
//     let count = 0;
//     const id = setInterval(()=> {
//         subcriber.next(count);
//         subcriber.complete();
//         count +=1;
//     }, 1000);

//     return () => {
//         console.log('Called');
//         clearInterval(id);
//     }
// });

// console.log('Before');
// const subscription = observable.subscribe(observer);
// const subscription2 = observable.subscribe(observer);
// console.log('After');

// subscription.add(subscription2)
// setTimeout(() => {
//     subscription.unsubscribe()
//     // subscription2.unsubscribe()
// }, 3500);


// const source$ = fromEvent(document, 'keyup')
// const source$ = of(1,2,3,4,5);
// const source$ = range(1,5);

// const subOne = source$.subscribe(observer);
// const subTwo = source$.subscribe(observer);
// // console.log(hello())

// setTimeout(() => {
//     console.log('Unsubscribing');
//     subOne.unsubscribe();
// }, 3000);


// const source$ = from(fetch('https://api.github.com/users/octocat'));
// const source$ = from(iterator);

// source$.subscribe(observer);


// const timer$ = interval(1000);
const timer$ = timer(2000, 1000);

timer$.subscribe(console.log)