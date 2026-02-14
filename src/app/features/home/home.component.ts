import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlumniService } from '../../core/services/alumni.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  alumniService = inject(AlumniService);
  featuredAlumni = toSignal(this.alumniService.getAlumni(), { initialValue: [] });
}
