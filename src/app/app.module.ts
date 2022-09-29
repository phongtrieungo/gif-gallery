import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as components from './components';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/service/config.service';
import { Config } from './core/model/config.model';
import { lastValueFrom, map, tap } from 'rxjs';

export const CONFIG_PATH = 'assets/config/config.json';

function loadConfig(httpClient: HttpClient, configService: ConfigService): () => Promise<boolean> {
  const getConfigSuccess = httpClient.get<Config>(CONFIG_PATH)
    .pipe(
      tap(response => { configService.setFromObject(response) }),
      map(config => !!config)
    );
  return () => lastValueFrom(getConfigSuccess);
}

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
    CoreModule,
    ...COMPONENTS
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [HttpClient, ConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
