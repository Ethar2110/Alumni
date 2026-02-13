import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Welcome Back</h2>
        <p class="subtitle">Login to access your dashboard</p>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email" placeholder="Enter your email">
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <small class="error">Valid email is required</small>
            }
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" formControlName="password" placeholder="Enter your password">
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <small class="error">Password is required</small>
            }
          </div>
          
          <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
          
          <button type="submit" class="btn" [disabled]="loginForm.invalid">Login</button>
        </form>
        
        <p class="footer-text">
          Don't have an account? <a routerLink="/auth/register">Register</a>
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
          
          input {
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
        
        .error-message {
            color: #dc3545;
            text-align: center;
            margin-bottom: 1rem;
            background: rgba(220, 53, 69, 0.1);
            padding: 0.5rem;
            border-radius: 4px;
        }
      }
      
      .footer-text { margin-top: 1.5rem; font-size: 0.9rem; }
      a { color: var(--primary-color); font-weight: bold; }
    }
  `]
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(success => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      });
    }
  }
}
