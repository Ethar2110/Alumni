import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container">
      <section class="about-section">
        <h1>About Alumni Success Hall</h1>
        <p class="mission">
          Our mission is to connect, celebrate, and inspire our global community of graduates.
        </p>
        
        <div class="content">
          <p>
            Founded in 2026, Alumni Success Hall serves as a bridge between past, present, and future students. 
            We believe that the achievements of our alumni are the best testament to the quality of education we provide.
          </p>
          <p>
            Through this platform, we aim to:
          </p>
          <ul>
            <li>Showcase legitimate success stories.</li>
            <li>Facilitate networking opportunities.</li>
            <li>Provide mentorship to current students.</li>
            <li>Celebrate diversity and excellence across all industries.</li>
          </ul>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-section {
      padding: 4rem 0;
      max-width: 800px;
      margin: 0 auto;
      
      h1 { color: var(--primary-color); text-align: center; margin-bottom: 1rem; }
      .mission { font-size: 1.5rem; text-align: center; margin-bottom: 3rem; font-weight: 300; }
      
      .content {
        line-height: 1.8;
        font-size: 1.1rem;
        
        ul {
          padding-left: 2rem;
          li { margin-bottom: 0.5rem; list-style-type: disc; }
        }
      }
    }
  `]
})
export class AboutComponent {}
