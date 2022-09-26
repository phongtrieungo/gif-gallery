import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { TrendingResponse } from "../model/gif-response.model";

@Injectable({
    providedIn: 'root'
})
export class SearchGifApiService {
    constructor(private readonly httpClient: HttpClient) {}

    search(term: string): Observable<any[]> {
        let params = new HttpParams();

        params = params.append('api_key', 'yUwM3GFwj1XxCagiof8jFxKK3kcM3sT6');
        params = params.append('q', term);
        
        return this.httpClient.get<any>('https://api.giphy.com/v1/gifs/search', { params }).pipe(
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