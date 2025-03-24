import * as THREE from 'three';

export const getObjectDimensions = (mesh) => {
  const boundingBox = new THREE.Box3();
  const boundingBoxSize = new THREE.Vector3();

  boundingBox.setFromObject(mesh).getSize(boundingBoxSize);

  return boundingBoxSize;
};
