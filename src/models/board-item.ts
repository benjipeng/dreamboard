// src/models/board-item.ts
export interface BoardItem {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    image?: HTMLImageElement;
    title: string;
    description?: string;
    draggable: boolean;
    category?: string;
    zIndex?: number;
}