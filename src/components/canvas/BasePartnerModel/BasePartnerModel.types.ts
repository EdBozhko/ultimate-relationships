import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import type { FC } from 'react';

export type BasePartnerModelProps = JSX.IntrinsicElements['group'] & {
  onFaceUpdate?: (face: THREE.Mesh | null) => void;
};

export type BasePartnerModelComponent = FC<BasePartnerModelProps>;

export type GLTFResult = GLTF & {
  nodes: {
    Genesis8_1Female: THREE.SkinnedMesh;
    Genesis8_1Female_1: THREE.SkinnedMesh;
    Genesis8_1Female_2: THREE.SkinnedMesh;
    Genesis8_1Female_3: THREE.SkinnedMesh;
    Genesis8_1Female_4: THREE.SkinnedMesh;
    Genesis8_1Female_5: THREE.SkinnedMesh;
    Genesis8_1Female_6: THREE.SkinnedMesh;
    Genesis8_1Female_7: THREE.SkinnedMesh;
    Genesis8_1Female_8: THREE.SkinnedMesh;
    Genesis8_1Female_9: THREE.SkinnedMesh;
    Genesis8_1Female_10: THREE.SkinnedMesh;
    Genesis8_1Female_11: THREE.SkinnedMesh;
    Genesis8_1Female_12: THREE.SkinnedMesh;
    Genesis8_1Female_13: THREE.SkinnedMesh;
    Genesis8_1Female_14: THREE.SkinnedMesh;
    Genesis8_1Female_15: THREE.SkinnedMesh;
    Genesis8_1Female_16: THREE.SkinnedMesh;
    Genesis8_1Female_17: THREE.SkinnedMesh;
    Genesis8_1Female_18: THREE.SkinnedMesh;
    Panties: THREE.SkinnedMesh;
    ThighStraps: THREE.SkinnedMesh;
    Top: THREE.SkinnedMesh;
    Top001: THREE.SkinnedMesh;
    Top_83133003: THREE.SkinnedMesh;
    Top_83133003_1: THREE.SkinnedMesh;
    Hair: THREE.Mesh;
    root: THREE.Bone;
  };
  materials: {
    Body: THREE.MeshPhysicalMaterial;
    Face: THREE.MeshStandardMaterial;
    Lips: THREE.MeshStandardMaterial;
    Teeth: THREE.MeshStandardMaterial;
    Ears: THREE.MeshStandardMaterial;
    Legs: THREE.MeshStandardMaterial;
    EyeSocket: THREE.MeshStandardMaterial;
    Mouth: THREE.MeshStandardMaterial;
    Arms: THREE.MeshStandardMaterial;
    Pupils: THREE.MeshStandardMaterial;
    EyeMoisture: THREE.MeshPhysicalMaterial;
    Fingernails: THREE.MeshStandardMaterial;
    Cornea: THREE.MeshPhysicalMaterial;
    Irises: THREE.MeshStandardMaterial;
    Sclera: THREE.MeshStandardMaterial;
    Toenails: THREE.MeshStandardMaterial;
    Head: THREE.MeshPhysicalMaterial;
    Eyelashes: THREE.MeshStandardMaterial;
    Eyelashes2: THREE.MeshStandardMaterial;
    Panties: THREE.MeshStandardMaterial;
    ThighStraps: THREE.MeshStandardMaterial;
    Top: THREE.MeshPhysicalMaterial;
    Top3: THREE.MeshPhysicalMaterial;
    Top2: THREE.MeshPhysicalMaterial;
    Hair: THREE.MeshPhysicalMaterial;
  };
};
