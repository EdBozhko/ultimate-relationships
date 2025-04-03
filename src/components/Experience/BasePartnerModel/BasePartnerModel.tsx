'use client';

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useBoxHelper } from '@src/hooks';

import type { GLTFResult, BasePartnerModelComponent } from './BasePartnerModel.types.ts';

gsap.registerPlugin(useGSAP);

const BasePartnerModel: BasePartnerModelComponent = (props) => {
  const basePartner = useGLTF('/models/base_partner/base_partner.glb') as GLTFResult;
  const { nodes, materials } = basePartner;
  const modelRef = useRef(null!);
  useBoxHelper(modelRef);

  return (
    <>
      <group scale={1.5} position={[3.895, 1.159, -5.343]} {...props} dispose={null}>
        <skinnedMesh
          castShadow
          name='Panties'
          geometry={nodes.Panties.geometry}
          material={materials.Panties}
          skeleton={nodes.Panties.skeleton}
        />
        <skinnedMesh
          castShadow
          name='ThighStraps'
          geometry={nodes.ThighStraps.geometry}
          material={materials.ThighStraps}
          skeleton={nodes.ThighStraps.skeleton}
        />
        <skinnedMesh
          castShadow
          name='Top'
          geometry={nodes.Top.geometry}
          material={materials.Top}
          skeleton={nodes.Top.skeleton}
        />
        <skinnedMesh
          castShadow
          name='Top001'
          geometry={nodes.Top001.geometry}
          material={materials.Top3}
          skeleton={nodes.Top001.skeleton}
        />
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
      </group>
      {/* <primitive scale={1.5} position={[3.895, 1.159, -5.343]} object={basePartner.scene} /> */}
    </>
  );
};

export default BasePartnerModel;
