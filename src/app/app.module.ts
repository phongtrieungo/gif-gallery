import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as components from './components';

const COMPONENTS = [
  components.GifCardComponent,
  components.SearchComponent,
  components.SharedListComponent
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ...COMPONENTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
