import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list: any[] = [];

  constructor() {}

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    console.info({height: window.innerHeight, width: window.innerWidth });
  }
}
