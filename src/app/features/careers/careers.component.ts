import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumniService } from '../../core/services/alumni.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="container">
      <h1>Explore Career Paths</h1>
      <p class="subtitle">Where our alumni make an impact</p>
      
      <div class="grid">
        @for (category of categories(); track category) {
          <app-card customClass="career-card">
            <div class="icon">🚀</div>
            <h3>{{category}}</h3>
            <p>Discover alumni working in {{category}}</p>
            <button class="btn btn-sm btn-outline">Explore</button>
          </app-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 4rem 1rem; text-align: center; }
    h1 { margin-bottom: 0.5rem; }
    .subtitle { margin-bottom: 3rem; opacity: 0.7; }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .career-card {
      text-align: center;
      .icon { font-size: 3rem; margin-bottom: 1rem; }
      h3 { margin-bottom: 0.5rem; color: var(--primary-color); }
      p { margin-bottom: 1.5rem; }
    }
  `]
})
export class CareersComponent {
  alumniService = inject(AlumniService);
  categories = toSignal(this.alumniService.getCareerCategories(), { initialValue: [] });
}
