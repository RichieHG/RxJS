import { Observable, map } from "rxjs";

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
}
const observable = new Observable(subcriber => {
    subcriber.next('Hello');
    subcriber.next('World');
    subcriber.complete();
    

});

observable.subscribe(observer)

