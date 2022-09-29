import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { TrendingResponse } from '../model/gif-response.model';
import { BookmarkService } from './bookmark.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class GifTrendingApiService {
  private baseUrl = this.configService.getConfig.uri;

  private _list: BehaviorSubject<any> = new BehaviorSubject([]);

  public readonly list = this._list.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
    private readonly bookmarkService: BookmarkService
  ) {}

  getTrending(offset: number, keepSearch: boolean): void {
    if (keepSearch === false) {
      this._list.next([]);
    }
    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    this.httpClient
      .get<any>(`${this.baseUrl}trending`, { params })
      .pipe(
        map((response: TrendingResponse) => {
          return response.data.map((item) => {
            return {
              thumbnailImg: {
                url: item.images.fixed_width_downsampled.url,
                width: item.images.fixed_width_downsampled.width,
                height: item.images.fixed_width_downsampled.height,
              },
              title: item.title,
              id: item.id,
              bookmarked: this.bookmarkService.checkIdInBookmarkList(item.id)
            };
          });
        }),
        tap((data) => this._list.next([...this._list.value, ...data])),
        take(1)
      )
      .subscribe();
  }

  search(term: string, offset: number, keepSearch: boolean): void {
    if (keepSearch === false) {
      this._list.next([]);
    }
    let params = new HttpParams();
    params = params.append('q', term);
    params = params.append('offset', offset.toString());

    this.httpClient
      .get<any>(`${this.baseUrl}search`, { params })
      .pipe(
        map((response: TrendingResponse) => {
          return response.data.map((item) => {
            return {
              thumbnailImg: {
                url: item.images.fixed_width_downsampled.url,
                width: item.images.fixed_width_downsampled.width,
                height: item.images.fixed_width_downsampled.height,
              },
              title: item.title,
              id: item.id,
            };
          });
        }),
        tap((data) => this._list.next([...this._list.value, ...data]))
      )
      .subscribe();
  }
}
