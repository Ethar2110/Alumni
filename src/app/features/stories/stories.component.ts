import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="container">
      <h1>Success Stories</h1>
      
      <div class="stories-list">
        <app-card customClass="story-card">
          <div class="story-content">
             <div class="image-wrapper">
                <img src="https://placehold.co/600x400/00C4AD/white?text=Success+Story" alt="Story Image" style="background: #ddd; width: 100%; height: 200px; object-fit: cover;">
             </div>
             <div class="text">
               <h3>From Campus to CEO</h3>
               <p class="author">By Michael Brown, Class of 2015</p>
               <p class="excerpt">"The journey wasn't easy, but the foundation I built here was instrumental..."</p>
               <button class="btn btn-sm">Read Full Story</button>
             </div>
          </div>
        </app-card>
        
        <app-card customClass="story-card">
          <div class="story-content">
             <div class="image-wrapper">
                <img src="https://placehold.co/600x400/00C4AD/white?text=Success+Story" alt="Story Image" style="background: #ddd; width: 100%; height: 200px; object-fit: cover;">
             </div>
             <div class="text">
               <h3>Innovating in Healthcare</h3>
               <p class="author">By Emily Davis, Class of 2020</p>
               <p class="excerpt">"Every day I apply the principles of patient-centered care I learned..."</p>
               <button class="btn btn-sm">Read Full Story</button>
             </div>
          </div>
        </app-card>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 4rem 1rem; }
    h1 { text-align: center; margin-bottom: 3rem; }
    
    .stories-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .story-card {
       padding: 0;
       overflow: hidden;
       
       .story-content {
         display: flex;
         @media (max-width: 600px) { flex-direction: column; }
       }
       
       .image-wrapper {
         flex: 1;
         min-width: 250px;
       }
       
       .text {
         flex: 2;
         padding: 2rem;
         
         h3 { margin: 0 0 0.5rem; color: var(--primary-color); }
         .author { font-style: italic; opacity: 0.7; margin-bottom: 1rem; }
         .excerpt { line-height: 1.6; margin-bottom: 1.5rem; }
       }
    }
  `]
})
export class StoriesComponent {}
