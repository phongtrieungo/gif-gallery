import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
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
  private customHttpClient: HttpClient = new HttpClient(this.backend);
  private _list: BehaviorSubject<any> = new BehaviorSubject([]);
  private _uploadedGif: BehaviorSubject<any> = new BehaviorSubject(null);

  public readonly list = this._list.asObservable();
  public readonly uploadedGif = this._uploadedGif.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
    private readonly bookmarkService: BookmarkService,
    private readonly backend: HttpBackend
  ) { }

  getTrending(offset: number, keepSearch: boolean): void {
    if (keepSearch === false) {
      this._list.next([]);
    }
    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    this.httpClient
      .get<any>(`${this.baseUrl}trending`, { params })
      .pipe(
        map((response: TrendingResponse) => response.data.map((item) => this.transformResponse(item)) ),
        tap((data) => this._list.next([...this._list.value, ...data])),
        take(1)
      )
      .subscribe();
  }

  getById(id: string) {
    this.httpClient.get(`${this.baseUrl}gifs/${id}`).pipe(
      map((response: any) => response.data),
      map((data: any) => this.transformResponse(data)),
      tap((data) => this._uploadedGif.next(data)),
    ).subscribe();
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
        map((response: TrendingResponse) => response.data.map((item) => this.transformResponse(item))),
        tap((data) => this._list.next([...this._list.value, ...data]))
      )
      .subscribe();
  }

  upload(file: File) {
    let params = new HttpParams();
    const formData = new FormData();
    params = params.append('api_key', 'yUwM3GFwj1XxCagiof8jFxKK3kcM3sT6');
    formData.append('file', file)
    return this.customHttpClient.post('https://upload.giphy.com/v1/gifs', formData, { params, observe: undefined, reportProgress: true })
  }

  private transformResponse(item: any) {
    return {
      thumbnailImg: {
        url: item.images.fixed_width_downsampled.url,
        width: item.images.fixed_width_downsampled.width,
        height: item.images.fixed_width_downsampled.height,
      },
      origin: {
        url: item.images.original.url,
        width: item.images.original.width,
        height: item.images.original.height,
      },
      title: item.title,
      id: item.id,
      bookmarked: this.bookmarkService.checkIdInBookmarkList(item.id),
      userName: item.username
    }
  }
}
