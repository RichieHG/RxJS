import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, fromEvent, interval, mergeMap, multicast, share, shareReplay, tap } from "rxjs";
import { loadingService } from "./loadingService";
import { ObservableStore } from "./store";
import { ajax } from 'rxjs/ajax';
const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
};

//#region Introduction to Subject
// const subject = new Subject();
// const subscription = subject.subscribe(observer);
// subject.next('Hello');
// const subscription2 = subject.subscribe(observer);
// subject.next('World');

// const interval$ = interval(2000).pipe(
//     tap(value => console.log('new interval', value))
// );
// These subscritions create its own interval, so, we have 2 intervals running
// interval$.subscribe(observer);
// interval$.subscribe(observer);

// These subscription uses the Subject as a speaker to share new values to all subscribers
// interval$.subscribe(subject);
//#endregion

//#region Manage Loading State
const loadingOverlay = document.getElementById('loading-overlay');
loadingService.loadingStatus$.subscribe(isLoading => {
    if(isLoading) loadingOverlay.classList.add('open');
    else loadingOverlay.classList.remove('open');
});

// loadingService.showLoading();
setTimeout(() => loadingService.hideLoading(),3000);
//#endregion

//#region Multicast and Share

// const interval$ = interval(1000).pipe(
//     tap(value => console.log('new interval', value))
// );
// const multicastedInterval$ = interval$.pipe(
//     share()
//     // share({ connector: () => new Subject()})
//     // multicast(() => new Subject()) DEPRECATED
//     // refCount() DEPRECATED
// );
// multicastedInterval$.connect(); DEPRECATED

// const subOne = multicastedInterval$.subscribe(observer);
// const subTwo = multicastedInterval$.subscribe(observer);

// setTimeout(() => {
//     subOne.unsubscribe();
//     subTwo.unsubscribe();
// }, 3000);
//#endregion

//#region BehaviourSubject
// const behaviorSubject$ = new BehaviorSubject('Hello');
// const subOne = behaviorSubject$.subscribe(observer);
// behaviorSubject$.next('World');
// const subTwo = behaviorSubject$.subscribe(observer)
// setTimeout(() => console.log('Current value', behaviorSubject$.getValue()),3000);
//#endregion

//#region Application Store
// const store = new ObservableStore({
//     user: 'rnhg',
//     isAuthenticated: false
// });

// store.selectState('user').subscribe(console.log);

// store.updateState({
//     user:'joe'
// });
// store.updateState({
//     isAuthenticated: true
// })
//#endregion

//#region ReplySubject
// const subject = new ReplaySubject(1);

// subject.subscribe(observer);

// subject.next('Hello');
// console.log('1')
// subject.next('World');
// console.log('2')
// subject.next('Goodbye');
// console.log('3')
// subject.next('Hi');

// subject.subscribe(observer);
//#endregion

//#region ShareReply
// @ts-ignore
// const ajax$ = ajax('https://api.github.com/users/octocat');
// const click$ = fromEvent(document, 'click');
// const clickRequest$ = click$.pipe(
//     mergeMap(() => ajax$),
//     shareReplay(1, 10000)
//     // put 1 as first param means new subscribers only will receive the last value
//     // Use the second param to define the lifetime of the new values
// );
// clickRequest$.subscribe(observer);


// setTimeout(() => {
//     console.log('subscribing!');
//     clickRequest$.subscribe(observer);
// },5000)
//#endregion

//#region AsyncSubject
const subject = new AsyncSubject();

subject.subscribe(observer);
subject.subscribe(observer);

subject.next('Hello');
subject.next('World');
subject.next('Goodbye');

subject.complete();
//#endregion