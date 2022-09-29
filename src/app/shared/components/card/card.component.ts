import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GifItem, initialGifItem } from "../../../core/model/gif-item.model";

@Component({
    standalone: true,
    selector: 'gg-gif-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() gifItem: GifItem = initialGifItem;

    @Output() bookmark = new EventEmitter();
    @Output() expand = new EventEmitter();

    ngOnInit(): void {
    }

    onBookmark() {
      this.bookmark.emit({...this.gifItem, bookmarked: true });
    }

    onExpand() {
      this.expand.emit(this.gifItem);
    }
}
