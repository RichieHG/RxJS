import { BehaviorSubject, Subject } from "rxjs";

// const loading$ = new Subject();
const loading$ = new BehaviorSubject(true);

export const loadingService = {
    showLoading: () => loading$.next(true),
    hideLoading: () => loading$.next(false),
    loadingStatus$: loading$.asObservable()
}