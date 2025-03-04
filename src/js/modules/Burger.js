export class Burger {
  constructor(
    burgerSelector = '.menu__burger',
    menuControlContainer = '.menu__control-container',
    menuTable = '.menu__table'
  ) {
    this.menuControlContainer = document.querySelector(menuControlContainer);
    this.burgerButton = document.querySelector(burgerSelector);
    this.menuTable = document.querySelector(menuTable);

    this.isBurgerOpened = false;

    this.onInit();
    this.events();
  }

  onInit = () => {
    // this.showMenuControl();
  };

  events = () => {
    this.burgerButton.addEventListener('click', () => {
      this.isBurgerOpened = !this.isBurgerOpened;

      if (this.isBurgerOpened) {
        this.burgerButton.classList.add('close');
        this.menuTable.classList.add('active');
      } else {
        this.burgerButton.classList.remove('close');
        this.menuTable.classList.remove('active');
      }
    });
  };

  showMenuControl = () => {
    if (!this.menuControlContainer.classList.contains('active')) {
      this.menuControlContainer.classList.add('active');
    }
  };
}
