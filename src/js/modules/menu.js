import {
  showFullMenu,
  setFullMenu,
  fullMenu,
  fullMenuClose,
  fullMenuList,
  menuButtons,
  menuContainer,
} from './fullMenu.js';
import { switchMenuSide, currentMenuSide } from './switchMenuSide.js';
import { app } from '../main.js';

import { calculateAngle } from './calculateAngle.js';
import { getIntersectionPoint } from './getIntersectionPoint.js';
import { AudioControl } from './AudioControl.js';
import { cardForm } from './card-form.js';
import { setModelProps } from './App.js';

const cameraControlsModes = {
  axisRotate: 'axis-rotate',
  axisMove: 'axis-move',
  zoom: 'zoom',
};

let cameraControlsMode = cameraControlsModes.axisMove;
const backgroundAudio = new AudioControl('@files/audio/Warrant_Shes_my_Cherry_Pie.mp3');

export const menu = {
  level: {
    1: {
      0: {
        id: 'poses',
        onclick: () => {
          showFullMenu(menu.level[1][0].list);
        },
        list: [
          {
            id: 'stand',
            onclick: () => {
              fullMenuClose.click();

              app.toy.animatePositionStop();
              app.toy.removeModelFromScene(app.scene.scene);
              app.model.useAnimation('base');
              app.model.animationAudio.onMuteClick();
            },
            classNames: [],
          },
          {
            id: 'solo-on-back',
            onclick: async () => {
              // const
              fullMenuClose.click();
              // app.model.stopAnimation('base');
              app.model.useAnimation('single-on-back');
              app.model.animationAudio.onMuteClick();

              const modelConfig = {
                Smile: 0.5,
                eyeBlinkLeft: 0.5,
                eyeLookUpLeft: 1,
                eyeBlinkRight: 0.5,
                eyeLookUpRight: 1,
                jawOpen: 0.1,
              };

              for (const configName in modelConfig) {
                if (Object.prototype.hasOwnProperty.call(modelConfig, configName)) {
                  setModelProps(
                    app.model.model.children[0].children[0].children[0].morphTargetDictionary,
                    app.model.model.children[0].children[0].children,
                    modelConfig[configName],
                    configName
                  );
                }
              }

              let direction = 'forward';

              setInterval(() => {
                setModelProps(
                  app.model.model.children[0].children[0].children[0].morphTargetDictionary,
                  app.model.model.children[0].children[0].children,
                  modelConfig.jawOpen,
                  'jawOpen'
                );

                if (direction === 'forward') {
                  if (modelConfig.jawOpen > 0.3) {
                    direction = 'back';
                  } else {
                    modelConfig.jawOpen += 0.01;
                  }
                } else {
                  if (modelConfig.jawOpen < 0.1) {
                    direction = 'forward';
                  } else {
                    modelConfig.jawOpen -= 0.01;
                  }
                }
              }, 50);

              await app.loadModel(app.toy, '@files/assets/models/warrior/hand.glb', 'two-fingers');
              app.toy.model.rotation.set(Math.PI / 2, 0, Math.PI);
              app.toy.model.position.set(-0.09, 1.2, -2.5);

              app.toy.animatePosition();
              // app.render();
              // app.model.animations
              // showFullMenu();
            },
            classNames: [],
          },
          {
            id: 'couple-cross',
            onclick: () => {
              console.log('couple-cross');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-from-behind',
            onclick: () => {
              console.log('couple-from-behind');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-missionary',
            onclick: () => {
              console.log('couple-missionary');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-reverse-cowgirl',
            onclick: () => {
              console.log('couple-reverse-cowgirl');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-cowgirl',
            onclick: () => {
              console.log('couple-cowgirl');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-blowjob-on-back',
            onclick: () => {
              console.log('couple-blowjob-on-back');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-69',
            onclick: () => {
              console.log('couple-69');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-blowjob-on-knees',
            onclick: () => {
              console.log('couple-blowjob-on-knees');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-ascent-to-desire',
            onclick: () => {
              console.log('couple-ascent-to-desire');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-boat',
            onclick: () => {
              console.log('couple-boat');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
          {
            id: 'couple-fan',
            onclick: () => {
              console.log('couple-fan');
              showFullMenu([], false, cardForm());
            },
            classNames: ['disabled'],
          },
        ],
      },
      1: {
        id: 'sex-toys',
        onclick: () => {
          showFullMenu(menu.level[1][1].list);
        },
        list: [
          {
            id: 'double-finger',
            name: 'fingers',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('double-finger');
            },
            classNames: [],
          },
          {
            id: 'dildo',
            name: 'dildo',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('dildo');
            },
            classNames: ['disabled'],
          },
          {
            id: 'butt-plug-1',
            name: 'butt plug',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('butt-plug-1');
            },
            classNames: ['disabled'],
          },
          {
            id: 'butt-plug-2',
            name: 'butt plug',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('butt-plug-2');
            },
            classNames: ['disabled'],
          },
          {
            id: 'egg-vibrator',
            name: 'egg vibrator',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('egg-vibrator');
            },
            classNames: ['disabled'],
          },
          {
            id: 'plug-2',
            name: 'plug',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('plug-2');
            },
            classNames: ['disabled'],
          },
          {
            id: 'plug',
            name: 'plug',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('plug');
            },
            classNames: ['disabled'],
          },
          {
            id: 'vibrator-2',
            name: 'vibrator',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('vibrator-2');
            },
            classNames: ['disabled'],
          },
          {
            id: 'vibrator-3',
            name: 'vibrator',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('vibrator-3');
            },
            classNames: ['disabled'],
          },
          {
            id: 'vibrator-4',
            name: 'vibrator',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('vibrator-4');
            },
            classNames: ['disabled'],
          },
          {
            id: 'vibrator-5',
            name: 'vibrator',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('vibrator-5');
            },
            classNames: ['disabled'],
          },
          {
            id: 'vibrator',
            name: 'vibrator',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('vibrator');
            },
            classNames: ['disabled'],
          },
        ],
      },
      2: {
        id: 'additional-controls',
        onclick: () => {
          window.r3dss.burger.burgerButton.click();
          setTimeout(() => {
            prevMenuLevel = 1;
            setMenu(menuButtons, 3);
            setTimeout(() => {
              window.r3dss.burger.burgerButton.click();
            }, 200);
          }, 200);

          const menuControl = document.querySelector('.menu__control');
          const joystick = document.querySelector('.menu__joystick');

          window.r3dss.burger.burgerButton.classList.add('hide');

          joystick.classList.add('active');

          const joystickClientRect = joystick.getBoundingClientRect();

          const joystickCenterCoordinates = {
            x: joystickClientRect.x + joystickClientRect.width / 2,
            y: joystickClientRect.y + joystickClientRect.height / 2,
          };

          const applyJoystickTransform = (x, y) => {
            joystick.style = `transform: translate(${x}px, ${y}px)`;
          };

          const getJoystickPosition = (joystickPositionAngle) => {
            let joystickPosition = 'center';

            switch (cameraControlsMode) {
              case cameraControlsModes.axisRotate:
              case cameraControlsModes.axisMove:
                if (
                  (joystickPositionAngle >= 0 && joystickPositionAngle <= 45) ||
                  (joystickPositionAngle >= 316 && joystickPositionAngle <= 360)
                ) {
                  joystickPosition = 'up';
                } else if (joystickPositionAngle >= 46 && joystickPositionAngle <= 135) {
                  joystickPosition = 'right';
                } else if (joystickPositionAngle >= 136 && joystickPositionAngle <= 225) {
                  joystickPosition = 'down';
                } else if (joystickPositionAngle >= 226 && joystickPositionAngle <= 315) {
                  joystickPosition = 'left';
                }
                break;

              case cameraControlsModes.zoom:
                if (
                  (joystickPositionAngle >= 0 && joystickPositionAngle <= 90) ||
                  (joystickPositionAngle >= 271 && joystickPositionAngle <= 360)
                ) {
                  joystickPosition = 'up';
                } else if (joystickPositionAngle >= 91 && joystickPositionAngle <= 270) {
                  joystickPosition = 'down';
                }
                break;
            }

            return joystickPosition;
          };

          let isTouchInProgress = false;
          let cameraAxisMove = {
            x: app.camera.camera.position.x,
            y: app.camera.camera.position.y,
          };
          let cameraAxisRotate = {
            x: app.camera.camera.position.x,
            y: app.camera.camera.position.y,
          };

          const changeCameraPosition = (cameraControlsMode, joystickPositionAngle, touchCoordinates) => {
            const joystickPosition = getJoystickPosition(joystickPositionAngle);

            switch (cameraControlsMode) {
              case cameraControlsModes.axisRotate:
                app.controls.handleMouseMoveRotate({
                  clientX: cameraAxisRotate.x,
                  clientY: cameraAxisRotate.y,
                });

                if (joystickPosition === 'up') {
                  cameraAxisRotate.y -= 0.5;
                } else if (joystickPosition === 'right') {
                  cameraAxisRotate.x -= 0.5;
                } else if (joystickPosition === 'down') {
                  cameraAxisRotate.y += 0.5;
                } else if (joystickPosition === 'left') {
                  cameraAxisRotate.x += 0.5;
                }

                break;

              case cameraControlsModes.axisMove:
                app.controls.handleMouseMovePan({
                  clientX: cameraAxisMove.x,
                  clientY: cameraAxisMove.y,
                });

                if (joystickPosition === 'up') {
                  cameraAxisMove.y += 0.5;
                } else if (joystickPosition === 'right') {
                  cameraAxisMove.x -= 0.5;
                } else if (joystickPosition === 'down') {
                  cameraAxisMove.y -= 0.5;
                } else if (joystickPosition === 'left') {
                  cameraAxisMove.x += 0.5;
                }

                break;

              case cameraControlsModes.zoom:
                if (joystickPosition === 'up') {
                  app.controls.onMouseWheel({
                    deltaMode: 0,
                    clientX: 0,
                    clientY: 0,
                    deltaY: -50,
                    preventDefault: () => {},
                  });
                } else if (joystickPosition === 'down') {
                  app.controls.onMouseWheel({
                    deltaMode: 0,
                    clientX: 0,
                    clientY: 0,
                    deltaY: 50,
                    preventDefault: () => {},
                  });
                }

                break;
            }

            if (isTouchInProgress) {
              setTimeout(() => {
                changeCameraPosition(cameraControlsMode, joystickPositionAngle, touchCoordinates);
              }, 100);
            }
          };

          const joystickPositionHandler = (event) => {
            isTouchInProgress = true;
            const touchCoordinates = { x: event.touches[0].clientX, y: event.touches[0].clientY };

            const joystickPositionAngle = calculateAngle(
              joystickCenterCoordinates.x,
              joystickCenterCoordinates.y - 10,
              joystickCenterCoordinates.x,
              joystickCenterCoordinates.y,
              touchCoordinates.x,
              touchCoordinates.y
            );

            const maxTouchCoordinates = getIntersectionPoint(
              joystickCenterCoordinates.x,
              joystickCenterCoordinates.y,
              menuControl.clientWidth / 2,
              joystickPositionAngle
            );

            if (joystickPositionAngle >= 0 && joystickPositionAngle <= 90) {
              if (touchCoordinates.x > maxTouchCoordinates.x) {
                touchCoordinates.x = maxTouchCoordinates.x;
              }

              if (touchCoordinates.y < maxTouchCoordinates.y) {
                touchCoordinates.y = maxTouchCoordinates.y;
              }
            } else if (joystickPositionAngle >= 91 && joystickPositionAngle <= 180) {
              if (touchCoordinates.x > maxTouchCoordinates.x) {
                touchCoordinates.x = maxTouchCoordinates.x;
              }

              if (touchCoordinates.y > maxTouchCoordinates.y) {
                touchCoordinates.y = maxTouchCoordinates.y;
              }
            } else if (joystickPositionAngle >= 181 && joystickPositionAngle <= 270) {
              if (touchCoordinates.x < maxTouchCoordinates.x) {
                touchCoordinates.x = maxTouchCoordinates.x;
              }

              if (touchCoordinates.y > maxTouchCoordinates.y) {
                touchCoordinates.y = maxTouchCoordinates.y;
              }
            } else if (joystickPositionAngle >= 271 && joystickPositionAngle <= 360) {
              if (touchCoordinates.x < maxTouchCoordinates.x) {
                touchCoordinates.x = maxTouchCoordinates.x;
              }

              if (touchCoordinates.y < maxTouchCoordinates.y) {
                touchCoordinates.y = maxTouchCoordinates.y;
              }
            }

            applyJoystickTransform(
              touchCoordinates.x - joystickCenterCoordinates.x,
              touchCoordinates.y - joystickCenterCoordinates.y
            );
            changeCameraPosition(cameraControlsMode, joystickPositionAngle, touchCoordinates);
          };

          const resetJoystickPosition = () => {
            isTouchInProgress = false;
            joystick.style = `transform: translate(0, 0)`;
          };

          if (joystick.classList.contains('active')) {
            menuControl.addEventListener('touchstart', joystickPositionHandler, { passive: true });
            menuControl.addEventListener('touchmove', joystickPositionHandler, { passive: true });
            menuControl.addEventListener('touchend', resetJoystickPosition, { passive: true });
          } else {
            menuControl.removeEventListener('touchstart', joystickPositionHandler);
            menuControl.removeEventListener('touchmove', joystickPositionHandler);
            menuControl.removeEventListener('touchend', resetJoystickPosition);
          }
        },
      },
      3: {
        id: 'additional-options',
        onclick: () => {
          window.r3dss.burger.burgerButton.click();
          setTimeout(() => {
            prevMenuLevel = 1;
            setMenu(menuButtons, 2);
            setTimeout(() => {
              window.r3dss.burger.burgerButton.click();
            }, 200);
          }, 200);
        },
      },
    },
    2: {
      0: {
        id: 'surroundings',
        onclick: () => {
          showFullMenu(menu.level[2][0].list);
        },
        list: [
          {
            id: 'sofa',
            name: 'sofa',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('sofa');
            },
            classNames: ['disabled'],
          },
          {
            id: 'bdsm-room',
            name: 'bdsm room',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('bdsm room');
            },
            classNames: ['disabled'],
          },
          {
            id: 'classroom',
            name: 'classroom',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('classroom');
            },
            classNames: ['disabled'],
          },
          {
            id: 'photo-studio',
            name: 'photo studio',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('photo-studio');
            },
            classNames: ['disabled'],
          },
          {
            id: 'porno-studio',
            name: 'porno studio',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('porno-studio');
            },
            classNames: ['disabled'],
          },
        ],
      },
      1: {
        id: 'models',
        onclick: () => {
          showFullMenu(menu.level[2][1].list);
        },
        list: [
          {
            id: 'tiffany',
            name: 'Tiffany',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('tiffany');
            },
            classNames: ['model-icon'],
          },
          {
            id: 'hanna',
            name: 'Hanna',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('Hanna');
            },
            classNames: ['disabled', 'model-icon'],
          },
          {
            id: 'jasmine',
            name: 'Jasmine',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('Jasmine');
            },
            classNames: ['disabled', 'model-icon'],
          },
          {
            id: 'jenna',
            name: 'Jenna',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('Jenna');
            },
            classNames: ['disabled', 'model-icon'],
          },
          {
            id: 'kayden',
            name: 'Kayden',
            onclick: () => {
              showFullMenu([], false, cardForm());
              console.log('Kayden');
            },
            classNames: ['disabled', 'model-icon'],
          },
        ],
      },
      2: {
        id: 'settings',
        onclick: () => {
          showFullMenu(menu.level[2][2].list);
        },
        list: [
          {
            id: 'menu-side',
            name: 'Select the side of the menu location.',
            onclick: () => {
              switchMenuSide(currentMenuSide === 'right' ? 'left' : 'right');
            },
            classNames: ['--settings'],
          },
          {
            id: 'music',
            name: 'Music',
            onclick: (event) => {
              backgroundAudio.onMuteClick();
              if (backgroundAudio.isAudioPlay) {
                event.target.classList.add('--muted');
              } else {
                event.target.classList.remove('--muted');
              }
            },
            classNames: ['--settings', '--audio'],
          },
          {
            id: 'moans',
            name: 'Moans',
            onclick: (event) => {
              app.model.animationAudio.onMuteClick();
              if (app.model.animationAudio.isAudioPlay) {
                event.target.classList.add('--muted');
              } else {
                event.target.classList.remove('--muted');
              }
            },
            classNames: ['--settings', '--audio'],
          },
        ],
      },
      3: {
        id: 'back',
        onclick: () => {
          window.r3dss.burger.burgerButton.click();
          setTimeout(() => {
            prevMenuLevel = 2;
            setMenu(menuButtons, 1);
            setTimeout(() => {
              window.r3dss.burger.burgerButton.click();
            }, 200);
          }, 200);
        },
      },
    },
    3: {
      0: {
        id: cameraControlsModes.axisRotate,
        onclick: () => {
          cameraControlsMode = cameraControlsModes.axisRotate;
        },
      },
      1: {
        id: cameraControlsModes.axisMove,
        onclick: () => {
          cameraControlsMode = cameraControlsModes.axisMove;
        },
      },
      2: {
        id: cameraControlsModes.zoom,
        onclick: () => {
          cameraControlsMode = cameraControlsModes.zoom;
        },
      },
      3: {
        id: 'back',
        onclick: () => {
          const joystick = document.querySelector('.menu__joystick');

          window.r3dss.burger.burgerButton.click();
          window.r3dss.burger.burgerButton.classList.remove('hide');
          joystick.classList.remove('active');

          setTimeout(() => {
            prevMenuLevel = 3;
            setMenu(menuButtons, 1);
            setTimeout(() => {
              window.r3dss.burger.burgerButton.click();
            }, 200);
          }, 200);
        },
      },
    },
  },
};

let prevMenuLevel = 1;
export const setMenu = (menuButtons, menuLevel = 1) => {
  [...menuButtons].forEach((button) => {
    const buttonSettings = menu.level[menuLevel][button.dataset.menuButtonId];
    const prevButtonSettings = menu.level[prevMenuLevel][button.dataset.menuButtonId];

    button.removeEventListener('click', prevButtonSettings.onclick);
    button.id = buttonSettings.id;
    button.addEventListener('click', buttonSettings.onclick);
  });
};
