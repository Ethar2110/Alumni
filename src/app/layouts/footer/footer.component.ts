import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="container">
        <p>&copy; 2026 Alumni Success Hall. All rights reserved.</p>
        <div class="social-links">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: var(--footer-bg);
      color: var(--text-color);
      padding: 2rem 0;
      margin-top: auto;
      text-align: center;
      transition: background-color 0.3s, color 0.3s;
      
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
      
      .social-links {
        display: flex;
        gap: 1rem;
        
        a {
            color: var(--primary-color);
            &:hover { text-decoration: underline; }
        }
      }
    }
  `]
})
export class FooterComponent {}
