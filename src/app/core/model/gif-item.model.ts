
export interface GifItem {
    thumbnailImg: {
        url: string,
        width: number,
        height: number
    };
    origin: {
        url: string,
        width: number,
        height: number
    },
    title: string;
    id: string;
    bookmarked: boolean;
    userName: string;
    rating: string;
}

export const initialGifItem: GifItem = {
    id: '',
    thumbnailImg: {
        height: 0,
        url: '',
        width: 0
    },
    origin: {
        height: 0,
        url: '',
        width: 0
    },
    title: '',
    bookmarked: false,
    userName: '',
    rating: ''
}
