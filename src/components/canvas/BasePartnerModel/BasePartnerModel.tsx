'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import useGameStore from '@src/stores/useGameStore';

import type { GLTFResult, BasePartnerModelComponent } from './BasePartnerModel.types.ts';

export const BasePartnerModel: BasePartnerModelComponent = ({ onFaceUpdate = () => {}, ...rest }) => {
  const basePartner = useGLTF('/models/base_partner/base_partner.glb') as GLTFResult;
  const { nodes, materials } = basePartner;
  const modelRef = useRef<THREE.Group>(null!);
  const faceRef = useRef<THREE.SkinnedMesh>(null!);

  const isBraVisible = useGameStore((store) => store.isBraVisible);
  const isCorsetVisible = useGameStore((store) => store.isCorsetVisible);
  const isPantiesVisible = useGameStore((store) => store.isPantiesVisible);
  const isSkirtVisible = useGameStore((store) => store.isSkirtVisible);
  const isThighStrapsVisible = useGameStore((store) => store.isThighStrapsVisible);

  useEffect(() => {
    if (faceRef.current) {
      onFaceUpdate(faceRef.current);
    }
  }, [faceRef.current]);

  useEffect(() => {
    if (!modelRef.current) return;
    // const morphTargetDictionary = modelRef.current.children[0].children[0].children[0].morphTargetDictionary;
    const morphTargetInfluences = modelRef.current.children;
    morphTargetInfluences.forEach((element) => {
      if (element instanceof THREE.Mesh && element.morphTargetInfluences) {
        element.morphTargetInfluences[26] = 0;
        element.morphTargetInfluences[3] = 0.7;
        // element.morphTargetInfluences[29] = 1;
        // element.morphTargetInfluences[10] = 0.5;
        // element.morphTargetInfluences[17] = 0.5;
        // element.morphTargetInfluences[12] = 0.25;
        // element.morphTargetInfluences[19] = 0.25;
        // morphTargetInfluences['26'] = 0;
      }
    });
  }, [modelRef.current, nodes]);

  return (
    <>
      <group {...rest} dispose={null}>
        {isPantiesVisible && (
          <skinnedMesh
            castShadow
            name='Panties'
            geometry={nodes.Panties.geometry}
            material={materials.Panties}
            skeleton={nodes.Panties.skeleton}
          />
        )}
        {isThighStrapsVisible && (
          <skinnedMesh
            castShadow
            name='ThighStraps'
            geometry={nodes.ThighStraps.geometry}
            material={materials.ThighStraps}
            skeleton={nodes.ThighStraps.skeleton}
          />
        )}
        {isBraVisible && (
          <skinnedMesh
            castShadow
            name='Top'
            geometry={nodes.Top.geometry}
            material={materials.Top}
            skeleton={nodes.Top.skeleton}
          />
        )}
        {isSkirtVisible && (
          <skinnedMesh
            castShadow
            name='Top001'
            geometry={nodes.Top001.geometry}
            material={materials.Top3}
            skeleton={nodes.Top001.skeleton}
          />
        )}
        <primitive object={nodes.root} />
        <group ref={modelRef}>
          <skinnedMesh
            castShadow
            name='Genesis8_1Female'
            geometry={nodes.Genesis8_1Female.geometry}
            material={materials.Body}
            skeleton={nodes.Genesis8_1Female.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female.morphTargetInfluences}
          />
          <skinnedMesh
            ref={faceRef}
            castShadow
            name='Genesis8_1Female_1'
            geometry={nodes.Genesis8_1Female_1.geometry}
            material={materials.Face}
            skeleton={nodes.Genesis8_1Female_1.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_1.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_2'
            geometry={nodes.Genesis8_1Female_2.geometry}
            material={materials.Lips}
            skeleton={nodes.Genesis8_1Female_2.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_2.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_3'
            geometry={nodes.Genesis8_1Female_3.geometry}
            material={materials.Teeth}
            skeleton={nodes.Genesis8_1Female_3.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_3.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_3.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_4'
            geometry={nodes.Genesis8_1Female_4.geometry}
            material={materials.Ears}
            skeleton={nodes.Genesis8_1Female_4.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_4.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_4.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_5'
            geometry={nodes.Genesis8_1Female_5.geometry}
            material={materials.Legs}
            skeleton={nodes.Genesis8_1Female_5.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_5.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_5.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_6'
            geometry={nodes.Genesis8_1Female_6.geometry}
            material={materials.EyeSocket}
            skeleton={nodes.Genesis8_1Female_6.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_6.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_6.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_7'
            geometry={nodes.Genesis8_1Female_7.geometry}
            material={materials.Mouth}
            skeleton={nodes.Genesis8_1Female_7.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_7.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_7.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_8'
            geometry={nodes.Genesis8_1Female_8.geometry}
            material={materials.Arms}
            skeleton={nodes.Genesis8_1Female_8.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_8.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_8.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_9'
            geometry={nodes.Genesis8_1Female_9.geometry}
            material={materials.Pupils}
            skeleton={nodes.Genesis8_1Female_9.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_9.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_9.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_10'
            geometry={nodes.Genesis8_1Female_10.geometry}
            material={materials.EyeMoisture}
            skeleton={nodes.Genesis8_1Female_10.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_10.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_10.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_11'
            geometry={nodes.Genesis8_1Female_11.geometry}
            material={materials.Fingernails}
            skeleton={nodes.Genesis8_1Female_11.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_11.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_11.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_12'
            geometry={nodes.Genesis8_1Female_12.geometry}
            material={materials.Cornea}
            skeleton={nodes.Genesis8_1Female_12.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_12.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_12.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_13'
            geometry={nodes.Genesis8_1Female_13.geometry}
            material={materials.Irises}
            skeleton={nodes.Genesis8_1Female_13.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_13.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_13.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_14'
            geometry={nodes.Genesis8_1Female_14.geometry}
            material={materials.Sclera}
            skeleton={nodes.Genesis8_1Female_14.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_14.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_14.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_15'
            geometry={nodes.Genesis8_1Female_15.geometry}
            material={materials.Toenails}
            skeleton={nodes.Genesis8_1Female_15.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_15.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_15.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_16'
            geometry={nodes.Genesis8_1Female_16.geometry}
            material={materials.Head}
            skeleton={nodes.Genesis8_1Female_16.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_16.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_16.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_17'
            geometry={nodes.Genesis8_1Female_17.geometry}
            material={materials.Eyelashes}
            skeleton={nodes.Genesis8_1Female_17.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_17.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_17.morphTargetInfluences}
          />
          <skinnedMesh
            castShadow
            name='Genesis8_1Female_18'
            geometry={nodes.Genesis8_1Female_18.geometry}
            material={materials.Eyelashes2}
            skeleton={nodes.Genesis8_1Female_18.skeleton}
            morphTargetDictionary={nodes.Genesis8_1Female_18.morphTargetDictionary}
            morphTargetInfluences={nodes.Genesis8_1Female_18.morphTargetInfluences}
          />
        </group>
        {isCorsetVisible && (
          <>
            <skinnedMesh
              castShadow
              name='Top_83133003'
              geometry={nodes.Top_83133003.geometry}
              material={materials.Top}
              skeleton={nodes.Top_83133003.skeleton}
            />
            <skinnedMesh
              castShadow
              name='Top_83133003_1'
              geometry={nodes.Top_83133003_1.geometry}
              material={materials.Top2}
              skeleton={nodes.Top_83133003_1.skeleton}
            />
          </>
        )}
      </group>
      {/* <primitive scale={1.5} position={[3.895, 1.159, -5.343]} object={basePartner.scene} /> */}
    </>
  );
};
