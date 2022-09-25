import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { GifItem, initialGifItem } from "../core/model/gif-item.model";

@Component({
    standalone: true,
    selector: 'gg-gif-card',
    template: `
        <iframe [src]="sanitizer.bypassSecurityTrustResourceUrl(gifItem.embedUrl)" [width]="gifItem.thumbnailImg.width" [height]="gifItem.thumbnailImg.height"></iframe>
    `
})
export class GifCardComponent {
    @Input() gifItem: GifItem = initialGifItem;

    constructor(public sanitizer: DomSanitizer) {}
}