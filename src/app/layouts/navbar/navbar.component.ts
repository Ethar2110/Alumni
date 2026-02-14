import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
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
