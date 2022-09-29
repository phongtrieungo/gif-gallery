import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'gg-loader',
  template: `<div class="lds-dual-ring"></div>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {}
