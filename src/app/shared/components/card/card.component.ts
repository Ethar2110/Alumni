import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="customClass">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 1.5rem;
      transition: transform 0.2s, background-color 0.3s;
      
      &:hover {
        transform: translateY(-5px);
      }
    }
  `]
})
export class CardComponent {
  @Input() customClass: string = '';
}
