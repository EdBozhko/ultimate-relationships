import * as THREE from 'three';

export class Light {
  constructor() {
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    this.hemiLight.position.set(0, 100, 0);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 3);
    this.dirLight.position.set(-0, 40, 50);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.camera.top = 50;
    this.dirLight.shadow.camera.bottom = -25;
    this.dirLight.shadow.camera.left = -25;
    this.dirLight.shadow.camera.right = 25;
    this.dirLight.shadow.camera.near = 0.1;
    this.dirLight.shadow.camera.far = 200;
    this.dirLight.shadow.mapSize.set(1024, 1024);
  }
}
