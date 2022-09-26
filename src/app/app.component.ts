import { Component, HostListener, OnInit } from '@angular/core';
import { GifTrendingApiService } from './core/service/gif-trending-api.service';
import { SearchGifApiService } from './core/service/search-gif-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  list: any[] = [];

  constructor(private gifTrendingService: GifTrendingApiService, private searchGifService: SearchGifApiService) {}

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    console.info({height: window.innerHeight, width: window.innerWidth });
  }
  
  ngOnInit(): void {
    this.getScreenSize();
    this.gifTrendingService.get().subscribe(data => {
      this.list = data;
    });
  }
  onChangeSearchTerm(searchTerm: string) {
    if (searchTerm) {
      this.searchGifService.search(searchTerm).subscribe(data => this.list = [...data]);
    }
  }
}
