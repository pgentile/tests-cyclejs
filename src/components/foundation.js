import { div } from '@cycle/dom';

export function row(...args) {
  return div('.row', ...args);
}

export function column(...args) {
  return div('.column', ...args);
}
