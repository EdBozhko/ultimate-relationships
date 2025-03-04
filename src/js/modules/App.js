import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Scene } from './Scene.js';
import { Camera } from './Camera.js';
import { Light } from './Light.js';
import { Ground } from './Ground.js';
import { Model } from './Model.js';
import { Renderer } from './Renderer.js';
import { initialState } from '../main.js';
import { state } from '../main.js';

export const setModelProps = (morphTargetDictionary, morphTargetInfluences, propConfigValue, propConfigName) => {
  const propIndex = morphTargetDictionary[propConfigName];
  morphTargetInfluences.forEach((element) => {
    element.morphTargetInfluences[propIndex] = propConfigValue;
  });
};

export class App {
  constructor() {
    this.scene = new Scene();
    this.camera = new Camera();
    this.light = new Light();
    this.ground = new Ground();
    this.model = new Model();
    this.toy = new Model();
    this.renderer = new Renderer();
    this.clock = new THREE.Clock();
    this.clockToy = new THREE.Clock();
    this.controls = null;
  }

  async init() {
    this.setupScene();
    await this.loadModel(
      this.model,
      'https://devtreck.org/real_3d_sex_simulator/land/files/assets/models/warrior/uploads_files_4007295_Tiffany3.glb',
      // 'https://adverster.b-cdn.net/3d_models/uploads_files_4007295_Tiffany3.glb',
      'base'
    );
    this.setupControls();
    this.addEventListeners();
    this.render();
  }

  setupScene() {
    this.scene.add(this.light.hemiLight);
    this.scene.add(this.light.dirLight);
    this.scene.add(this.ground.ground);
  }

  async loadModel(model, path, animationName) {
    await model.load(path, this.scene.scene);
    // console.log(model.model.children[0].children[0].children[0].morphTargetDictionary);

    // const modelConfig = {
    //   BoobsScale: {
    //     min: -2,
    //     max: 2,
    //     value: 0,
    //   },
    //   AssScale: {
    //     min: -2,
    //     max: 2,
    //     value: 0,
    //   },
    //   Fat: {
    //     min: -1,
    //     max: 2,
    //     value: 0,
    //   },
    //   Skinny: {
    //     min: 0,
    //     max: 1,
    //     value: 0,
    //   },
    // };

    const { modelConfig } = state;

    if (modelConfig) {
      for (const configName in modelConfig) {
        if (Object.prototype.hasOwnProperty.call(modelConfig, configName)) {
          setModelProps(
            model.model.children[0].children[0].children[0].morphTargetDictionary,
            model.model.children[0].children[0].children,
            modelConfig[configName],
            configName
          );
        }
      }
    }

    model.useAnimation(animationName);
    model.setScalar(10);

    // await this.toy.load('@files/assets/models/warrior/hand.glb', this.scene.scene);
    // this.toy.useAnimation('two-fingers');
    // this.toy.setScalar(10);
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera.camera, this.renderer.renderer.domElement);
    // this.controls.addEventListener('change', this.render.bind(this)); // Only render when controls change
    this.controls.minDistance = 5;
    this.controls.maxDistance = 40;
    this.controls.screenSpacePanning = true;
    this.controls.maxPolarAngle = Math.PI / 2;

    const minPanX = -10;
    const maxPanX = 10;
    const minPanY = -10;
    const maxPanY = 10;
    const originalPanMethod = this.controls.pan;
    this.controls.pan = function () {
      originalPanMethod.apply(this, arguments);

      const currentPosition = this.object.position;
      currentPosition.clampScalar(minPanX, maxPanX);
      currentPosition.clampScalar(minPanY, maxPanY);
    };

    this.controls.target.set(0, 10, 0);

    this.controls.update();
  }

  addEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    this.camera.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.camera.updateProjectionMatrix();
    this.renderer.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.render();
  }

  render() {
    // console.log('render');

    this.model.update(this.clock);
    this.toy.update(this.clockToy);
    // this.constrainCameraToFloor();

    this.renderer.render(this.scene.scene, this.camera.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }

  // constrainCameraToFloor() {
  //   const cameraPosition = this.camera.camera.position;
  //   const floorPosition = this.ground.ground.position;
  //   const floorHalfHeight = 0;

  //   if (cameraPosition.y < floorPosition.y + floorHalfHeight) {
  //     cameraPosition.y = floorPosition.y + floorHalfHeight;
  //   }
  // }
}
