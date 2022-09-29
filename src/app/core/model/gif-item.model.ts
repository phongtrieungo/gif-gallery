
export interface GifItem {
    thumbnailImg: {
        url: string,
        width: number,
        height: number
    };
    title: string;
    id: string;
    bookmarked: boolean;
}

export const initialGifItem: GifItem = {
    id: '',
    thumbnailImg: {
        height: 0,
        url: '',
        width: 0
    },
    title: '',
    bookmarked: false
}
