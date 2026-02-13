import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="contact-wrapper">
        <div class="info">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Reach out for inquiries, support, or feedback.</p>
          
          
          <div class="details">
            <p><strong>📍 Address:</strong> 123 University Ave, Tech City</p>
            <p><strong>📧 Email:</strong> contact&#64;alumni-hall.com</p>
            <p><strong>☎️ Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div class="form-container">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" formControlName="name">
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" formControlName="email">
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" formControlName="message" rows="5"></textarea>
            </div>
            
            <button type="submit" class="btn" [disabled]="contactForm.invalid || submitted">
              {{ submitted ? 'Sent!' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 4rem 1rem; }
    
    .contact-wrapper {
      display: flex;
      gap: 4rem;
      max-width: 900px;
      margin: 0 auto;
      
      @media (max-width: 768px) { flex-direction: column; gap: 2rem; }
    }
    
    .info {
      flex: 1;
      h1 { color: var(--primary-color); margin-bottom: 1rem; }
      p { margin-bottom: 1.5rem; line-height: 1.6; }
      
      .details p { margin-bottom: 1rem; }
    }
    
    .form-container {
      flex: 1;
      background: var(--card-bg);
      padding: 2rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      
      .form-group {
        margin-bottom: 1.5rem;
        label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        input, textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: var(--background-color);
          color: var(--text-color);
        }
      }
      
      .btn { width: 100%; }
    }
  `]
})
export class ContactComponent {
  fb = inject(FormBuilder);
  submitted = false;

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitted = true;
      // Mock submission
      setTimeout(() => {
        this.submitted = false;
        this.contactForm.reset();
        alert('Message sent successfully!');
      }, 2000);
    }
  }
}
