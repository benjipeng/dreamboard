// src/components/canvas-board.ts
import { UIComponent } from './ui-component';
import { BoardItem } from '../models/board-item';
import { DragHandler } from '../utils/drag-handler';

export class CanvasBoard extends UIComponent {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private items: BoardItem[] = [];
    private dragHandler: DragHandler;

    constructor(parent: HTMLElement) {
        super('div', {
            classes: ['w-full', 'h-full', 'relative'],
            parent
        });

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'absolute inset-0 w-full h-full';
        this.element.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d')!;
        this.resizeCanvas();

        window.addEventListener('resize', () => this.resizeCanvas());

        // Initialize pre-baked items
        this.initializeItems();

        // Setup drag handling
        this.dragHandler = new DragHandler(this.canvas, this.items, () => this.render());

        // Initial render
        this.render();
    }

    private resizeCanvas(): void {
        const rect = this.element.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.render();
    }

    private initializeItems(): void {
        // Load pre-baked items from configuration
        // Example:
        this.items = [
            {
                id: 'dream1',
                x: 100,
                y: 100,
                width: 200,
                height: 150,
                image: new Image(),
                title: 'Career Goal',
                draggable: true
            },
            // More pre-baked items...
        ];

        // Load images
        this.items.forEach(item => {
            if (item.image) {
                item.image.src = `/src/assets/dream-items/${item.id}.png`;
                item.image.onload = () => this.render();
            }
        });
    }

    render(): void {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        const isDarkMode = document.documentElement.classList.contains('dark');
        this.ctx.fillStyle = isDarkMode ? '#0f172a' : '#f8fafc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Add some background patterns/decorations

        // Draw items
        this.items.forEach(item => {
            if (item.image && item.image.complete) {
                this.ctx.drawImage(item.image, item.x, item.y, item.width, item.height);

                // Draw title if needed
                this.ctx.fillStyle = isDarkMode ? '#ffffff' : '#1e293b';
                this.ctx.font = '16px sans-serif';
                this.ctx.fillText(item.title, item.x, item.y - 10);
            }
        });
    }
}