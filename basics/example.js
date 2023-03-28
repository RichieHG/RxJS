// @ts-nocheck
import { Observable, map, of, range, fromEvent, from, interval, timer, pluck, mapTo, filter, reduce, take, scan, tap, first, takeWhile, takeUntil, distinctUntilChanged, distinctUntilKeyChanged, debounceTime, debounce, throttleTime, asyncScheduler, sampleTime, sample, auditTime, mergeAll, mergeMap, switchMap, delay, concatMap, exhaustMap, catchError, empty, EMPTY, finalize, startWith, endWith, merge, concat, combineLatest, withLatestFrom, forkJoin, retry, share } from "rxjs";
import { ajax } from 'rxjs/ajax'

// function* hello() {
//     // return 'Hello World!'
//     yield 'Hello',
//     yield 'World'
// }

// const observer = {
//     next: value => console.log('next', value),
//     error: error => console.log('error', error),
//     complete: () => console.log('complete!')
// }
// const iterator = hello();
// console.log(iterator.next().value);
// console.log(iterator.next().value);


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

// const user = [
//     { name: 'Brian', loggedIn: false, token: null },
//     // { name: 'Louis', loggedIn: true, token: '123' },
//     { name: 'Brian', loggedIn: false, token: null },
//     { name: 'Brian', loggedIn: true, token: 'abc' }
// ]

// const state$ = from(user).pipe(
//     scan((accumulator, currentValue) => {
//         return { ...accumulator, ...currentValue }
//     }, {})
// );

// const name$ = state$.pipe(
//     // distinctUntilChanged((previousValue, currentValue) => {
//     //     return previousValue.name === currentValue.name
//     // }),
//     distinctUntilKeyChanged('name'), //equals to the above function
//     map(state => state.name)
// );

// name$.subscribe(console.log)

//#endregion

//#region DebounceTime
// const click$ = fromEvent(document, 'click');
// click$.pipe(
//     debounceTime(1000)
// ).subscribe(console.log)

// const inputBox = document.querySelector('#text-input');

// const input$ = fromEvent(inputBox, 'keyup');

// input$.pipe(
//     // debounceTime(1000),
//     debounce(() =>  interval(1000)), // equals to => debounceTime(1000)
//     map( event => event.target.value),
//     distinctUntilChanged()
// ).subscribe(console.log)

//#endregion

//#region ThrottleTime
// const click$ = fromEvent(document, 'click');
// click$.pipe(
//     throttleTime(3000)
// ).subscribe(console.log)

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
//     throttleTime(30, asyncScheduler, {
//         leading: false,
//         trailing: true
//     }),
//     map(({target}) => calculateScrollPercent(target.documentElement)),
//     tap(console.log)
// )
// progress$.subscribe(perecent => {
//     progressBar.style.width = `${perecent}%`
// });
//#endregion

//#region SampleTime
// const click$ = fromEvent(document, 'click');
// const timer$ = interval(1000);

// // click$.pipe(
// //     sampleTime(4000),
// //     map(({clientX, clientY}) => ({
// //         clientX, clientY
// //     }))
// // ).subscribe(console.log)

// timer$.pipe(
//     sample(click$)
// ).subscribe(console.log)


//#endregion

//#region AuditTime
// const click$ = fromEvent(document, 'click');
// const timer$ = interval(1000);

// click$.pipe(
//     auditTime(4000),
//     map(({clientX, clientY}) => ({
//         clientX, clientY
//     }))
// ).subscribe(console.log)
//#endregion

//#region Flatenning
// const textInput = document.getElementById('text-input');

// const input$ =  fromEvent(textInput,'keyup');

// input$.pipe(
//     // map(event => {
//     //     const term = event.target.value;
//     //     return ajax.getJSON(
//     //         `https://api.github.com/users/${term}`
//     //     );
//     // }),
//     debounceTime(1000),
//     mergeMap(event => {
//         const term = event.target.value;
//         return ajax.getJSON(
//             `https://api.github.com/users/${term}`
//         );
//     })
//     // mergeAll()
// )
// .subscribe(console.log)
// // .subscribe(obs => {
// //     obs.subscribe(console.log)
// // });
//#endregion

//#region MergeMap
// const click$ = fromEvent(document, 'click');
// const mousedown$ = fromEvent(document, 'mousedown');
// const mouseup$ = fromEvent(document, 'mouseup');
// const interval$ = interval(1000);


// mousedown$.pipe(
//     mergeMap(() => interval$.pipe(
//         takeUntil(mouseup$)
//     ))
// ).subscribe(console.log)

// const coordinates$ = click$.pipe(
//     map(event => ({x: event.clientX, y: event.clientY}))
// );

// const coordinatesWithSave$ = coordinates$.pipe(
//     mergeMap(coords => ajax.post('https://www.mocky.io/v2/5185415ba171ea3a00704eed', coords))
// )

// coordinatesWithSave$.subscribe(console.log);
//#endregion

//#region SwitchMap
// const click$ = fromEvent(document, 'click');
// const interval$ = interval(1000);

// click$.pipe(
//     switchMap(() => interval$)
// )
// .subscribe(console.log)

// const BASE_URL = 'https://api.openbrewerydb.org/breweries';
// const inputBox = document.querySelector('#text-input');
// const input$ = fromEvent(inputBox, 'keyup');
// const typeaheadContainer = document.getElementById('typeahead-container')

// input$.pipe(
//     // debounceTime(200),
//     map( event => event.target.value),
//     distinctUntilChanged(),
//     switchMap(searchTerm => ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`))
// ).subscribe(response => {
//     typeaheadContainer.innerHTML =  response.map(b => b.name).join('<br>')
// })

//#endregion

//#region ConcatMap
// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');

// click$.pipe(
//     concatMap(() => interval$.pipe(take(3)))
// ).subscribe(console.log)
// const saveAnswer = answer => {
//     return of(`Saved: ${answer}`).pipe(
//         delay(1500)
//     )
// };

// const radioButtons = document.querySelectorAll('.radio-option')

// const answerChange$ = fromEvent(radioButtons, 'click');

// answerChange$.pipe(
//     concatMap(event => saveAnswer(event.target.value))
// ).subscribe(console.log)
//#endregion



//#region ExhaustMap

// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');

// click$.pipe(
//     exhaustMap(() => interval$.pipe(take(3)))
// ).subscribe(console.log)

// const loginButton = document.getElementById('login');
// const login$ = fromEvent(loginButton, 'click');

// const authenticateUser = () => {
//     return ajax.post('https://reqres.in/api/login', {
//         email: 'eve.holt@reqres.in',
//         password: 'cityslicka'
//     })
// };

// login$.pipe(
//     exhaustMap(() => authenticateUser())
// ).subscribe(console.log)

//#endregion

//#region CatchError
// const BASE_URL = 'https://api.openbrewerydb.org/breweries';
// const inputBox = document.querySelector('#text-input');
// const input$ = fromEvent(inputBox, 'keyup');
// const typeaheadContainer = document.getElementById('typeahead-container')

// input$.pipe(
//     // debounceTime(200),
//     map( event => event.target.value),
//     distinctUntilChanged(),
//     switchMap(searchTerm => ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`).pipe(
//         catchError((error/*, caughtto force to retry*/) => {
//             //throw or return observable
//             // return of(error.message)
//             //ignore return empty obs
//             return EMPTY;
//             //to retry
//             // return caught;
//         })
//     ))
// ).subscribe(response => {
//     typeaheadContainer.innerHTML =  response.map(b => b.name).join('<br>')
// })

//#endregion


//#region HTTP Polling Solution
// const startButton = document.getElementById('start');
// const stopButton = document.getElementById('stop');
// const pollingStatus = document.getElementById('polling-status');
// const dogImage = document.getElementById('dog');

// const startClick$ = fromEvent(startButton, 'click');
// const stopClick$ = fromEvent(stopButton, 'click');

// startClick$.pipe(
//     exhaustMap(() => timer(0,5000).pipe(
//         tap(() => pollingStatus.innerHTML = 'Active'),
//         switchMap(() => ajax({
//             url:'https://random.dog/woof.json',
//             method: 'GET',
//             crossDomain: true
//         }).pipe(
//             map(response => response.response.url))
//         ),
//         takeUntil(stopClick$),
//         finalize(() => pollingStatus.innerHTML = 'Stopped')
//     ))
// ).subscribe(url => dogImage.src = url)
//#endregion


//#region StartWith
// const numbers$ = of(1,2,3);

// numbers$.pipe(
//     startWith('a', 'b', 'c'),
//     endWith('a', 'b', 'c')
// ).subscribe(console.log)

// const countdown = document.querySelector('#countdown');
// const message = document.querySelector('#message');
// const abortButton = document.querySelector('#abort')
// const COUNTDOWN_FROM = 20;

// const counter$ = interval(1000);
// const abortClick$ = fromEvent(abortButton, 'click');
// counter$.pipe(
//     map(() => -1),
//     scan((accumulator, currentValue)=> {
//         return accumulator + currentValue;
//     },COUNTDOWN_FROM),
//     tap(console.log),
//     takeWhile(value => value >= 0),
//     takeUntil(abortClick$),
//     startWith(COUNTDOWN_FROM)
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


//#region Merge
// const keyup$ = fromEvent(document, 'keyup');
// const click$ = fromEvent(document, 'click');

// // keyup$.subscribe(console.log)
// // click$.subscribe(console.log)

// merge(keyup$, click$).subscribe(console.log)

// const countdown = document.querySelector('#countdown');
// const message = document.querySelector('#message');
// const pauseButton = document.querySelector('#pause')
// const startButton = document.querySelector('#start')
// const COUNTDOWN_FROM = 10;

// const counter$ = interval(1000);
// const pauseClick$ = fromEvent(pauseButton, 'click');
// const startClick$ = fromEvent(startButton, 'click');

// merge(
//     startClick$.pipe(map(() => true)),
//     pauseClick$.pipe(map(() => false))
// )
// .pipe(
//     switchMap( shouldStart => {
//         return shouldStart ? counter$ : EMPTY
//     }),
//     map(value =>{ 
//         console.log(value)
//         return -1
//     }),
//     scan((accumulator, currentValue)=> {
//         return accumulator + currentValue;
//     },COUNTDOWN_FROM),
//     tap(value => console.log('Counter:', value)),
//     takeWhile(value => value >= 0),
//     startWith(COUNTDOWN_FROM)
// ).subscribe(
//  {
//     next: value => {
//         countdown.innerHTML = value;
//         if(!value){
//         message.innerHTML = 'Liftoff!'
//         }
//     },
//     complete: () => console.log('Complete!')
// });
//#endregion


//#region Concat
// const interval$ = interval(1000);
// const delayed$ = EMPTY.pipe(delay(1000));

// concat(
//     interval$.pipe(take(3)),
//     interval$.pipe(take(4))
// ).subscribe(console.log)


// delayed$.pipe(
//     () => concat(
//         delayed$.pipe(startWith('3...')),
//         delayed$.pipe(startWith('2...')),
//         delayed$.pipe(startWith('1...')),
//         delayed$.pipe(startWith('Go!'))
//     ),
//     startWith('Get Ready!')
// ).subscribe(console.log)
//#endregion

//#region CombineLatest

// const firstI = document.getElementById('first');
// const secondI = document.getElementById('second');

// const keyup$ = fromEvent(document, 'keyup');
// const click$ = fromEvent(document, 'click');

// const keyupAsValue = elem => {
//     return fromEvent(elem, 'keyup').pipe(
//         map(event => event.target.valueAsNumber)
//     )
// };

// click$.pipe(
//     withLatestFrom(interval(1000))
// ).subscribe(console.log)

// combineLatest([keyupAsValue(firstI), keyupAsValue(secondI)])
// .pipe(
//     filter(([f,s]) => {
//         return !isNaN(f) && !isNaN(s)
//     }),
//     map(([f,s]) => f + s)
// )
// .subscribe(console.log)
//#endregion


//#region ForkJoin
// const numbers$ = of(1,2,3);
// const letters$ = of('a','b','c');

// forkJoin([numbers$,letters$.pipe(delay(3000))]).subscribe(console.log)
// forkJoin({
//     numbers: numbers$,
//     letters: letters$.pipe(delay(3000))
// }).subscribe(console.log)

// const GITHUB_API_BASE = 'https://api.github.com';

// forkJoin({
//     user: ajax.getJSON(`${GITHUB_API_BASE}/users/richiehg`),
//     repo: ajax.getJSON(`${GITHUB_API_BASE}/users/richiehg/repos`)
// }).subscribe(console.log)
//#endregion


//#region Mortgage Calculator
// function calculateMortgage(interest, loanAmount, loanLength){
//     const calculatedInterest = interest/1200;
//     const total = loanAmount * calculatedInterest / (1 - Math.pow(1/(1+calculatedInterest),loanLength));
//     return total.toFixed(2);
// }

// const loanAmount = document.getElementById('loanAmount');
// const interest = document.getElementById('interest');
// const loanLength = document.querySelectorAll('.loanLength');
// const expected = document.getElementById('expected');

// const createInputValueStream = element => {
//     return fromEvent(element, 'input').pipe(
//         map(event => parseFloat(event.target.value))
//     )
// };

// const saveResponse = mortgageAmount => {
//     return of(mortgageAmount).pipe(delay(1000))
// }

// const interest$ = createInputValueStream(interest);
// const loanAmount$ = createInputValueStream(loanAmount);
// const loanLength$ = createInputValueStream(loanLength);

// const calculation$ = combineLatest([
//     loanAmount$,
//     interest$,
//     loanLength$
// ]).pipe(
//     map(([loanAmount, interest, loanLength]) =>{
//         return calculateMortgage(interest, loanAmount, loanLength)
//     }),
//     tap(console.log),
//     filter(mortgageAmount =>  !isNaN(mortgageAmount)),
//     share()
// );
// calculation$.subscribe(mortgageAmount =>{
//     expected.innerHTML = mortgageAmount
// })

// calculation$.pipe(
//     mergeMap(mortgageAmount => saveResponse(mortgageAmount))
// ).subscribe()
//#endregion