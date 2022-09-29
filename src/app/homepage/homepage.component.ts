import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import * as components from '../components';
import { BookmarkService } from '../core/service/bookmark.service';
import { GifTrendingApiService } from '../core/service/gif-trending-api.service';

@Component({
  standalone: true,
  selector: 'gg-homepage',
  template: `
    <main class="container">
      <section class="header">
        <gg-search (updateSearchTerm)="onChangeSearchTerm($event)"></gg-search>
        <span class="book-mark" title="Bookmark" [routerLink]="['bookmark']">
          <img src="../assets/icons/bookmark-square.svg" alt="Bookmark" />
        </span>
      </section>

      <ng-container *ngIf="(list | async)?.length; else loader">
        <gg-shared-list (reachBottom)="onReachBottom($event)">
          <gg-gif-card
            *ngFor="let item of (list | async); trackBy: trackByFn"
            [gifItem]="item"
            (bookmark)="bookmarkGif($event)"
          ></gg-gif-card>
        </gg-shared-list>
      </ng-container>
    </main>

    <ng-template #loader>
      <gg-loader></gg-loader>
    </ng-template>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: center;

        gg-search {
          flex: 2;
        }
        .book-mark {
          cursor: pointer;
          margin-left: 20px;
          width: 24px;
        }
      }

      .grid-card {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
        gap: 5px;
      }
    `,
  ],
  imports: [
    RouterModule,
    CommonModule,
    components.SearchComponent,
    components.SharedListComponent,
    components.GifCardComponent,
    components.LoaderComponent,
  ],
})
export class HomePage implements OnInit {
  list: Observable<any[]> = this.gifTrendingService.list;
  private currentOffset = 0;
  private currentSearchOffset = 0;

  private fetchTrending = true;
  private searchTerm = '';

  constructor(
    private gifTrendingService: GifTrendingApiService,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.gifTrendingService.getTrending(this.currentOffset, false);
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

  onReachBottom(isInBottom: boolean) {
    if (this.fetchTrending) {
      this.currentOffset = this.currentOffset + 50;
      this.gifTrendingService.getTrending(this.currentOffset, true);
    } else {
      this.currentSearchOffset = this.currentSearchOffset + 50;
      this.gifTrendingService.search(this.searchTerm, this.currentSearchOffset, true);
    }
  }
}
