import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import type { FC } from 'react';

export type BasePartnerModelProps = JSX.IntrinsicElements['group'] & {
  onFaceUpdate?: (face: THREE.SkinnedMesh) => void;
  currentAnimation?: string;
};

export type BasePartnerModelComponent = FC<BasePartnerModelProps>;

export type GLTFResult = GLTF & {
  nodes: {
    Genesis8_1Female002: THREE.SkinnedMesh;
    Genesis8_1Female002_1: THREE.SkinnedMesh;
    Genesis8_1Female002_2: THREE.SkinnedMesh;
    Genesis8_1Female002_3: THREE.SkinnedMesh;
    Genesis8_1Female002_4: THREE.SkinnedMesh;
    Genesis8_1Female002_5: THREE.SkinnedMesh;
    Genesis8_1Female002_6: THREE.SkinnedMesh;
    Genesis8_1Female002_7: THREE.SkinnedMesh;
    Genesis8_1Female002_8: THREE.SkinnedMesh;
    Genesis8_1Female002_9: THREE.SkinnedMesh;
    Genesis8_1Female002_10: THREE.SkinnedMesh;
    Genesis8_1Female002_11: THREE.SkinnedMesh;
    Genesis8_1Female002_12: THREE.SkinnedMesh;
    Genesis8_1Female002_13: THREE.SkinnedMesh;
    Genesis8_1Female002_14: THREE.SkinnedMesh;
    Genesis8_1Female002_15: THREE.SkinnedMesh;
    Genesis8_1Female002_16: THREE.SkinnedMesh;
    Genesis8_1Female002_17: THREE.SkinnedMesh;
    Genesis8_1Female002_18: THREE.SkinnedMesh;
    Hair001: THREE.SkinnedMesh;
    Panties001: THREE.SkinnedMesh;
    ThighStraps001: THREE.SkinnedMesh;
    Top005: THREE.SkinnedMesh;
    Top_83133007: THREE.SkinnedMesh;
    Top_83133007_1: THREE.SkinnedMesh;
    Top007: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ['Body.001']: THREE.MeshPhysicalMaterial;
    ['Face.001']: THREE.MeshStandardMaterial;
    ['Lips.001']: THREE.MeshStandardMaterial;
    ['Teeth.001']: THREE.MeshStandardMaterial;
    ['Ears.001']: THREE.MeshStandardMaterial;
    ['Legs.001']: THREE.MeshStandardMaterial;
    ['EyeSocket.001']: THREE.MeshStandardMaterial;
    ['Mouth.001']: THREE.MeshStandardMaterial;
    ['Arms.001']: THREE.MeshStandardMaterial;
    ['Pupils.001']: THREE.MeshStandardMaterial;
    ['EyeMoisture.001']: THREE.MeshPhysicalMaterial;
    ['Fingernails.001']: THREE.MeshStandardMaterial;
    ['Cornea.001']: THREE.MeshPhysicalMaterial;
    ['Irises.001']: THREE.MeshStandardMaterial;
    ['Sclera.001']: THREE.MeshStandardMaterial;
    ['Toenails.001']: THREE.MeshStandardMaterial;
    ['Head.001']: THREE.MeshPhysicalMaterial;
    ['Eyelashes.001']: THREE.MeshStandardMaterial;
    ['Eyelashes2.001']: THREE.MeshStandardMaterial;
    ['Hair.001']: THREE.MeshPhysicalMaterial;
    ['Panties.001']: THREE.MeshStandardMaterial;
    ['ThighStraps.001']: THREE.MeshStandardMaterial;
    ['Top3.001']: THREE.MeshPhysicalMaterial;
    ['Top.001']: THREE.MeshPhysicalMaterial;
    ['Top2.001']: THREE.MeshPhysicalMaterial;
  };
};

export type GLTFActions = Record<string, THREE.AnimationAction>;
