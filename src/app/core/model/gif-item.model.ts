export interface GifItem {
    thumbnailImg: {
        url: string,
        width: number,
        height: number
    };
    title: string;
    id: string;
    embedUrl: string
}

export const initialGifItem: GifItem = {
    embedUrl: '',
    id: '',
    thumbnailImg: {
        height: 0,
        url: '',
        width: 0
    },
    title: ''
}