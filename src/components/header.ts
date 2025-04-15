// src/components/header.ts
import { UIComponent } from './ui-component';
import { ThemeSwitcher } from '../utils/theme-switcher';
import { Moon, Sun } from 'lucide';

export class Header extends UIComponent {
    private themeSwitcher: ThemeSwitcher;

    constructor() {
        super('header', {
            classes: [
                'flex', 'items-center', 'justify-between',
                'p-4', 'bg-white', 'dark:bg-gray-800',
                'shadow-md', 'transition-colors', 'duration-300'
            ]
        });

        this.themeSwitcher = new ThemeSwitcher();
        this.render();
    }

    render(): void {
        this.element.innerHTML = `
      <div class="flex items-center">
        <h1 class="text-2xl font-bold text-primary">Dreamboard</h1>
      </div>
      <div class="flex items-center gap-4">
        <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          ${this.themeSwitcher.darkMode ? Sun : Moon}
        </button>
      </div>
    `;

        const themeToggle = this.element.querySelector('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeSwitcher.toggle();
                this.render(); // Re-render to update the icon
            });
        }
    }
}