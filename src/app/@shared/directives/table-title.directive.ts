import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[table-title]'
})
export class TableTitleDirective {

  constructor(private element:ElementRef) {
    this.element.nativeElement.style.color="#007192";
    this.element.nativeElement.style.fontFamily="Arial Black";
    this.element.nativeElement.style.fontsize='25px';
    this.element.nativeElement.style.marginLeft='10px';

  }

}
