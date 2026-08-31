import { inject, Service } from '@angular/core';
import { AccountSevice } from './account-sevice';
import { of } from 'rxjs';

@Service()
export class InitService {
  private accountService = inject(AccountSevice);
  init() {
    const userString = localStorage.getItem('user');
    if (!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
    return of(null);
  }
}
