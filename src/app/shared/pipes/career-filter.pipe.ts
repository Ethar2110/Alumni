import { Pipe, PipeTransform } from '@angular/core';
import { Alumni } from '../../core/interfaces/alumni.interface';

@Pipe({
  name: 'careerFilter',
  standalone: true
})
export class CareerFilterPipe implements PipeTransform {

  transform(items: Alumni[] | null, category: string): Alumni[] {
    if (!items) return [];
    if (!category || category === 'All') return items;

    return items.filter(it => it.careerCategory === category);
  }

}
