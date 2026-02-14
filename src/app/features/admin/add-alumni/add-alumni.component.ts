import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlumniService } from '../../../core/services/alumni.service';

@Component({
  selector: 'app-add-alumni',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-alumni.component.html',
  styleUrl: './add-alumni.component.scss'
})
export class AddAlumniComponent {
  private fb = inject(FormBuilder);
  private alumniService = inject(AlumniService);
  private router = inject(Router);

  alumniForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    graduationYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(2100)]],
    degree: ['', [Validators.required]],
    currentPosition: ['', [Validators.required]],
    company: ['', [Validators.required]],
    careerCategory: ['Engineering', [Validators.required]],
    bio: ['', [Validators.required, Validators.minLength(20)]],
    profileImage: ['https://ui-avatars.com/api/?name=New+Alumnus&background=random', [Validators.required]],
    linkedin: [''],
    twitter: [''],
    email: ['', [Validators.email]]
  });

  categories: string[] = [];

  constructor() {
    this.alumniService.getCareerCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  onSubmit() {
    if (this.alumniForm.valid) {
      this.alumniService.addAlumni(this.alumniForm.value).subscribe({
        next: () => {
          alert('Alumnus added successfully!');
          this.router.navigate(['/alumni']);
        },
        error: (err) => {
          console.error('Error adding alumnus:', err);
          alert('Failed to add alumnus. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched(this.alumniForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
