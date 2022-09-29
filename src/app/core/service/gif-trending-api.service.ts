import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { TrendingResponse } from "../model/gif-response.model";
import { ConfigService } from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class GifTrendingApiService {
    private baseUrl = this.configService.getConfig.uri;

    constructor(private readonly httpClient: HttpClient, private readonly configService: ConfigService) {}

    get(): Observable<any[]> {

        return this.httpClient.get<any>(`${this.baseUrl}trending`).pipe(
            map((response: TrendingResponse) => {
                return response.data.map(item => {
                    return {
                        thumbnailImg: {
                            url: item.images.fixed_width_downsampled.url,
                            width: item.images.fixed_width_downsampled.width,
                            height: item.images.fixed_width_downsampled.height
                        },
                        title: item.title,
                        id: item.id,
                    }
                });
            })
        );
    }
}
