import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private userDataSubject = new BehaviorSubject<any>({});
  userData$ = this.userDataSubject.asObservable();

  updateUserData(userData: any) {
    this.userDataSubject.next(userData);
  }
}
