import { UIComponent } from './ui-component';
import { createIcon } from '../utils';

export class Toolbar extends UIComponent {
    constructor() {
        super('div', {
            classes: 'flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300'
        });

        this.render();
    }

    render(): void {
        // Clear the element first
        this.element.innerHTML = '';

        // Create left section
        const leftSection = document.createElement('div');
        leftSection.className = 'flex items-center space-x-2';

        const title = document.createElement('h2');
        title.className = 'text-lg font-medium text-gray-700 dark:text-gray-200';
        title.textContent = 'My Dreamboard';
        leftSection.appendChild(title);

        // Create right section with controls
        const rightSection = document.createElement('div');
        rightSection.className = 'flex items-center space-x-4';

        // Method 1: Using createIcon utility directly
        const zoomInBtn = document.createElement('button');
        zoomInBtn.id = 'zoom-in';
        zoomInBtn.className = 'p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full';

        // Use our custom icon creator, providing a fallback name in case the exact name doesn't exist
        const zoomInIcon = createIcon('ZoomIn' as any, { size: 20 });
        if (zoomInIcon) {
            zoomInBtn.appendChild(zoomInIcon);
        } else {
            // Fallback simple SVG
            zoomInBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
            `;
        }

        zoomInBtn.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('canvas:zoom', { detail: { direction: 'in' } }));
        });

        // Method 2: Using data-lucide attribute (will be replaced by replaceElements())
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.id = 'zoom-out';
        zoomOutBtn.className = 'p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full';
        zoomOutBtn.innerHTML = '<i data-lucide="zoom-out" data-lucide-size="20"></i>';

        zoomOutBtn.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('canvas:zoom', { detail: { direction: 'out' } }));
        });

        // Method 3: Using innerHTML with SVG directly
        const resetViewBtn = document.createElement('button');
        resetViewBtn.id = 'reset-view';
        resetViewBtn.className = 'p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full';

        // This is a simplified version of what the createIcon function would generate
        resetViewBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
        `;

        resetViewBtn.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('canvas:reset'));
        });

        // Add all buttons to right section
        rightSection.appendChild(zoomInBtn);
        rightSection.appendChild(zoomOutBtn);
        rightSection.appendChild(resetViewBtn);

        // Add both sections to the toolbar
        this.element.appendChild(leftSection);
        this.element.appendChild(rightSection);
    }
} 