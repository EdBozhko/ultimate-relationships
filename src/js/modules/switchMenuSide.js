import { state } from '../main.js';

import { updateState } from '../main.js';

const initialMenuSide = 'right';
export let currentMenuSide = initialMenuSide;
export const switchMenuSide = (side = initialMenuSide) => {
  const menuControlContainer = document.querySelector('.menu__control-container');

  document.documentElement.classList.remove(`--${currentMenuSide}`);
  document.documentElement.classList.add(`--${side}`);
  currentMenuSide = side;

  updateState({ menuSide: currentMenuSide });
};
