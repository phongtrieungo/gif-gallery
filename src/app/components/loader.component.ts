import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'gg-loader',
  template: `<div class="lds-dual-ring"></div>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }
      .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
      }
      .lds-dual-ring:after {
        content: ' ';
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #aa4;
        border-color: #aa4 transparent #aa4 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
      }
      @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent {}