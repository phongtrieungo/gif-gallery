import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { GifItem, initialGifItem } from "../core/model/gif-item.model";

@Component({
    standalone: true,
    selector: 'gg-gif-card',
    template: `
        <span class="card-wrapper">
          <span class="favorite-wrapper">
            <img src="../../assets/icons/outline-heart.svg" class="favorite" />
          </span>
          <img [src]="gifItem.thumbnailImg.url" [width]="gifItem.thumbnailImg.width" [height]="gifItem.thumbnailImg.height" />
          <p class="text">{{ gifItem.title }}</p>
        </span>
    `,
    styles: [
        `
            .card-wrapper {
              position: relative;
            }

            .favorite-wrapper {
              position: absolute;
              right: 10px;
              width: 30px;
              height: 30px;
              margin-top: 10px;
              cursor: pointer;
            }

            .card-wrapper .favorite {
              width: 24px;
              height: 24px;
              background-color: white;
              border-radius: 50%;
              padding: 2px;
              cursor: pointer;
            }

            .card-wrapper .text {
              position: absolute;
              bottom: 10px;
              left: 10px;
              color: white;
              padding: 5px;
              background-color: blueviolet;
              margin-right: 10px;
              border-radius: 5px;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            }
            img:hover {
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              cursor: url('../../assets/icons/magnifying-glass.svg') 24 24, pointer;
            }
        `
    ]
})
export class GifCardComponent implements OnInit {
    @Input() gifItem: GifItem = initialGifItem;


    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit(): void {
    }
}
