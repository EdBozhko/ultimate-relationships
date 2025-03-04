import * as THREE from 'three';

export class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
    // this.camera.rotation.set(100, 100, 100);
    this.camera.position.set(-50, 40, 50);
  }

  // getFov = () => {
  //   return Math.floor((2 * Math.atan(this.camera.getFilmHeight() / 2 / this.camera.getFocalLength()) * 180) / Math.PI);
  // };

  // clickZoom = (value, zoomType) => {
  //   if (value >= 20 && zoomType === 'zoomIn') {
  //     return value - 5;
  //   } else if (value <= 75 && zoomType === 'zoomOut') {
  //     return value + 5;
  //   } else {
  //     return value;
  //   }
  // };

  // zoomInFunction = (e) => {
  //   const fov = this.getFov();
  //   this.camera.fov = this.clickZoom(fov, 'zoomIn');
  //   this.camera.updateProjectionMatrix();
  // };

  // zoomOutFunction = (e) => {
  //   const fov = this.getFov();
  //   this.camera.fov = this.clickZoom(fov, 'zoomOut');
  //   this.camera.updateProjectionMatrix();
  // };
}
