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
  templateUrl: './alumni-list.component.html',
  styleUrl: './alumni-list.component.scss'
})
export class AlumniListComponent {
  alumniService = inject(AlumniService);
  alumniList = this.alumniService.alumni;
  categories = toSignal(this.alumniService.getCareerCategories(), { initialValue: [] });
  
  searchText = '';
  selectedCategory = 'All';
}
