import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../core/service/bookmark.service';
import * as components from '../shared/components';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'gg-bookmark',
  template: `
    <section class="container">
      <h1>Bookmarked GIF</h1>
      <hr>
      <gg-shared-list>
        <gg-gif-card
          *ngFor="let item of list; trackBy: trackByFn"
          [gifItem]="item"
        ></gg-gif-card>
      </gg-shared-list>
    </section>
  `,
  styles: [``],
  imports: [CommonModule, components.CardComponent, components.SharedListComponent],
})
export class BookmarkComponent implements OnInit {
  list = [];
  constructor(private readonly bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.list = this.bookmarkService.getBookmark();
  }

  trackByFn(item: any) {
    return item.id;
  }
}
