import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Config } from "../model/config.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSubject$ = new BehaviorSubject<Config>({uri: ''});

  setFromObject(configJson: any): void {
    const config: Config = {
      uri: ''
    }
    if (configJson.uri) {
      config.uri = configJson.uri;
    } else {
      throw new Error('uri param is missing from configuration')
    }

    this.configSubject$.next(config);
  }

  get getConfig() {
    return this.configSubject$.getValue();
  }
}
