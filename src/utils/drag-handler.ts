// src/utils/drag-handler.ts
import { BoardItem } from '../models';

export class DragHandler {
    private isDragging = false;
    private selectedItem: BoardItem | null = null;
    private dragOffsetX = 0;
    private dragOffsetY = 0;

    constructor(
        private canvas: HTMLCanvasElement,
        private items: BoardItem[],
        private onDragCallback: () => void
    ) {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    private handleMouseDown(e: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.startDrag(x, y);
    }

    private handleMouseMove(e: MouseEvent): void {
        if (!this.isDragging || !this.selectedItem) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.drag(x, y);
    }

    private handleMouseUp(): void {
        this.endDrag();
    }

    private handleTouchStart(e: TouchEvent): void {
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.startDrag(x, y);
        e.preventDefault();
    }

    private handleTouchMove(e: TouchEvent): void {
        if (!this.isDragging || !this.selectedItem || e.touches.length !== 1) return;

        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.drag(x, y);
        e.preventDefault();
    }

    private handleTouchEnd(e: TouchEvent): void {
        this.endDrag();
        e.preventDefault();
    }

    private startDrag(x: number, y: number): void {
        // Find which item was clicked (in reverse order to get the top one)
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (item.draggable && this.isPointInItem(x, y, item)) {
                this.isDragging = true;
                this.selectedItem = item;
                this.dragOffsetX = x - item.x;
                this.dragOffsetY = y - item.y;
                break;
            }
        }
    }

    private drag(x: number, y: number): void {
        if (this.selectedItem) {
            this.selectedItem.x = x - this.dragOffsetX;
            this.selectedItem.y = y - this.dragOffsetY;
            this.onDragCallback();
        }
    }

    private endDrag(): void {
        this.isDragging = false;
        this.selectedItem = null;
    }

    private isPointInItem(x: number, y: number, item: BoardItem): boolean {
        return x >= item.x && x <= item.x + item.width &&
            y >= item.y && y <= item.y + item.height;
    }
}

// Add a default export to ensure module is properly recognized
export default DragHandler;