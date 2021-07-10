import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDeleteService {
  private delete: boolean = false;
  private toDelete$ = new BehaviorSubject<boolean>(this.delete);
  
  constructor() { }

  showDelete(): Observable<boolean>{
    this.delete = !this.delete;
    this.toDelete$.next(this.delete)

    return this.toDelete$.asObservable();
  }
}
