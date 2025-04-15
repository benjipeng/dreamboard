export interface ComponentOptions {
    id?: string;
    classes?: string;
    parent?: HTMLElement;
}

export class UIComponent {
    protected element: HTMLElement;
    constructor(tagName: string, options: ComponentOptions) {
        this.element = document.createElement(tagName);
        if (options.id) this.element.id = options.id;
        if (options.classes) this.element.classList.add(...options.classes.split(' '));
        if (options.parent) options.parent.appendChild(this.element);
    }

    render(): void {
        // Logics
    }

    mount(parent: HTMLElement): void {
        parent.appendChild(this.element);
    }

    get el(): HTMLElement {
        return this.element;
    }
}