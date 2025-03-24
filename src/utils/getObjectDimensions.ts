import * as THREE from 'three';

export const getObjectDimensions = (mesh: THREE.Object3D): THREE.Vector3 => {
  const boundingBox = new THREE.Box3();
  const boundingBoxSize = new THREE.Vector3();

  boundingBox.setFromObject(mesh).getSize(boundingBoxSize);

  return boundingBoxSize;
};
