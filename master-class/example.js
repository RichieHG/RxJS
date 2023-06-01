import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, asyncScheduler, fromEvent, interval, mergeMap, multicast, share, shareReplay, tap, of, observeOn, delay, scheduled, asapScheduler, range, animationFrameScheduler, takeWhile, queueScheduler } from "rxjs";
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
// const loadingOverlay = document.getElementById('loading-overlay');
// loadingService.loadingStatus$.subscribe(isLoading => {
//     if(isLoading) loadingOverlay.classList.add('open');
//     else loadingOverlay.classList.remove('open');
// });

// loadingService.showLoading();
// setTimeout(() => loadingService.hideLoading(),3000);
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
// const subject = new AsyncSubject();

// subject.subscribe(observer);
// subject.subscribe(observer);

// subject.next('Hello');
// subject.next('World');
// subject.next('Goodbye');

// subject.complete();
//#endregion

//#region AsyncSchedulers

// work, delay?, state?
// const sub = asyncScheduler.schedule(
//     console.log,
//     2000,
//     'Hello World!'
// );
// console.log('sync');
// sub.unsubscribe();

// of(7,8,9).pipe(
//     //use delay!
//     tap(val => console.log('from tap', val)),
//     delay(3000),
//     observeOn(asyncScheduler)
//     // observeOn(asyncScheduler,3000)

// ).subscribe(observer);


// of(4,5,6, asyncScheduler).subscribe(observer); //deprecated
// scheduled([4,5,6], asyncScheduler).subscribe(observer);
// of(1,2,3).subscribe(observer);
// console.log('sync');
//#endregion

//#region ASAP Scheduler
// asyncScheduler.schedule(() => console.log('asyncScheduler'));
// asapScheduler.schedule(() => console.log('asapcheduler'));
// queueMicrotask(() => console.log('from microtaks'));
// Promise.resolve('from promise').then(console.log);

// range(1,5).subscribe(observer); //Emit first the range then the console.log
// range(1,5, asapScheduler).subscribe(observer); // DEPRECATED Emit first the console.log then the range
// range(1,5).pipe(observeOn(asapScheduler)).subscribe(observer); // Emit first the console.log then the range

// const counter = document.getElementById('counter');
// range(1,10000)
// .pipe(observeOn(asapScheduler))
// .subscribe(val => {
//     counter.innerHTML = val.toString()
// }); 
// range(1,10000)
// .pipe(observeOn(asyncScheduler))
// .subscribe(val => {
//     counter.innerHTML = val.toString()
// }); 
// console.log('synchronous console.log');
//#endregion

//#region AnimationFrameScheduler
// const ball = document.getElementById('ball');
// var reverse = false;
// animationFrameScheduler.schedule(function(position){
//     ball.style.transform = `translate3d(0, ${position}px, 0)`;

//     if(position <= 300 && !reverse)
//         this.schedule(position + 1);
//     else{
//         reverse = true;
//         if(position == 0){
//             reverse = false;
//             this.schedule(position + 1);
//         }
//         else
//             this.schedule(position - 1)
//     }
// }, 0, 0);

// interval(0, animationFrameScheduler)
//     .pipe(
//         takeWhile(val => val <= 300)
//     )
//     .subscribe(val => {
//         ball.style.transform = `translate3d(0, ${val}px, 0)`;
//     });
//#endregion

//#region QueueScheduler
queueScheduler.schedule(() => {
    queueScheduler.schedule(() => {
        queueScheduler.schedule(() => {
            console.log('second inner queue');
        });
        console.log('inner queue');
    });
    console.log('first queue');
});
console.log('sync');
//#endregion