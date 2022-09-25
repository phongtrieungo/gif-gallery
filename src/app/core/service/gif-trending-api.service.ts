import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GifItem } from "../model/gif-item.model";

interface TrendingResponse {
    data: any[];
    meta: any;
    pagination: any;
}

@Injectable({
    providedIn: 'root'
})
export class GifTrendingApiService {
    constructor(private readonly httpClient: HttpClient) {}

    get(): Observable<any[]> {
        let params = new HttpParams();

        params = params.append('api_key', 'yUwM3GFwj1XxCagiof8jFxKK3kcM3sT6');

        return this.httpClient.get<any>('https://api.giphy.com/v1/gifs/trending', { params }).pipe(
            map((response: TrendingResponse) => {
                return response.data.map(item => {
                    return {
                        thumbnailImg: {
                            url: item.url,
                            width: item.width,
                            height: item.height
                        },
                        title: item.title,
                        id: item.id,
                        embedUrl: item.embed_url
                    }
                })
            })
        );
    }
}