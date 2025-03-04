import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BaseAudioControl } from './BaseAudioControl.js';
import { fullMenuClose } from './fullMenu.js';
import { showFullMenu } from './fullMenu.js';
import { cardForm } from './card-form.js';

export class Model {
  constructor() {
    this.model = null;
    this.mixer = null;
    this.animations = [];
    this.actions = {};
    this.currentAction = null;
    this.object = null;
    this.loader = new GLTFLoader();
    this.animatePositionStopped = false;

    this.animationAudio = new BaseAudioControl('@files/audio/masturbation.mp3');
  }

  useAnimation(animationName) {
    this.mixer.stopAllAction();
    const clip = THREE.AnimationClip.findByName(this.animations, animationName);
    const action = this.mixer.clipAction(clip);

    if (this.currentAction) {
      // Crossfade to the new action over 0.5 seconds
      this.currentAction.crossFadeTo(action, 0.5, false);
    }

    action.play();
    this.currentAction = action;

    // this.actions[animationName] = action;
  }

  // stopAnimation(animationName) {
  //   if (this.actions[animationName]) {
  //     this.actions[animationName].stop();
  //   }
  // }

  load(url, scene) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          this.model = gltf.scene;
          this.animations = gltf.animations;

          this.model.traverse((object) => {
            object.castShadow = true;
            object.frustumCulled = false;
          });

          scene.add(this.model);
          this.mixer = new THREE.AnimationMixer(this.model);

          resolve();
        },
        undefined,
        reject
      );
    });
  }

  removeModelFromScene(scene) {
    scene.remove(this.model);
    this.animationAudio.stopAudio();

    if (this.model) {
      this.model.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => {
              if (material.map) material.map.dispose();
              if (material.lightMap) material.lightMap.dispose();
              if (material.aoMap) material.aoMap.dispose();
              if (material.emissiveMap) material.emissiveMap.dispose();
              if (material.bumpMap) material.bumpMap.dispose();
              if (material.normalMap) material.normalMap.dispose();
              if (material.specularMap) material.specularMap.dispose();
              if (material.roughnessMap) material.roughnessMap.dispose();
              if (material.metalnessMap) material.metalnessMap.dispose();
              if (material.alphaMap) material.alphaMap.dispose();
              if (material.envMap) material.envMap.dispose();
              material.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            if (object.material.lightMap) object.material.lightMap.dispose();
            if (object.material.aoMap) object.material.aoMap.dispose();
            if (object.material.emissiveMap) object.material.emissiveMap.dispose();
            if (object.material.bumpMap) object.material.bumpMap.dispose();
            if (object.material.normalMap) object.material.normalMap.dispose();
            if (object.material.specularMap) object.material.specularMap.dispose();
            if (object.material.roughnessMap) object.material.roughnessMap.dispose();
            if (object.material.metalnessMap) object.material.metalnessMap.dispose();
            if (object.material.alphaMap) object.material.alphaMap.dispose();
            if (object.material.envMap) object.material.envMap.dispose();
            object.material.dispose();
          }
        }
      });

      this.model = null;
    }
  }

  animatePosition(speed) {
    const progress = document.querySelector('.progress');
    const avatar = document.querySelector('.progress-item__img.--avatar');
    const cumButton = document.querySelector('.progress-item__img.--button');
    const cumButtonName = document.querySelector('.progress-item__name');

    // this.animationAudio.onMuteClick();

    let progressWidth = 0;
    let direction = 'back';
    this.animatePositionStopped = false;

    const changePosition = () => {
      if (this.animatePositionStopped) return; // Check the stopped flag

      if (direction === 'back') {
        setTimeout(() => {
          let number = this.model.position.z;
          parseFloat(number.toFixed(2));
          number += 0.01;
          this.model.position.z = number; // You decide on the increment, higher value will mean the objects moves faster
          if (progressWidth < 100) {
            progress.style.width = `${progressWidth}%`;
            progressWidth += 0.05;
          } else if (progressWidth >= 100 && !progress.classList.contains('--glow')) {
            progress.classList.add('--glow');
            avatar.classList.remove('--active');
            cumButton.addEventListener('click', () => {
              if (!fullMenuClose.classList.contains('hide')) {
                fullMenuClose.classList.add('hide');
              }
              showFullMenu([], false, cardForm());
            });
            cumButton.classList.add('--active');
            cumButtonName.classList.add('--active');
          }
          if (this.model.position.z > -2) {
            direction = 'forward';
          }
          changePosition();
        }, 10);
      } else {
        setTimeout(() => {
          let number = this.model.position.z;
          parseFloat(number.toFixed(2));
          number -= 0.01;
          this.model.position.z = number; // You decide on the increment, higher value will mean the objects moves faster
          if (this.model.position.z < -3) {
            direction = 'back';
          }
          changePosition();
        }, 10);
      }
    };

    changePosition();
  }

  animatePositionStop() {
    this.animatePositionStopped = true;
  }

  setScalar(scalarValue) {
    this.model.scale.setScalar(scalarValue);
  }

  update(clock) {
    if (this.mixer) {
      const delta = clock.getDelta();
      this.mixer.update(delta);
    }
  }
}
