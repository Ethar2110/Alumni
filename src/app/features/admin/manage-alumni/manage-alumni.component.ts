import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlumniService } from '../../../core/services/alumni.service';
import { Alumni } from '../../../core/interfaces/alumni.interface';

@Component({
  selector: 'app-manage-alumni',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-alumni.component.html',
  styleUrl: './manage-alumni.component.scss'
})
export class ManageAlumniComponent {
  alumniService = inject(AlumniService);
  alumniList = this.alumniService.alumni;

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this alumnus?')) {
      this.alumniService.deleteAlumni(id).subscribe({
        next: () => {
          alert('Alumnus deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting alumnus:', err);
          alert('Failed to delete record.');
        }
      });
    }
  }
}
