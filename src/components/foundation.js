import { h } from '@cycle/dom';

export function row(...args) {
  return h('div.row', ...args);
}

export function column(...args) {
  return h('div.column', ...args);
}
