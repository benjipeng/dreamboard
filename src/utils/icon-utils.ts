import * as lucideIcons from 'lucide';

// Type for icon name
export type IconName = keyof typeof lucideIcons;

/**
 * Creates an SVG element from a Lucide icon
 * @param iconName Name of the icon from Lucide library
 * @param options Additional options for the icon
 * @returns SVG element
 */
export function createIcon(
    iconName: IconName,
    options: {
        size?: number;
        color?: string;
        strokeWidth?: number;
        className?: string;
    } = {}
): SVGSVGElement | null {
    // Default values
    const {
        size = 24,
        color = 'currentColor',
        strokeWidth = 2,
        className = ''
    } = options;

    // Check if the icon exists
    if (!(iconName in lucideIcons)) {
        console.error(`Icon "${iconName}" not found in Lucide icons`);
        return null;
    }

    // Create a temporary element
    const tempEl = document.createElement('div');
    tempEl.innerHTML = `<i data-lucide="${iconName}"></i>`;
    const iconEl = tempEl.querySelector('i');

    if (iconEl) {
        // Set attributes
        iconEl.setAttribute('width', size.toString());
        iconEl.setAttribute('height', size.toString());
        iconEl.setAttribute('stroke', color);
        iconEl.setAttribute('stroke-width', strokeWidth.toString());
        if (className) {
            iconEl.className = className;
        }

        // Try to use Lucide's createIcons function
        try {
            // @ts-ignore - ignore type errors for now
            lucideIcons.createIcons({
                icons: {
                    [iconName]: lucideIcons[iconName]
                },
                attrs: {
                    width: size.toString(),
                    height: size.toString(),
                    stroke: color,
                    'stroke-width': strokeWidth.toString()
                }
            });

            // Get the SVG that was created
            const svg = tempEl.querySelector('svg');

            if (svg) {
                return svg as SVGSVGElement;
            }
        } catch (e) {
            console.warn('Error using Lucide createIcons:', e);
        }
    }

    // Fallback to a simple SVG
    tempEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${className}"></svg>`;

    return tempEl.querySelector('svg') as SVGSVGElement;
}

/**
 * Replace all elements with data-lucide attribute with the corresponding icon
 */
export function replaceElements(): void {
    try {
        // Use Lucide's built-in function to replace all icons
        // @ts-ignore - ignore type errors for now
        lucideIcons.createIcons();
    } catch (error) {
        console.error('Error replacing Lucide icons:', error);

        // Fallback implementation if createIcons fails
        try {
            document.querySelectorAll('[data-lucide]').forEach((el) => {
                try {
                    const iconName = el.getAttribute('data-lucide') as IconName;
                    if (!iconName || !(iconName in lucideIcons)) return;

                    const size = parseInt(el.getAttribute('data-lucide-size') || '24', 10);
                    const color = el.getAttribute('data-lucide-color') || 'currentColor';
                    const strokeWidth = parseFloat(el.getAttribute('data-lucide-stroke-width') || '2');
                    const className = el.getAttribute('class') || '';

                    const svgElement = createIcon(iconName, { size, color, strokeWidth, className });
                    if (svgElement && el.parentNode) {
                        el.parentNode.replaceChild(svgElement, el);
                    }
                } catch (elementError) {
                    console.error('Error replacing icon element:', elementError);
                }
            });
        } catch (fallbackError) {
            console.error('Fallback icon replacement also failed:', fallbackError);
        }
    }
} 