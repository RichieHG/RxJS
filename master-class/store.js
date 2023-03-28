import { BehaviorSubject, Subject, distinctUntilKeyChanged, map, scan } from "rxjs";

export class ObservableStore {
    constructor(initialState) {
        this._store = new BehaviorSubject(initialState);
        this._stateUpdates = new Subject();

        // Accumulate state
        this._stateUpdates.pipe(
            scan((acc, curr) => {
                return { ...acc, ...curr }
            }, initialState)
        ).subscribe(this._store);
    }

    updateState(stateUpdate){
        this._stateUpdates.next(stateUpdate);
    }

    selectState(stateKey){
        return this._store.pipe(
            distinctUntilKeyChanged(stateKey),
            map(stateKey => stateKey)
        );
    }

    stateChanges(){
        return this._store.asObservable();
    }
}