// src/main.ts
import { Header } from './components/header';
import { CanvasBoard } from './components/canvas-board';
import './styles/main.css';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  // Setup header
  const header = new Header();
  header.mount(document.querySelector('#app-header')!);

  // Setup canvas board
  const canvasContainer = document.querySelector('#canvas-container')!;
  const board = new CanvasBoard(canvasContainer as HTMLElement);

  // Listen for theme changes to re-render the canvas
  window.addEventListener('themechange', () => {
    board.render();
  });
});