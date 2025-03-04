export const menuContainer = document.querySelector('.menu__table');
export const menuButtons = menuContainer.querySelectorAll('[data-menu-button-id]');
export const fullMenu = document.querySelector('.full-menu');
export const fullMenuClose = fullMenu.querySelector('.full-menu__close');
export const fullMenuList = fullMenu.querySelector('.full-menu__list');
export const fullMenuContent = fullMenu.querySelector('.full-menu__content');

fullMenuClose.addEventListener('click', () => {
  fullMenu.classList.remove('active');
});

export const showFullMenu = (menuList, isMenuOpen, content = '') => {
  fullMenuContent.innerHTML = '';
  if (fullMenu.classList.contains('form')) {
    fullMenu.classList.remove('form');
  }

  if (fullMenu.classList.contains('active')) {
    fullMenu.classList.remove('active');

    setTimeout(() => {
      if (menuList.length > 0) {
        setFullMenu(fullMenuList, menuList);
        fullMenu.classList.add('active');
        if (isMenuOpen) window.r3dss.burger.burgerButton.click();
      } else {
        if (content) {
          console.log(menuList);
          setFullMenu(fullMenuContent, [], content);
          fullMenu.classList.add('active');
          fullMenu.classList.add('form');
          if (isMenuOpen) window.r3dss.burger.burgerButton.click();
        }
      }
    }, 200);
  } else {
    if (menuList.length > 0) {
      setFullMenu(fullMenuList, menuList);
      fullMenu.classList.add('active');
      if (isMenuOpen) window.r3dss.burger.burgerButton.click();
    } else {
      if (content) {
        setFullMenu(fullMenuContent, [], content);
        fullMenu.classList.add('active');
        fullMenu.classList.add('form');

        if (isMenuOpen) window.r3dss.burger.burgerButton.click();
      }
    }
  }
};

export const setFullMenu = (container, menuList = [], content = '') => {
  container.innerHTML = '';

  if (menuList.length > 0) {
    menuList.forEach((listItem) => {
      const li = document.createElement('li');
      li.classList.add('full-menu__list-item');
      if (listItem.classNames.length > 0) {
        li.classList.add(...listItem.classNames);
      }

      const button = document.createElement('button');
      button.classList.add('full-menu__button');
      button.id = listItem.id;
      button.addEventListener('click', listItem.onclick);

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('full-menu__image-container');

      button.appendChild(imgContainer);
      li.appendChild(button);
      if (listItem.name) {
        const span = document.createElement('span');
        span.classList.add('full-menu__item-name');
        span.innerHTML = listItem.name;

        li.appendChild(span);
      }
      container.appendChild(li);
    });
  } else {
    fullMenuList.innerHTML = '';
    container.appendChild(content);
  }
};
