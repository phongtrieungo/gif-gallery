import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import * as components from '../shared/components';
import { GifItem, initialGifItem } from '../core/model/gif-item.model';
import { BookmarkService } from '../core/service/bookmark.service';
import { GifTrendingApiService } from '../core/service/gif-trending-api.service';

@Component({
  standalone: true,
  selector: 'gg-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [
    RouterModule,
    CommonModule,
    components.SearchComponent,
    components.SharedListComponent,
    components.CardComponent,
    components.LoaderComponent,
  ],
})
export class HomePage implements OnInit {
  list: Observable<any[]> = this.gifTrendingService.list;
  isOpen = false;
  selectedItem: GifItem = initialGifItem;
  private currentOffset = 0;
  private currentSearchOffset = 0;

  private fetchTrending = true;
  private searchTerm = '';

  constructor(
    private gifTrendingService: GifTrendingApiService,
    private bookmarkService: BookmarkService
  ) { }

  ngOnInit(): void {
    this.gifTrendingService.getTrending(this.currentOffset, false);

    this.gifTrendingService.uploadedGif.subscribe(uploaded => {
      if (uploaded) {
        this.selectedItem = uploaded;
        this.isOpen = true;
      }
    });
  }

  onChangeSearchTerm(searchTerm: string) {
    if (searchTerm) {
      this.currentSearchOffset = 0
      this.fetchTrending = false;
      this.searchTerm = searchTerm;
      this.gifTrendingService.search(searchTerm, 0, false);
    } else {
      this.fetchTrending = true;
      this.gifTrendingService.getTrending(0, false);
    }
  }

  bookmarkGif(item: any) {
    this.bookmarkService.bookmark(item);
  }

  trackByFn(item: any) {
    return item.id;
  }

  expand(item: any) {
    this.selectedItem = item;
    this.isOpen = true;
  }

  onReachBottom(isInBottom: boolean) {
    if (this.fetchTrending) {
      this.currentOffset = this.currentOffset + 50;
      this.gifTrendingService.getTrending(this.currentOffset, true);
    } else {
      this.currentSearchOffset = this.currentSearchOffset + 50;
      this.gifTrendingService.search(this.searchTerm, this.currentSearchOffset, true);
    }
  }

  onUpload(event: any) {
    const file: File = event.target.files[0];
    this.gifTrendingService.upload(file).subscribe((response: any) => this.gifTrendingService.getById(response.data.id));
  }
}
