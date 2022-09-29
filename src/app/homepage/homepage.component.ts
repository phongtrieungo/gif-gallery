import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as components from '../components';
import { GifTrendingApiService } from '../core/service/gif-trending-api.service';
import { SearchGifApiService } from '../core/service/search-gif-api.service';

@Component({
  standalone: true,
  selector: 'gg-homepage',
  template: `
    <section class="header">
      <gg-search (updateSearchTerm)="onChangeSearchTerm($event)"></gg-search>
      <span class="book-mark" title="Bookmark" [routerLink]="['bookmark']">
        <img src="../assets/icons/bookmark-square.svg" alt="Bookmark" />
      </span>
    </section>
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
          margin-left: 20px;
          width: 24px;
        }
      }
    `,
  ],
  imports: [RouterModule, components.SearchComponent],
})
export class HomePage implements OnInit {
  list: any[] = [];

  constructor(
    private gifTrendingService: GifTrendingApiService,
    private searchGifService: SearchGifApiService
  ) {}

  ngOnInit(): void {
    // this.gifTrendingService.get().subscribe(data => {
    //   this.list = data;
    // });
  }

  onChangeSearchTerm(searchTerm: string) {
    if (searchTerm) {
      this.searchGifService
        .search(searchTerm)
        .subscribe((data) => (this.list = [...data]));
    }
  }
}
