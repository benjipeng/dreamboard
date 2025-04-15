// src/components/header.ts
import { UIComponent } from './ui-component';
import { ThemeSwitcher, createIcon } from '../utils';

export class Header extends UIComponent {
    private themeSwitcher: ThemeSwitcher;

    constructor() {
        super('header', {
            classes: 'flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300'
        });

        this.themeSwitcher = new ThemeSwitcher();
        this.render();
    }

    render(): void {
        // Clear the element first
        this.element.innerHTML = '';

        // Create title container
        const titleDiv = document.createElement('div');
        titleDiv.className = 'flex items-center';

        const title = document.createElement('h1');
        title.className = 'text-2xl font-bold text-primary';
        title.textContent = 'Dreamboard';
        titleDiv.appendChild(title);

        // Create controls container
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'flex items-center gap-4';

        // Create theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700';

        // Create the appropriate icon based on the current theme
        const iconName = this.themeSwitcher.darkMode ? 'Sun' : 'Moon';

        // Use the simplified approach with data-lucide for better compatibility
        themeToggle.innerHTML = `<i data-lucide="${iconName}" data-lucide-size="24"></i>`;

        // Add event listener for theme toggle
        themeToggle.addEventListener('click', () => {
            this.themeSwitcher.toggle();
            this.render(); // Re-render to update the icon
        });

        controlsDiv.appendChild(themeToggle);

        // Append containers to the header
        this.element.appendChild(titleDiv);
        this.element.appendChild(controlsDiv);
    }
}