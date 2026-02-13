import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Join the Community</h2>
        <p class="subtitle">Create an account to connect</p>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" formControlName="name" placeholder="John Doe">
            @if (registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
              <small class="error">Name is required</small>
            }
          </div>
        
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email" placeholder="john@example.com">
            @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
              <small class="error">Valid email is required</small>
            }
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" formControlName="password" placeholder="Create a password">
            @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
              <small class="error">Password must be at least 6 characters</small>
            }
          </div>
          
          <div class="form-group">
             <label for="role">Role (Mock)</label>
             <select formControlName="role" id="role">
                 <option value="user">User</option>
                 <option value="admin">Admin</option>
             </select>
          </div>
          
          <button type="submit" class="btn" [disabled]="registerForm.invalid">Register</button>
        </form>
        
        <p class="footer-text">
          Already have an account? <a routerLink="/auth/login">Login</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background-color: var(--background-color);
    }
    
    .auth-card {
      background: var(--card-bg);
      padding: 2.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      width: 100%;
      max-width: 400px;
      text-align: center;
      
      h2 { color: var(--primary-color); margin-bottom: 0.5rem; }
      .subtitle { margin-bottom: 2rem; opacity: 0.7; }
      
      form {
        text-align: left;
        
        .form-group {
          margin-bottom: 1.5rem;
          
          label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
          
          input, select {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: var(--background-color);
            color: var(--text-color);
            transition: border-color 0.3s;
            
            &:focus {
              border-color: var(--primary-color);
              outline: none;
            }
          }
          
          .error { color: #dc3545; font-size: 0.8rem; margin-top: 0.3rem; display: block; }
        }
        
        .btn { width: 100%; padding: 0.8rem; margin-top: 1rem; }
      }
      
      .footer-text { margin-top: 1.5rem; font-size: 0.9rem; }
      a { color: var(--primary-color); font-weight: bold; }
    }
  `]
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user']
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, role } = this.registerForm.value;
      // Mock registration auto-login
      this.authService.register(name, email, password).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
