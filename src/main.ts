// src/main.ts
import { Header, Toolbar, CanvasBoard } from './components';
import { replaceElements } from './utils';
import './styles/main.css';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  // Setup header
  const header = new Header();
  header.mount(document.querySelector('#app-header')!);

  // Setup toolbar
  const toolbar = new Toolbar();
  toolbar.mount(document.querySelector('#toolbar')!);

  // Setup canvas board
  const canvasContainer = document.querySelector('#canvas-container')!;
  const board = new CanvasBoard(canvasContainer as HTMLElement);

  // Listen for theme changes to re-render the canvas
  window.addEventListener('themechange', () => {
    board.render();
  });

  // Replace any elements with data-lucide attribute
  replaceElements();
});