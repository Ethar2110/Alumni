import { Pipe, PipeTransform } from '@angular/core';
import { Alumni } from '../../core/interfaces/alumni.interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: Alumni[] | null, searchText: string): Alumni[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return (it.name?.toLowerCase().includes(searchText)) || 
             (it.degree?.toLowerCase().includes(searchText)) ||
             (it.company?.toLowerCase().includes(searchText));
    });
  }
}
