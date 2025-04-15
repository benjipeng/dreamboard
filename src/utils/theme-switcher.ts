// src/utils/theme-switcher.ts
export class ThemeSwitcher {
    private isDarkMode: boolean;

    constructor() {
        // Check system preference
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.applyTheme();

        // Listen for changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            this.isDarkMode = e.matches;
            this.applyTheme();
        });
    }

    toggle(): void {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
    }

    private applyTheme(): void {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Dispatch event for canvas to redraw
        window.dispatchEvent(new CustomEvent('themechange'));
    }

    get darkMode(): boolean {
        return this.isDarkMode;
    }
}