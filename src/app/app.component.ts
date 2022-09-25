import { Component, OnInit } from '@angular/core';
import { GifTrendingApiService } from './core/service/gif-trending-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  list: any[] = [];
  constructor(private gifTrendingService: GifTrendingApiService) {}
  
  ngOnInit(): void {
    this.gifTrendingService.get().subscribe(data => {
      this.list = data;
    });
  }
  onChangeSearchTerm(searchTerm: string) {}
}
