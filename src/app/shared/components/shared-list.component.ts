import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'gg-shared-list',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(var(--column), minmax(0, 1fr));
        row-gap: 15px;
        column-gap: 15px;
        overflow-y: scroll;
      }
    `,
  ],
})
export class SharedListComponent {

  scrollEnd = false;

  @Output() reachBottom = new EventEmitter<boolean>();

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight - 1
    ) {
      this.scrollEnd = true;
      this.reachBottom.emit(this.scrollEnd);
    }
  }
}
