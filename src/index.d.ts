import { KaravaiOptions } from './types';
export default class Karavai {
    private images;
    private canvasRef;
    private options;
    private startPosition;
    private readonly context;
    constructor(images: string[], canvasRef: HTMLCanvasElement, options?: KaravaiOptions);
    preloadImages: () => Promise<Event[]>;
    start: () => void;
    stop: () => void;
    private subscribe;
    private unsubscribe;
    private onScroll;
    private drawImageOnCanvas;
}
