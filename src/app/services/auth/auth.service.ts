import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean = false;
  private localStorageKey = 'user';

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {


    const userJson = localStorage.getItem(this.localStorageKey);

    this.isAuthenticated =  userJson ? true : false;
    return this.isAuthenticated;
  }
}
