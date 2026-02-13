import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlumniService } from '../../../core/services/alumni.service';
import { Alumni } from '../../../core/interfaces/alumni.interface';

@Component({
  selector: 'app-alumni-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="details-section" *ngIf="alumni">
      <div class="container">
        <a routerLink="/alumni" class="back-link">← Back to List</a>
        
        <div class="profile-header">
          <div class="image-container">
            <img [src]="alumni.profileImage" alt="{{alumni.name}}">
          </div>
          <div class="info">
            <h1>{{alumni.name}}</h1>
            <p class="role">{{alumni.currentPosition}} &#64; {{alumni.company}}</p>
            <div class="meta">
              <span><strong>Class of:</strong> {{alumni.graduationYear}}</span> • 
              <span><strong>Degree:</strong> {{alumni.degree}}</span> •
              <span><strong>Category:</strong> {{alumni.careerCategory}}</span>
            </div>
            
            <div class="socials">
              <button class="btn btn-sm">Connect on LinkedIn</button>
              <button class="btn btn-sm btn-outline">Send Email</button>
            </div>
          </div>
        </div>
        
        <div class="bio">
          <h3>Biography</h3>
          <p>{{alumni.bio}}</p>
        </div>
      </div>
    </section>
    
    <section *ngIf="!alumni" class="loading">
      <div class="container">
        <p>Loading profile...</p>
      </div>
    </section>
  `,
  styles: [`
    .details-section {
      padding: 3rem 0;
      
      .back-link {
        display: inline-block;
        margin-bottom: 2rem;
        color: var(--text-color);
        opacity: 0.7;
        &:hover { opacity: 1; color: var(--primary-color); }
      }
      
      .profile-header {
        display: flex;
        gap: 3rem;
        margin-bottom: 3rem;
        align-items: center;
        
        @media (max-width: 768px) {
          flex-direction: column;
          text-align: center;
        }
        
        .image-container img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid var(--primary-color);
          box-shadow: var(--shadow);
        }
        
        .info {
          h1 { margin: 0 0 0.5rem; font-size: 2.5rem; }
          .role { font-size: 1.2rem; opacity: 0.8; margin-bottom: 1rem; }
          .meta { margin-bottom: 1.5rem; opacity: 0.8; line-height: 1.6; }
          
          .socials {
            display: flex;
            gap: 1rem;
            
            @media (max-width: 768px) {
              justify-content: center;
            }
          }
        }
      }
      
      .bio {
        background: var(--card-bg);
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        
        h3 { margin-top: 0; color: var(--primary-color); }
        p { line-height: 1.8; opacity: 0.9; }
      }
    }
    
    .loading {
      text-align: center;
      padding: 5rem 0;
    }
  `]
})
export class AlumniDetailsComponent {
  alumniService = inject(AlumniService);
  alumni: Alumni | undefined;

  @Input()
  set id(alumniId: string) {
    this.alumniService.getAlumniById(Number(alumniId)).subscribe(data => {
      this.alumni = data;
    });
  }
}
