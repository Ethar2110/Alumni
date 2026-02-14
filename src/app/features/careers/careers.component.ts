import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumniService } from '../../core/services/alumni.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  alumniService = inject(AlumniService);
  categories = toSignal(this.alumniService.getCareerCategories(), { initialValue: [] });
}
