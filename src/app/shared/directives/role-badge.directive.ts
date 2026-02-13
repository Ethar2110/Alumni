import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRoleBadge]',
  standalone: true
})
export class RoleBadgeDirective implements OnChanges {
  @Input('appRoleBadge') role: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0.25rem 0.5rem');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '4px');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '0.8rem');
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['role']) {
      this.updateColor();
    }
  }

  private updateColor() {
    if (this.role === 'admin') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#dc3545'); // Red
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#007bff'); // Blue
    }
  }

}
