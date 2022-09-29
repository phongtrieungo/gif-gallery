import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmark(item: any) {
    const favoriteGifList = JSON.parse(localStorage.getItem('bookmark') || '[]');
    let list = [];
    if (favoriteGifList) {
      list = [...favoriteGifList, item];
    } else {
      list = [item];
    }

    localStorage.setItem('bookmark', JSON.stringify(list));
  }

  getBookmark(): [] {
    return JSON.parse(localStorage.getItem('bookmark') || '[]');
  }

  getBookmarkById(): [] {
    const bookmarkedItems = JSON.parse(localStorage.getItem('bookmark') || '[]');

    return (bookmarkedItems || []).map((item: { id: any; }) => item.id);
  }

  checkIdInBookmarkList(id: string) {
    return !!this.getBookmarkById().find(bookmarkedId => bookmarkedId === id);
  }
}
