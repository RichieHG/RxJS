import { Observable, map } from "rxjs";

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
}
const observable = new Observable(subcriber => {
    // subcriber.next('Hello');
    // subcriber.next('World');
    // subcriber.complete();
    let count = 0;
    const id = setInterval(()=> {
        subcriber.next(count);
        // subcriber.complete();
        count +=1;
    }, 1000);

    return () => {
        console.log('Called');
        clearInterval(id);
    }
});

// console.log('Before');
const subscription = observable.subscribe(observer);
const subscription2 = observable.subscribe(observer);
// console.log('After');

subscription.add(subscription2)
setTimeout(() => {
    subscription.unsubscribe()
    // subscription2.unsubscribe()
}, 3500);

