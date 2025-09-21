'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useAnimations, useGLTF } from '@react-three/drei';
import useGameStore from '@src/stores/useGameStore';

import { PAGES } from '@src/utils';

import type { GLTFResult, BasePartnerModelComponent } from './BasePartnerModel.types.ts';

export const BasePartnerModel: BasePartnerModelComponent = ({ onFaceUpdate = () => {}, currentAnimation, ...rest }) => {
  const pathname = usePathname();
  const basePartner = useGLTF('/models/base_partner/test.glb') as GLTFResult;
  const { nodes, materials, animations: baseAnimation } = basePartner;
  const [animation, setAnimation] = useState('idle');

  const { animations: idleAnimation } = useGLTF('/models/base_partner/animations/Idle.glb');
  const { animations: talkingAnimation } = useGLTF('/models/base_partner/animations/Talking.glb');

  useEffect(() => {
    const danceClip = baseAnimation?.[0];
    if (danceClip && danceClip.name !== 'dance') {
      danceClip.name = 'dance';
    }

    const idleClip = idleAnimation?.[0];
    if (idleClip && idleClip.name !== 'idle') {
      idleClip.name = 'idle';
    }

    const talkingClip = talkingAnimation?.[0];
    if (talkingClip && talkingClip.name !== 'talking') {
      talkingClip.name = 'talking';
    }
  }, [baseAnimation, idleAnimation, talkingAnimation]);

  const modelRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const faceRef = useRef<THREE.SkinnedMesh>(null!);

  const isBraVisible = useGameStore((store) => store.isBraVisible);
  const isCorsetVisible = useGameStore((store) => store.isCorsetVisible);
  const isPantiesVisible = useGameStore((store) => store.isPantiesVisible);
  const isSkirtVisible = useGameStore((store) => store.isSkirtVisible);
  const isThighStrapsVisible = useGameStore((store) => store.isThighStrapsVisible);

  const clips = useMemo(
    () => [...baseAnimation, ...idleAnimation, ...talkingAnimation],
    [baseAnimation, idleAnimation, talkingAnimation],
  );

  const { actions, names } = useAnimations(clips, modelRef);

  useEffect(() => {
    switch (pathname) {
      case `/${PAGES.GAME}`:
        setAnimation('dance');
        break;

      case `/${PAGES.CHAT}`:
        setAnimation('idle');
        break;

      default:
        break;
    }
  }, [pathname]);

  useEffect(() => {
    const act = actions?.[animation]; // фиксируем текущий экшен в замыкании
    if (!act) return; // guard, если actions ещё не готовы

    act.reset().fadeIn(0.5).play();

    return () => {
      // на cleanup используем ТУ ЖЕ ссылку act, а не actions[animation]
      try {
        act.fadeOut(0.5);
      } catch {
        /* no-op */
      }
    };
  }, [animation, actions]);
  /**
   * Сообщаем родителю о доступности faceMesh
   */
  useEffect(() => {
    if (faceRef.current) onFaceUpdate(faceRef.current);
  }, [onFaceUpdate]);

  useEffect(() => {
    if (typeof currentAnimation !== 'undefined' && names.includes(currentAnimation) && currentAnimation !== animation) {
      setAnimation(currentAnimation);
    }
  }, [currentAnimation]);

  return (
    <>
      <group ref={modelRef} {...rest} dispose={null}>
        <group name='Scene'>
          <group name='Armature' rotation={[Math.PI / 2, 0, 0]} scale={0.011} userData={{ name: 'Armature' }}>
            <group name='Body002' ref={bodyRef} userData={{ name: 'Body.002' }}>
              <skinnedMesh
                name='Genesis8_1Female002'
                geometry={nodes.Genesis8_1Female002.geometry}
                material={materials['Body.001']}
                skeleton={nodes.Genesis8_1Female002.skeleton}
              />
              <skinnedMesh
                ref={faceRef}
                name='Genesis8_1Female002_1'
                geometry={nodes.Genesis8_1Female002_1.geometry}
                material={materials['Face.001']}
                skeleton={nodes.Genesis8_1Female002_1.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_2'
                geometry={nodes.Genesis8_1Female002_2.geometry}
                material={materials['Lips.001']}
                skeleton={nodes.Genesis8_1Female002_2.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_3'
                geometry={nodes.Genesis8_1Female002_3.geometry}
                material={materials['Teeth.001']}
                skeleton={nodes.Genesis8_1Female002_3.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_4'
                geometry={nodes.Genesis8_1Female002_4.geometry}
                material={materials['Ears.001']}
                skeleton={nodes.Genesis8_1Female002_4.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_5'
                geometry={nodes.Genesis8_1Female002_5.geometry}
                material={materials['Legs.001']}
                skeleton={nodes.Genesis8_1Female002_5.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_6'
                geometry={nodes.Genesis8_1Female002_6.geometry}
                material={materials['EyeSocket.001']}
                skeleton={nodes.Genesis8_1Female002_6.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_7'
                geometry={nodes.Genesis8_1Female002_7.geometry}
                material={materials['Mouth.001']}
                skeleton={nodes.Genesis8_1Female002_7.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_8'
                geometry={nodes.Genesis8_1Female002_8.geometry}
                material={materials['Arms.001']}
                skeleton={nodes.Genesis8_1Female002_8.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_9'
                geometry={nodes.Genesis8_1Female002_9.geometry}
                material={materials['Pupils.001']}
                skeleton={nodes.Genesis8_1Female002_9.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_10'
                geometry={nodes.Genesis8_1Female002_10.geometry}
                material={materials['EyeMoisture.001']}
                skeleton={nodes.Genesis8_1Female002_10.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_11'
                geometry={nodes.Genesis8_1Female002_11.geometry}
                material={materials['Fingernails.001']}
                skeleton={nodes.Genesis8_1Female002_11.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_12'
                geometry={nodes.Genesis8_1Female002_12.geometry}
                material={materials['Cornea.001']}
                skeleton={nodes.Genesis8_1Female002_12.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_13'
                geometry={nodes.Genesis8_1Female002_13.geometry}
                material={materials['Irises.001']}
                skeleton={nodes.Genesis8_1Female002_13.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_14'
                geometry={nodes.Genesis8_1Female002_14.geometry}
                material={materials['Sclera.001']}
                skeleton={nodes.Genesis8_1Female002_14.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_15'
                geometry={nodes.Genesis8_1Female002_15.geometry}
                material={materials['Toenails.001']}
                skeleton={nodes.Genesis8_1Female002_15.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_16'
                geometry={nodes.Genesis8_1Female002_16.geometry}
                material={materials['Head.001']}
                skeleton={nodes.Genesis8_1Female002_16.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_17'
                geometry={nodes.Genesis8_1Female002_17.geometry}
                material={materials['Eyelashes.001']}
                skeleton={nodes.Genesis8_1Female002_17.skeleton}
              />
              <skinnedMesh
                name='Genesis8_1Female002_18'
                geometry={nodes.Genesis8_1Female002_18.geometry}
                material={materials['Eyelashes2.001']}
                skeleton={nodes.Genesis8_1Female002_18.skeleton}
              />
            </group>
            <skinnedMesh
              name='Hair001'
              geometry={nodes.Hair001.geometry}
              material={materials['Hair.001']}
              skeleton={nodes.Hair001.skeleton}
              userData={{ name: 'Hair.001' }}
            />
            {isPantiesVisible && (
              <skinnedMesh
                name='Panties001'
                geometry={nodes.Panties001.geometry}
                material={materials['Panties.001']}
                skeleton={nodes.Panties001.skeleton}
                userData={{ name: 'Panties.001' }}
              />
            )}
            {isThighStrapsVisible && (
              <skinnedMesh
                name='ThighStraps001'
                geometry={nodes.ThighStraps001.geometry}
                material={materials['ThighStraps.001']}
                skeleton={nodes.ThighStraps001.skeleton}
                userData={{ name: 'ThighStraps.001' }}
              />
            )}
            {isSkirtVisible && (
              <skinnedMesh
                name='Top005'
                geometry={nodes.Top005.geometry}
                material={materials['Top3.001']}
                skeleton={nodes.Top005.skeleton}
                userData={{ name: 'Top.005' }}
              />
            )}
            {isCorsetVisible && (
              <group name='Top006' userData={{ name: 'Top.006' }}>
                <skinnedMesh
                  name='Top_83133007'
                  geometry={nodes.Top_83133007.geometry}
                  material={materials['Top.001']}
                  skeleton={nodes.Top_83133007.skeleton}
                />
                <skinnedMesh
                  name='Top_83133007_1'
                  geometry={nodes.Top_83133007_1.geometry}
                  material={materials['Top2.001']}
                  skeleton={nodes.Top_83133007_1.skeleton}
                />
              </group>
            )}
            {isBraVisible && (
              <skinnedMesh
                name='Top007'
                geometry={nodes.Top007.geometry}
                material={materials['Top.001']}
                skeleton={nodes.Top007.skeleton}
                userData={{ name: 'Top.007' }}
              />
            )}
            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>

      {/* <primitive scale={1.5} position={[3.895, 1.159, -5.343]} object={basePartner.scene} /> */}
    </>
  );
};
