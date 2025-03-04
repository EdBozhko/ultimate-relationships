import * as THREE from 'three';

export class Ground {
  constructor() {
    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshPhongMaterial({ color: 'rgb(19, 21, 68)', depthWrite: false })
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = 0;
    this.ground.receiveShadow = true;
  }
}
