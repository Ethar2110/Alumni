import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlumniService } from '../../core/services/alumni.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  template: `
    <section class="hero">
      <div class="container">
        <h1>Welcome to Alumni Success Hall</h1>
        <p>Celebrating the achievements of our remarkable graduates.</p>
        <div class="cta-buttons">
          <a routerLink="/alumni" class="btn">Explore Alumni</a>
          <a routerLink="/auth/register" class="btn btn-outline">Join Network</a>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container">
        <div class="stat-item">
          <h3>2,500+</h3>
          <p>Alumni</p>
        </div>
        <div class="stat-item">
          <h3>50+</h3>
          <p>Countries</p>
        </div>
        <div class="stat-item">
          <h3>120+</h3>
          <p>Companies</p>
        </div>
      </div>
    </section>

    <section class="featured">
      <div class="container">
        <h2>Featured Alumni</h2>
        <div class="alumni-grid">
          @for (alumni of featuredAlumni(); track alumni.id) {
            <app-card customClass="alumni-card">
              <div class="card-content">
                <img [src]="alumni.profileImage" alt="{{alumni.name}}">
                <h3>{{alumni.name}}</h3>
                <p class="role">{{alumni.currentPosition}}</p>
                <p class="company">&#64; {{alumni.company}}</p>
                <a [routerLink]="['/alumni', alumni.id]" class="view-profile">View Profile →</a>
              </div>
            </app-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 4rem 0;
      text-align: center;
      
      h1 { font-size: 2.5rem; margin-bottom: 1rem; }
      p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
      
      .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        
        .btn-outline {
          border-color: white;
          color: white;
          &:hover { background-color: white; color: var(--primary-color); }
        }
      }
    }
    
    .stats {
      padding: 3rem 0;
      background-color: var(--card-bg);
      
      .container {
        display: flex;
        justify-content: space-around;
        text-align: center;
      }
      
      h3 { font-size: 2rem; color: var(--primary-color); margin: 0; }
      p { margin: 0.5rem 0 0; }
    }
    
    .featured {
      padding: 4rem 0;
      
      h2 { text-align: center; margin-bottom: 2rem; }
      
      .alumni-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
      }
      
      .card-content {
        text-align: center;
        
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
          border: 3px solid var(--primary-color);
        }
        
        h3 { margin: 0.5rem 0; }
        .role { color: var(--text-color); font-weight: 500; margin: 0; }
        .company { color: var(--text-color); opacity: 0.7; margin: 0.2rem 0 1rem; }
        
        .view-profile {
          color: var(--primary-color);
          font-weight: bold;
          &:hover { text-decoration: underline; }
        }
      }
    }
  `]
})
export class HomeComponent {
  alumniService = inject(AlumniService);
  featuredAlumni = toSignal(this.alumniService.getAlumni(), { initialValue: [] });
}
