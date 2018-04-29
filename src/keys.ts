import * as keycode from 'keycode';

/**
 * @example keydown.enter === true
 */
const keydown: Dictionary<boolean> = {};

window.addEventListener('keydown', e => {
  keydown[keycode(event)] = true;
});

window.addEventListener('keyup', e => {
  keydown[keycode(event)] = false;
});

export default keydown;
