import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlumniService } from '../../../core/services/alumni.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { CareerFilterPipe } from '../../../shared/pipes/career-filter.pipe';
import { HighlightOnHoverDirective } from '../../../shared/directives/highlight-on-hover.directive';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-alumni-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormsModule, 
    CardComponent, 
    SearchPipe, 
    CareerFilterPipe,
    HighlightOnHoverDirective
  ],
  template: `
    <section class="alumni-list">
      <div class="container">
        <h2>Meet Our Alumni</h2>
        
        <div class="filters">
          <input 
            type="text" 
            [(ngModel)]="searchText" 
            placeholder="Search by name, degree, or company..."
            class="search-box"
          >
          
          <select [(ngModel)]="selectedCategory" class="filter-select">
            <option value="All">All Careers</option>
            @for (category of categories(); track category) {
              <option [value]="category">{{category}}</option>
            }
          </select>
        </div>

        <div class="grid">
          @for (alumni of alumniList() | search:searchText | careerFilter:selectedCategory; track alumni.id) {
            <app-card appHighlightOnHover>
              <div class="alumni-card-content">
                <div class="header">
                  <img [src]="alumni.profileImage" alt="{{alumni.name}}">
                  <div>
                    <h3>{{alumni.name}}</h3>
                    <span class="badge">{{alumni.graduationYear}}</span>
                  </div>
                </div>
                
                <div class="details">
                  <p><strong>Degree:</strong> {{alumni.degree}}</p>
                  <p><strong>Current:</strong> {{alumni.currentPosition}}</p>
                  <p><strong>At:</strong> {{alumni.company}}</p>
                </div>
                
                <a [routerLink]="['/alumni', alumni.id]" class="btn btn-sm btn-outline">View Profile</a>
              </div>
            </app-card>
          } @empty {
            <div class="no-results">
              <p>No alumni found matching your criteria.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .alumni-list {
      padding: 2rem 0;
      
      h2 { text-align: center; margin-bottom: 2rem; }
      
      .filters {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 3rem;
        flex-wrap: wrap;
        
        .search-box {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          width: 100%;
          max-width: 400px;
          background: var(--card-bg);
          color: var(--text-color);
        }
        
        .filter-select {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          background: var(--card-bg);
          color: var(--text-color);
        }
      }
      
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .alumni-card-content {
        .header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
          }
          
          h3 { margin: 0; font-size: 1.2rem; }
          .badge {
            background-color: var(--primary-color);
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
          }
        }
        
        .details {
          margin-bottom: 1.5rem;
          p { margin: 0.5rem 0; font-size: 0.95rem; }
        }
        
        .btn { width: 100%; text-align: center; display: block; }
      }
      
      .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        font-size: 1.2rem;
        opacity: 0.7;
      }
    }
  `]
})
export class AlumniListComponent {
  alumniService = inject(AlumniService);
  alumniList = toSignal(this.alumniService.getAlumni(), { initialValue: [] });
  categories = toSignal(this.alumniService.getCareerCategories(), { initialValue: [] });
  
  searchText = '';
  selectedCategory = 'All';
}
