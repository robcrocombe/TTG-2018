import * as ml from 'mainloop.js';
import * as state from './state';

const loop: MainLoop = ml;

window.addEventListener('focus', () => {
  loop.start();
});

window.addEventListener('blur', () => {
  loop.stop();
});

function draw() {
  state.draw(loop.getFPS());
}

document.addEventListener('DOMContentLoaded', () => {
  loop
    .setUpdate(state.update)
    .setDraw(draw)
    .start();
});
