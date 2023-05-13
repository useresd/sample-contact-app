import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  loadingSource = new Subject<boolean>();
  loading$ = this.loadingSource.asObservable();

  setLoading(value: boolean) {
    this.loadingSource.next(value);
  }
}
