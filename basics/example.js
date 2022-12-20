// @ts-nocheck
import { Observable, map, of, range, fromEvent, from, interval, timer, pluck, mapTo, filter, reduce, take, scan, tap, first, takeWhile, takeUntil, distinctUntilChanged, distinctUntilKeyChanged } from "rxjs";

// function hello(){
//     return 'Hello World!'
// }

function* hello() {
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
// const timer$ = timer(2000, 1000);

// timer$.subscribe(console.log)

// of(1,2,3,4,5).pipe(
//     map(value => value * 10)
// )
// .subscribe(console.log);

// @ts-ignore

// const keyup$ = fromEvent(document,'keyup');
// const keycode$ = keyup$.pipe(
//     map(event => event)
// );

// const keycodeWithPluck$ = keyup$.pipe(
//     pluck('code'),
//     // pluck('target','nodeName') // ==  map(event => event.target.nodeName).
// );

// const pressed$ = keyup$.pipe(
//     // mapTo('Key Pressed!')
//     map(() => 'Key Pressed!')
// )

// pressed$.subscribe(console.log)

//#region Filter Operator

// of(1,2,3,4,5).pipe(
//     filter(value => value > 2)
// ).subscribe(console.log)

// const keyup$ = fromEvent(document, 'keyup');
// const keycode$ = keyup$.pipe(
//     map(event => event.code)
// );

// const enter$ = keycode$.pipe(
//     filter(code => code === 'Enter')
// )

// enter$.subscribe(console.log)
// keycode$.subscribe(console.log)

//#endregion


//#region Scroll Progress Bar

// function calculateScrollPercent(element) {
//     const {
//         scrollTop,
//         scrollHeight,
//         clientHeight
//     } = element;

//     return (scrollTop/ (scrollHeight - clientHeight)) *100;
// }

// const progressBar = document.querySelector('.progress-bar');

// const scroll$ =  fromEvent(document,'scroll');
// const progress$ = scroll$.pipe(
//     map(({target}) => calculateScrollPercent(target.documentElement))
// )
// progress$.subscribe(perecent => {
//     progressBar.style.width = `${perecent}%`
// });

//#endregion


//#region Reduce
// const numbers = [1,2,3,4,5];
// const totalReducer = (accumulator, currentValue) => {
//     return accumulator + currentValue
// };

// // const total = numbers.reduce(totalReducer,0);
// // console.log(total);

// // from(numbers).pipe(
// //     reduce(totalReducer, 0)
// // ).subscribe(console.log)

// interval(1000).pipe(
//     take(3),
//     reduce(totalReducer, 0)
// ).subscribe({
//     next: console.log,
//     complete: () => console.log('Complete!')
//     })
//#endregion

//#region Scan
// const numbers = [1,2,3,4,5];
// const user = [
//     {name: 'Brian', loggedIn: false, token: null},
//     {name: 'Luis', loggedIn: true, token: '123'},
//     {name: 'Joshue', loggedIn: true, token: 'abc'}
// ]
// // from(numbers).pipe(
// //     scan((accumulator, currentValue) => {
// //         return accumulator + currentValue;
// //     }, 0)
// // ).subscribe(console.log)

// const state$ = from(user).pipe(
//     scan((accumulator, currentValue) => {
//         return {...accumulator, ...currentValue}
//     }, {})
// );

// const name$ = state$.pipe(
//     map(state => state.name)
// );

// name$.subscribe(console.log)

//#endregion

//#region Countdown-Timer

// const countdown = document.querySelector('#countdown');
// const message = document.querySelector('#message');

// const counter$ = interval(1000);
// counter$.pipe(
//     map(() => -1),
//     scan((accumulator, currentValue)=> {
//         return accumulator + currentValue;
//     },10),
//     filter(value => value >= 0)
// ).subscribe(
//  {
//     next: value => {
//         countdown.innerHTML = value;
//         if(!value){
//             message.innerHTML = 'Liftoff!'
//         }
//     },
//     complete: () => console.log('Finish!')
// });

//#endregion


//#region Tap
// const numbers$ = of(1,2,3,4,5);

// numbers$.pipe(
//     tap(value => console.log('before', value)),
//     map(value => value * 10),
//     tap({
//         next: value => console.log('after', value),
//         complete: () => console.log('done')
//     })
// )
// .subscribe(value => {
//     console.log('from subscribe', value)
// })


//#endregion

//#region Take
// const numbers$ = of(1,2,3,4,5);
// const click$ = fromEvent(document, 'click');

// click$.pipe(
//     map(event => ({
//         x: event.clientX,
//         y: event.clientY
//     })),
//     // filter, take(1)
//     first(({y}) => y > 200)
// ).subscribe({
//     next: console.log,
//     complete: () => console.log('Complete!')
// })
//#endregion

//#region TakeWhile
// const click$ = fromEvent(document, 'click');

// click$.pipe(
//     map(event => ({
//         x: event.clientX,
//         y: event.clientY
//     })),
//     takeWhile(({y}) => y <= 200, true)
// ).subscribe({
//     next: console.log,
//     complete: () => console.log('Complete!')
// })

// const countdown = document.querySelector('#countdown');
// const message = document.querySelector('#message');

// const counter$ = interval(1000);
// counter$.pipe(
//     map(() => -1),
//     scan((accumulator, currentValue)=> {
//         return accumulator + currentValue;
//     },5),
//     tap(console.log),
//     takeWhile(value => value >= 0)
// ).subscribe(
//  {
//     next: value => {
//         countdown.innerHTML = value;
//         if(!value){
//             message.innerHTML = 'Liftoff!'
//         }
//     },
//     complete: () => console.log('Finish!')
// });

//#endregion

//#region TakeUntil
// const counter$ = interval(1000);
// const click$ = fromEvent(document, 'click');

// counter$.pipe(
//     takeUntil(click$)
// ).subscribe(console.log);

// const countdown = document.querySelector('#countdown');
// const message = document.querySelector('#message');
// const abortButton = document.querySelector('#abort')

// const counter$ = interval(1000);
// const abortClick$ = fromEvent(abortButton, 'click');
// counter$.pipe(
//     map(() => -1),
//     scan((accumulator, currentValue)=> {
//         return accumulator + currentValue;
//     },5),
//     tap(console.log),
//     takeWhile(value => value >= 0),
//     takeUntil(abortClick$)
// ).subscribe(
//  {
//     next: value => {
//         countdown.innerHTML = value;
//         if(!value){
//             message.innerHTML = 'Liftoff!'
//         }
//     },
//     complete: () => console.log('Finish!')
// });
//#endregion


//#region DistinctUntilChanged
// const numbers$ = of(1,'1',2,3,3,3,4,5,3);


// numbers$.pipe(
//     distinctUntilChanged()
// ).subscribe(console.log)

const user = [
    { name: 'Brian', loggedIn: false, token: null },
    // { name: 'Louis', loggedIn: true, token: '123' },
    { name: 'Brian', loggedIn: false, token: null },
    { name: 'Brian', loggedIn: true, token: 'abc' }
]

const state$ = from(user).pipe(
    scan((accumulator, currentValue) => {
        return { ...accumulator, ...currentValue }
    }, {})
);

const name$ = state$.pipe(
    // distinctUntilChanged((previousValue, currentValue) => {
    //     return previousValue.name === currentValue.name
    // }),
    distinctUntilKeyChanged('name'), //equals to the above function
    map(state => state.name)
);

name$.subscribe(console.log)

//#endregion