import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a routerLink="/" class="btn">Go Home</a>
    </div>
  `,
  styles: [`
    .container {
      padding: 5rem 1rem;
      text-align: center;
      
      h1 { font-size: 6rem; color: var(--primary-color); margin: 0; }
      p { font-size: 1.5rem; margin-bottom: 2rem; }
    }
  `]
})
export class NotFoundComponent {}
