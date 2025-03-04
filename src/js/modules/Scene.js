import * as THREE from 'three';

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0e121b');
    this.scene.fog = new THREE.Fog('#0e121b', 10, 500);
  }

  add(object) {
    this.scene.add(object);
  }
}
