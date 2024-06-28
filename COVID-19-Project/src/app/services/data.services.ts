import { Injectable } from '@angular/core';
import { UserData } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData!: UserData;

  setUserData(data: UserData): void {
    this.userData = data;
  }

  getUserData(): UserData {
    return this.userData;
  }
}

