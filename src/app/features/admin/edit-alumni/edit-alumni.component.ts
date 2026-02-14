import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlumniService } from '../../../core/services/alumni.service';
import { Alumni } from '../../../core/interfaces/alumni.interface';

@Component({
  selector: 'app-edit-alumni',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-alumni.component.html',
  styleUrl: './edit-alumni.component.scss'
})
export class EditAlumniComponent implements OnInit {
  private fb = inject(FormBuilder);
  private alumniService = inject(AlumniService);
  private router = inject(Router);

  @Input() id!: string; // From router data

  alumniForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    graduationYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(2100)]],
    degree: ['', [Validators.required]],
    currentPosition: ['', [Validators.required]],
    company: ['', [Validators.required]],
    careerCategory: ['Engineering', [Validators.required]],
    bio: ['', [Validators.required, Validators.minLength(20)]],
    profileImage: ['', [Validators.required]],
    linkedin: [''],
    twitter: [''],
    email: ['', [Validators.email]]
  });

  categories: string[] = [];
  loading = true;

  ngOnInit() {
    this.alumniService.getCareerCategories().subscribe(cats => {
      this.categories = cats;
    });

    if (this.id) {
      this.alumniService.getAlumniById(Number(this.id)).subscribe(alumni => {
        if (alumni) {
          this.alumniForm.patchValue(alumni);
          this.loading = false;
        } else {
          alert('Alumnus not found');
          this.router.navigate(['/admin/manage-alumni']);
        }
      });
    }
  }

  onSubmit() {
    if (this.alumniForm.valid) {
      this.alumniService.updateAlumni(Number(this.id), this.alumniForm.value).subscribe({
        next: () => {
          alert('Alumnus updated successfully!');
          this.router.navigate(['/admin/manage-alumni']);
        },
        error: (err) => {
          console.error('Error updating alumnus:', err);
          alert('Failed to update alumnus.');
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
