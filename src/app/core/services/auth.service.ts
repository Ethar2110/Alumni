import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'alumni_user';
  // Signal to track user state reactively
  user = signal<User | null>(this.getUserFromStorage());

  constructor(private router: Router) { }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  login(email: string, password: string): Observable<boolean> {
    // Mock login - allow any email with 'admin' to be admin, others user
    if (password === 'password') { // Simple mock check
      const user: User = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        role: email.includes('admin') ? 'admin' : 'user',
        token: 'mock-jwt-token'
      };
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.user.set(user);
      return of(true);
    }
    return of(false);
  }

  register(name: string, email: string, password: string): Observable<boolean> {
      // Mock registration
      const user: User = {
          id: Date.now(),
          name: name,
          email: email,
          role: 'user', // Default to user
          token: 'mock-jwt-token'
      };
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.user.set(user);
      return of(true);
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.user.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.user();
  }

  isAdmin(): boolean {
      return this.user()?.role === 'admin';
  }
}
