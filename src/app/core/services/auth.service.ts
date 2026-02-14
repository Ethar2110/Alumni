import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'alumni_user';
  private usersListKey = 'alumni_users_list';
  // Signal to track user state reactively
  user = signal<User | null>(this.getUserFromStorage());
  
  // Computed signal for admin check
  isAdmin = computed(() => this.user()?.role === 'admin');

  constructor(private router: Router) {
    // Initialize users list if not exists
    if (!localStorage.getItem(this.usersListKey)) {
      localStorage.setItem(this.usersListKey, JSON.stringify([]));
    }
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  private getAllUsers(): any[] {
    const usersData = localStorage.getItem(this.usersListKey);
    return usersData ? JSON.parse(usersData) : [];
  }

  login(email: string, password: string): Observable<boolean> {
    const users = this.getAllUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      const user: User = {
        ...userWithoutPassword,
        role: userWithoutPassword.role as 'admin' | 'user',
        token: 'mock-jwt-token'
      };
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.user.set(user);
      return of(true);
    }
    
    // For convenience, still allow admin login with specific email and password
    if (email === 'admin@system.com' && password === 'password') {
        const adminUser: User = {
            id: Date.now(),
            name: email.split('@')[0],
            email: email,
            role: 'admin',
            token: 'mock-jwt-token'
        };
        localStorage.setItem(this.userKey, JSON.stringify(adminUser));
        this.user.set(adminUser);
        return of(true);
    }

    return of(false);
  }

  register(name: string, email: string, password: string): Observable<boolean> {
      const users = this.getAllUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
          return of(false);
      }

      const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          role: 'user' // Default to user
      };

      users.push(newUser);
      localStorage.setItem(this.usersListKey, JSON.stringify(users));

      // Auto-login
      const user: User = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: 'user',
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


}
