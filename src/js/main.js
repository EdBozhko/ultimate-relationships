import { App } from './modules/App.js';
import { menu, setMenu } from './modules/menu.js';
import {
  showFullMenu,
  setFullMenu,
  fullMenu,
  fullMenuClose,
  fullMenuList,
  menuButtons,
  menuContainer,
} from './modules/fullMenu.js';
import { switchMenuSide, currentMenuSide } from './modules/switchMenuSide.js';
import { Burger } from './modules/burger.js';
import { timerHandler } from './modules/timerHandler.js';
import { cardForm } from './modules/card-form.js';

export let state =
  localStorage.getItem('r3dss') === null ? { state: {} } : { state: {}, ...JSON.parse(localStorage.getItem('r3dss')) };
export const updateState = (propertyToUpdate = {}) => {
  state.state = { ...state.state, ...propertyToUpdate };

  localStorage.setItem('r3dss', JSON.stringify(state.state));
};

export const initialState = JSON.parse(localStorage.getItem('r3dss'));

window.r3dss = {};
window.r3dss.burger = new Burger();

////

export const app = new App();
app.init();

window.r3dss.app = app;
////////////

setMenu(menuButtons, 1);

///////
const ageVerificationBanner = () => {
  const fullMenu = [
    {
      id: 'age-restriction-warning',
      name: '<span>This is an adult website</span><span>This website contains age-restricted materials including nudity and explicit depictions of sexual activity. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from and you consent to viewing sexually explicit content.</span>',
      onclick: () => {},
      classNames: ['--age-restriction__text'],
    },

    {
      id: 'age-restriction-adult',
      name: 'I am 18 or older - Enter',
      onclick: () => {
        updateState({ isAdult: true });
        menuSideSetup();
        window.r3dss.burger.showMenuControl();
        fullMenuClose.classList.remove('hide');

        const manual = document.querySelector('.manual');
        manual.classList.remove('hide');
        manual.addEventListener(
          'click',
          () => {
            manual.classList.add('hide');
          },
          { once: true }
        );
      },
      classNames: ['--age-restriction__button'],
    },

    {
      id: 'age-restriction-minor',
      name: ' I am under 18 - Exit',
      onclick: () => {
        window.location.href = 'https://google.com';
      },
      classNames: ['--age-restriction__button'],
    },
  ];

  showFullMenu(fullMenu);
};

///////
const menuSideSetup = () => {
  switchMenuSide();

  const fullMenu = [
    {
      ...menu.level[2][2].list[0],
      name: `${menu.level[2][2].list[0].name} You can always change it in the settings.`,
    },
  ];

  showFullMenu(fullMenu);
  updateState({ menuSide: currentMenuSide });
};

/////

const init = () => {
  const timerParam = new URLSearchParams(window.location.search).get('timer');

  if (!timerParam || !(timerParam === 'off')) {
    if (initialState?.timer) {
      timerHandler(initialState.timer < 0 ? 0 : initialState.timer, () => {
        if (!fullMenuClose.classList.contains('hide')) {
          fullMenuClose.classList.add('hide');
        }
        showFullMenu([], false, cardForm());
      });
    } else {
      const timer = 5;
      updateState({ timer });
      timerHandler(timer, () => {
        if (!fullMenuClose.classList.contains('hide')) {
          fullMenuClose.classList.add('hide');
        }
        showFullMenu([], false, cardForm());
      });
    }
  }

  if (initialState && initialState.menuSide) {
    window.r3dss.burger.showMenuControl();
    switchMenuSide(initialState.menuSide);
  } else {
    fullMenuClose.classList.add('hide');
    ageVerificationBanner();
  }
};
init();
