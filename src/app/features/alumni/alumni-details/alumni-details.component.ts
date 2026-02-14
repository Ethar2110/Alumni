import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlumniService } from '../../../core/services/alumni.service';
import { Alumni } from '../../../core/interfaces/alumni.interface';

@Component({
  selector: 'app-alumni-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alumni-details.component.html',
  styleUrl: './alumni-details.component.scss'
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
