import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">Alumni<span>Success</span></a>
        
        <div class="mobile-toggle" (click)="toggleMenu()">
             <span></span><span></span><span></span>
        </div>

        <ul class="nav-links" [class.active]="isMenuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
          <li><a routerLink="/alumni" routerLinkActive="active">Alumni</a></li>
          <li><a routerLink="/about" routerLinkActive="active">About</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          
          @if (authService.user()) {
             @if (authService.isAdmin()) {
               <li><a routerLink="/admin" routerLinkActive="active">Dashboard</a></li>
             }
             <li><button (click)="logout()" class="btn btn-outline btn-sm">Logout</button></li>
          } @else {
             <li><a routerLink="/auth/login" class="btn btn-sm">Login</a></li>
          }
           <li>
            <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="'Toggle theme'">
              {{ themeService.themeSignal() === 'light' ? '🌙' : '☀️' }}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: var(--navbar-bg);
      box-shadow: var(--shadow);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: background-color 0.3s;
      
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text-color);
        span { color: var(--primary-color); }
      }
      
      .nav-links {
        display: flex;
        gap: 1.5rem;
        align-items: center;
        
        li a {
             color: var(--text-color);
             font-weight: 500;
             transition: color 0.3s;
             
             &:hover, &.active {
                 color: var(--primary-color);
             }
        }
      }

      .mobile-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          span {
              height: 3px;
              width: 25px;
              background-color: var(--text-color);
              margin-bottom: 4px;
              border-radius: 2px;
          }
      }

      .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: var(--text-color);
      }
      
      @media (max-width: 768px) {
          .nav-links {
              display: none;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: var(--navbar-bg);
              padding: 1rem;
              box-shadow: var(--shadow);
              
              &.active { display: flex; }
          }
          .mobile-toggle { display: flex; }
      }
    }
  `]
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  isMenuOpen = false;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
  
  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
      this.authService.logout();
      this.isMenuOpen = false; 
  }
}
