import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { GifItem, initialGifItem } from "../core/model/gif-item.model";

@Component({
    standalone: true,
    selector: 'gg-gif-card',
    template: `
        <img [src]="gifItem.thumbnailImg.url" [width]="gifItem.thumbnailImg.width" [height]="gifItem.thumbnailImg.height" />
    `,
    styles: [
        `
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
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