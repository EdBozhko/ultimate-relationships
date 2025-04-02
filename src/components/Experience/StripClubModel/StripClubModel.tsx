'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, useHelper, SpotLight } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useControls, button } from 'leva';

import useGlobalStore from '@src/stores/useGlobalStore';
import floorSrc from '@public/models/strip_club/textures/floor.webp';
import mixerSrc from '@public/models/strip_club/textures/mixer.webp';
import tablesSrc from '@public/models/strip_club/textures/tables.webp';
import stageDownSrc from '@public/models/strip_club/textures/stage_down.webp';
import stageUpSrc from '@public/models/strip_club/textures/stage_up.webp';
import speakersSrc from '@public/models/strip_club/textures/speakers.webp';
import mixerSpeakerSrc from '@public/models/strip_club/textures/mixer_speaker.webp';
import wallsSrc from '@public/models/strip_club/textures/walls.webp';
import neonSignsSrc from '@public/models/strip_club/textures/neon_signs.webp';
import ceilingLightsSrc from '@public/models/strip_club/textures/celling_lights.webp';
import curtainsSrc from '@public/models/strip_club/textures/curtains.webp';
import doorsSrc from '@public/models/strip_club/textures/doors.001.webp';
import stairsSrc from '@public/models/strip_club/textures/stairs.webp';
import barWallSrc from '@public/models/strip_club/textures/bar_wall.webp';
import barCounterSrc from '@public/models/strip_club/textures/bar_counter.webp';
import barstoolsSrc from '@public/models/strip_club/textures/barstools.webp';
import metalChairsSrc from '@public/models/strip_club/textures/metal_chairs.webp';
import ceilingSrc from '@public/models/strip_club/textures/ceiling.webp';

useTexture.preload(floorSrc);
useTexture.preload(mixerSrc);
useTexture.preload(tablesSrc);
useTexture.preload(stageDownSrc);
useTexture.preload(stageUpSrc);
useTexture.preload(speakersSrc);
useTexture.preload(mixerSpeakerSrc);
useTexture.preload(wallsSrc);
useTexture.preload(neonSignsSrc);
useTexture.preload(ceilingLightsSrc);
useTexture.preload(curtainsSrc);
useTexture.preload(doorsSrc), useTexture.preload(stairsSrc);
useTexture.preload(barWallSrc);
useTexture.preload(barCounterSrc);
useTexture.preload(barstoolsSrc);
useTexture.preload(metalChairsSrc);
useTexture.preload(ceilingSrc);

gsap.registerPlugin(useGSAP);

type GLTFResult = GLTF & {
  nodes: {};
  materials: {};
};

const StripClubModel = (props: JSX.IntrinsicElements['group']) => {
  const bakedTextures = {
    floor: useTexture(floorSrc),
    mixerBakedTexture: useTexture(mixerSrc),
    tablesBakedTexture: useTexture(tablesSrc),
    stageDownBakedTexture: useTexture(stageDownSrc),
    stageUpBakedTexture: useTexture(stageUpSrc),
    speakersBakedTexture: useTexture(speakersSrc),
    mixerSpeakersBakedTexture: useTexture(mixerSpeakerSrc),
    wallsBakedTexture: useTexture(wallsSrc),
    neonSignsBakedTexture: useTexture(neonSignsSrc),
    ceilingLightsBakedTexture: useTexture(ceilingLightsSrc),
    curtainsBakedTexture: useTexture(curtainsSrc),
    doorsBakedTexture: useTexture(doorsSrc),
    stairsBakedTexture: useTexture(stairsSrc),
    barWallBakedTexture: useTexture(barWallSrc),
    barCounterBakedTexture: useTexture(barCounterSrc),
    barstoolsBakedTexture: useTexture(barstoolsSrc),
    metalChairsBakedTexture: useTexture(metalChairsSrc),
    ceilingBakedTexture: useTexture(ceilingSrc),
  };
  const isDebugMode = useGlobalStore((state) => state.isDebugMode);

  const refs = {
    ceilingStageLight: useRef<THREE.Mesh>(null!),
    surfaceMarker: useRef<THREE.Object3D>(null!),
    spotLight: useRef<THREE.SpotLight>(null!),
    stayWildSign: useRef<THREE.Mesh>(null!),
    floor: useRef<THREE.Mesh>(null!),
  };

  const spotLightDebug = useControls('spotLight', {
    color: '#ffffff',
    penumbra: { min: 0, max: 1, step: 0.1, value: 1 },
    intensity: { min: 0, max: 100, step: 1, value: 7 },
    angle: { min: 0, max: Math.PI / 2, step: 0.01, value: 0.5 },
    decay: { min: -2, max: 2, step: 1, value: 0 },
  });

  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);
  const [spotLightDistance, setSpotLightDistance] = useState(0.1);

  const stripClub = useGLTF('/models/strip_club/strip_club.glb');
  const { nodes, materials } = stripClub as GLTFResult;

  isDebugMode && useHelper(refs.spotLight, THREE.SpotLightHelper, 'yellow');

  useEffect(() => {
    const initialPosition = refs.stayWildSign.current.position;
    const markerPosition = refs.surfaceMarker.current.position;
    // const initialPosition = markerPosition;
    camera.position.copy(initialPosition);
    camera.position.x += 1.5;
    camera.position.y += 1;
    camera.position.z += 5;

    const lookAtTarget = new THREE.Vector3().copy(initialPosition);
    lookAtTarget.x += 1.5;
    controls.target = lookAtTarget;
  }, []);

  useEffect(() => {
    refs.spotLight.current.position.copy(refs.ceilingStageLight.current.position);
    refs.spotLight.current.target = refs.surfaceMarker.current;
    setSpotLightDistance(refs.spotLight.current.position.distanceTo(refs.floor.current.position) * 1.5);
  }, [refs.ceilingStageLight, refs.surfaceMarker]);

  useGSAP(() => {
    setTimeout(() => {
      const fromCoords = controls.target;
      const toCoords = refs.surfaceMarker.current.position;

      const gsapTimeline1 = gsap.timeline({});
      const gsapTimeline2 = gsap.timeline({});

      gsapTimeline1
        .fromTo(
          camera.position,
          { z: camera.position.z, delay: 1, ease: 'power1.out' },
          {
            z: 0,
            duration: 2.5,
            ease: 'power1.out',
          },
        )
        .to(camera.position, {
          x: toCoords.x - 0.5,
          y: toCoords.y + 0.5,
          z: toCoords.z + 0.5,
          duration: 2.5,
          ease: 'power1.out',
        });

      gsapTimeline2.fromTo(
        controls.target,
        { ...fromCoords, delay: 1, ease: 'power1.out' },
        { ...toCoords, duration: 2.5, ease: 'power1.out' },
      );
    }, 1000);
  }, []);

  return (
    <>
      <spotLight
        ref={refs.spotLight}
        color={spotLightDebug.color}
        castShadow
        angle={spotLightDebug.angle}
        penumbra={spotLightDebug.penumbra}
        decay={spotLightDebug.decay}
        intensity={spotLightDebug.intensity}
        distance={spotLightDistance}
      />

      <group {...props} dispose={null}>
        <group ref={refs.surfaceMarker} name='surface_marker' position={[3.895, 1.159, -5.343]} />

        <mesh
          name='speaker'
          geometry={nodes.speaker.geometry}
          position={[18.171, 5.429, -17.087]}
          rotation={[Math.PI, -0.751, Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.speakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='speaker003'
          geometry={nodes.speaker003.geometry}
          position={[6.56, 4.782, -17.429]}
          rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
        >
          <meshStandardMaterial map={bakedTextures.speakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='speaker004'
          geometry={nodes.speaker004.geometry}
          position={[0.797, 4.782, -17.429]}
          rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
        >
          <meshStandardMaterial map={bakedTextures.speakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='speaker005'
          geometry={nodes.speaker005.geometry}
          position={[-12.088, 5.429, -17.137]}
          rotation={[0, -0.752, -Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.speakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='speaker006'
          geometry={nodes.speaker006.geometry}
          position={[-12.127, 5.429, 8.416]}
          rotation={[0, 0.774, -Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.speakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='speaker007'
          geometry={nodes.speaker007.geometry}
          position={[18.116, 5.429, 8.43]}
          rotation={[-Math.PI, 0.921, Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.speakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='mixer_speaker001'
          geometry={nodes.mixer_speaker001.geometry}
          position={[15.337, 0.571, -15.605]}
          rotation={[Math.PI, -0.751, Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.mixerSpeakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='mixer_speaker'
          geometry={nodes.mixer_speaker.geometry}
          position={[16.494, 0.571, -14.321]}
          rotation={[Math.PI, -0.751, Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.mixerSpeakersBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='mixer'
          geometry={nodes.mixer.geometry}
          position={[15.763, -10.12, -7.396]}
          rotation={[-Math.PI, 0.876, -Math.PI]}
          scale={0.506}
        >
          <meshStandardMaterial map={bakedTextures.mixerBakedTexture} map-flipY={false} />
        </mesh>
        <group name='door001' position={[11.144, 0.017, 15.365]}>
          <mesh name='DoorFrame' geometry={nodes.DoorFrame.geometry}>
            <meshStandardMaterial map={bakedTextures.doorsBakedTexture} map-flipY={false} />

            <mesh name='Door' geometry={nodes.Door.geometry} position={[0.867, 2.177, 0.046]}>
              <meshStandardMaterial map={bakedTextures.doorsBakedTexture} map-flipY={false} />

              <mesh
                name='Handle_Front'
                geometry={nodes.Handle_Front.geometry}
                position={[-1.584, 0, -0.06]}
                rotation={[-Math.PI, 0, 0]}
              >
                <meshStandardMaterial map={bakedTextures.doorsBakedTexture} map-flipY={false} />
              </mesh>
            </mesh>
          </mesh>
        </group>
        <group name='door' position={[20.245, 0.005, 0.111]} rotation={[0, Math.PI / 2, 0]}>
          <mesh name='DoorFrame001' geometry={nodes.DoorFrame001.geometry}>
            <meshStandardMaterial map={bakedTextures.doorsBakedTexture} map-flipY={false} />

            <mesh
              name='Door001'
              geometry={nodes.Door001.geometry}
              material={nodes.Door001.material}
              position={[0.865, 2.174, 0.046]}
            >
              <meshStandardMaterial map={bakedTextures.doorsBakedTexture} map-flipY={false} />

              <mesh
                name='Handle_Front001'
                geometry={nodes.Handle_Front001.geometry}
                material={nodes.Handle_Front001.material}
                position={[-1.582, 0, -0.06]}
                rotation={[-Math.PI, 0, 0]}
              >
                <meshStandardMaterial map={bakedTextures.doorsBakedTexture} map-flipY={false} />
              </mesh>
            </mesh>
          </mesh>
        </group>

        <mesh
          name='curtain'
          geometry={nodes.curtain.geometry}
          position={[3.772, 1.147, -16.853]}
          rotation={[1.32, 0, 0]}
        >
          <meshStandardMaterial map={bakedTextures.curtainsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='curtain001'
          geometry={nodes.curtain001.geometry}
          position={[3.744, 3.413, -17.341]}
          rotation={[1.32, 0, 0]}
        >
          <meshStandardMaterial map={bakedTextures.curtainsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='curtain002'
          geometry={nodes.curtain002.geometry}
          position={[-12.418, -0.014, -4.372]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.curtainsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='curtain003'
          geometry={nodes.curtain003.geometry}
          position={[-12.972, 2.517, -4.241]}
          rotation={[Math.PI / 2, 0.021, -Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.curtainsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='curtain004'
          geometry={nodes.curtain004.geometry}
          position={[18.361, -0.007, 0.159]}
          rotation={[Math.PI / 2, -0.251, Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.curtainsBakedTexture} map-flipY={false} />
        </mesh>

        <mesh name='barstool008' geometry={nodes.barstool008.geometry} position={[-1.675, 1.605, 14.02]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle018' geometry={nodes.Circle018.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool' geometry={nodes.barstool.geometry} position={[-1.675, 1.605, 14.02]}>
          <meshBasicMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle004' geometry={nodes.Circle004.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool003' geometry={nodes.barstool003.geometry} position={[-1.714, 1.605, 12.587]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle008' geometry={nodes.Circle008.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool005' geometry={nodes.barstool005.geometry} position={[-1.602, 1.605, 11.101]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle012' geometry={nodes.Circle012.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool002' geometry={nodes.barstool002.geometry} position={[-0.127, 1.605, 9.203]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle007' geometry={nodes.Circle007.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool004' geometry={nodes.barstool004.geometry} position={[1.801, 1.605, 9.495]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle011' geometry={nodes.Circle011.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool006' geometry={nodes.barstool006.geometry} position={[3.579, 1.605, 9.437]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle014' geometry={nodes.Circle014.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool007' geometry={nodes.barstool007.geometry} position={[5.632, 1.605, 9.497]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle016' geometry={nodes.Circle016.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool001' geometry={nodes.barstool001.geometry} position={[7.157, 1.605, 9.517]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle019' geometry={nodes.Circle019.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>
        <mesh name='barstool009' geometry={nodes.barstool009.geometry} position={[8.8, 1.605, 9.649]}>
          <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          <mesh name='Circle021' geometry={nodes.Circle021.geometry} position={[0, -0.013, 0]}>
            <meshStandardMaterial map={bakedTextures.barstoolsBakedTexture} map-flipY={false} />
          </mesh>
        </mesh>

        <mesh
          name='neon_sign_neon_shoe'
          geometry={nodes.neon_sign_neon_shoe.geometry}
          position={[18.519, 2.793, -9.379]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.neonSignsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='neon_sign_happy_hour_sign'
          geometry={nodes.neon_sign_happy_hour_sign.geometry}
          position={[-2.229, 3.328, 15.326]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.neonSignsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='neon_sign_fun_neon'
          geometry={nodes.neon_sign_fun_neon.geometry}
          position={[-12.518, 2.977, 2.916]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.neonSignsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='neon_sign_live_music_sign'
          geometry={nodes.neon_sign_live_music_sign.geometry}
          position={[13.915, 4.826, -17.417]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial map={bakedTextures.neonSignsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          ref={refs.stayWildSign}
          name='stay_wild'
          geometry={nodes.stay_wild.geometry}
          position={[-7.516, 4.044, -17.491]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial map={bakedTextures.neonSignsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='neon_sign_neon_shoe001'
          geometry={nodes.neon_sign_neon_shoe001.geometry}
          position={[18.519, 2.793, -8.551]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial map={bakedTextures.neonSignsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='bar_wall001' geometry={nodes.bar_wall001.geometry} position={[3.018, 0, -4.342]}>
          <meshStandardMaterial map={bakedTextures.barWallBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='bar_wall002' geometry={nodes.bar_wall002.geometry} position={[3.018, 0, -4.342]}>
          <meshStandardMaterial map={bakedTextures.barWallBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='bar_wall' geometry={nodes.bar_wall.geometry} position={[3.018, 0, -4.342]}>
          <meshStandardMaterial map={bakedTextures.barWallBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          ref={refs.ceilingStageLight}
          name='ceiling_lights'
          geometry={nodes.ceiling_lights.geometry}
          position={[3.781, 5.545, -3.501]}
          rotation={[0, 0, Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.ceilingLightsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='ceiling_lights001'
          geometry={nodes.ceiling_lights001.geometry}
          position={[3.781, 5.853, 1.493]}
          rotation={[Math.PI, 0, 0]}
        >
          <meshStandardMaterial map={bakedTextures.ceilingLightsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='ceiling_lights002'
          geometry={nodes.ceiling_lights002.geometry}
          position={[6.428, 6.291, -0.954]}
          rotation={[-Math.PI, -Math.PI / 2, 0]}
        >
          <meshStandardMaterial map={bakedTextures.ceilingLightsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='ceiling_lights003'
          geometry={nodes.ceiling_lights003.geometry}
          position={[0.504, 6.291, -2.323]}
          rotation={[Math.PI, 1.571, 0]}
        >
          <meshStandardMaterial map={bakedTextures.ceilingLightsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table008'
          geometry={nodes.table008.geometry}
          position={[-8.635, -0.013, -11.422]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table009'
          geometry={nodes.table009.geometry}
          material={nodes.table009.material}
          position={[-3.215, -0.013, -12.275]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table007'
          geometry={nodes.table007.geometry}
          position={[-4.869, -0.013, -7.006]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table006'
          geometry={nodes.table006.geometry}
          position={[-8.236, -0.013, 4.975]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table004'
          geometry={nodes.table004.geometry}
          position={[-3.093, -0.013, 0.955]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table005'
          geometry={nodes.table005.geometry}
          position={[5.739, -0.013, 1.951]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table001'
          geometry={nodes.table001.geometry}
          position={[14.087, -0.013, 4.496]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table002'
          geometry={nodes.table002.geometry}
          position={[13.586, -0.013, -4.611]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='table003'
          geometry={nodes.table003.geometry}
          position={[12.51, -0.013, -10.531]}
          rotation={[0, -0.4, 0]}
        >
          <meshStandardMaterial map={bakedTextures.tablesBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair030'
          geometry={nodes.metal_chair030.geometry}
          position={[-10.175, 0.019, -12.079]}
          rotation={[0, -0.675, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair031'
          geometry={nodes.metal_chair031.geometry}
          position={[-10.286, 0.019, -10.408]}
          rotation={[0, 0.375, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair029'
          geometry={nodes.metal_chair029.geometry}
          position={[-8.881, 0.019, -9.545]}
          rotation={[0, 1.493, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair008'
          geometry={nodes.metal_chair008.geometry}
          position={[-6.07, 0.019, -8.016]}
          rotation={[0, -0.675, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair009'
          geometry={nodes.metal_chair009.geometry}
          position={[-6.181, 0.019, -6.346]}
          rotation={[0, 0.375, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair010'
          geometry={nodes.metal_chair010.geometry}
          position={[-4.775, 0.019, -5.483]}
          rotation={[0, 1.493, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair011'
          geometry={nodes.metal_chair011.geometry}
          position={[-3.208, 0.019, -13.943]}
          rotation={[Math.PI, -1.553, Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair012'
          geometry={nodes.metal_chair012.geometry}
          position={[-4.598, 0.019, -13.01]}
          rotation={[0, -0.538, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair013'
          geometry={nodes.metal_chair013.geometry}
          position={[-4.422, 0.019, -11.37]}
          rotation={[0, 0.579, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair004'
          geometry={nodes.metal_chair004.geometry}
          position={[-9.654, 0.019, 4.153]}
          rotation={[0, -0.494, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair005'
          geometry={nodes.metal_chair005.geometry}
          position={[-9.462, 0.019, 5.816]}
          rotation={[0, 0.557, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair006'
          geometry={nodes.metal_chair006.geometry}
          position={[-7.924, 0.019, 6.411]}
          rotation={[-Math.PI, 1.467, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair002'
          geometry={nodes.metal_chair002.geometry}
          position={[-4.626, 0.019, 0.23]}
          rotation={[0, -0.494, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair003'
          geometry={nodes.metal_chair003.geometry}
          position={[-4.434, 0.019, 1.894]}
          rotation={[0, 0.557, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair007'
          geometry={nodes.metal_chair007.geometry}
          position={[-2.896, 0.019, 2.489]}
          rotation={[-Math.PI, 1.467, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair001'
          geometry={nodes.metal_chair001.geometry}
          position={[4.879, 0.019, 3.002]}
          rotation={[0, 0.948, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair028'
          geometry={nodes.metal_chair028.geometry}
          position={[6.528, 0.019, 2.965]}
          rotation={[-Math.PI, 1.076, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair014'
          geometry={nodes.metal_chair014.geometry}
          position={[13.775, 0.019, 5.776]}
          rotation={[0, 1.533, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair015'
          geometry={nodes.metal_chair015.geometry}
          position={[15.129, 0.019, 4.834]}
          rotation={[-Math.PI, 0.49, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair016'
          geometry={nodes.metal_chair016.geometry}
          position={[14.302, 0.019, -3.695]}
          rotation={[-Math.PI, 0.868, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair017'
          geometry={nodes.metal_chair017.geometry}
          position={[14.666, 0.019, -5.303]}
          rotation={[Math.PI, -0.25, Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair018'
          geometry={nodes.metal_chair018.geometry}
          position={[13.482, 0.019, -9.76]}
          rotation={[-Math.PI, 0.868, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair019'
          geometry={nodes.metal_chair019.geometry}
          position={[13.846, 0.019, -11.368]}
          rotation={[Math.PI, -0.25, Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair032'
          geometry={nodes.metal_chair032.geometry}
          position={[7.291, 0.019, -9.737]}
          rotation={[Math.PI, -0.25, Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair025'
          geometry={nodes.metal_chair025.geometry}
          position={[7.932, 0.019, -7.529]}
          rotation={[-Math.PI, 0.034, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair026'
          geometry={nodes.metal_chair026.geometry}
          position={[7.382, 0.019, -2.909]}
          rotation={[-Math.PI, 0.858, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair020'
          geometry={nodes.metal_chair020.geometry}
          position={[4.473, 0.019, -1.675]}
          rotation={[-Math.PI, 1.343, -Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair021'
          geometry={nodes.metal_chair021.geometry}
          position={[0.763, 0.019, -2.437]}
          rotation={[0, 0.906, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair022'
          geometry={nodes.metal_chair022.geometry}
          position={[-0.787, 0.019, -4.643]}
          rotation={[0, 0.399, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair023'
          geometry={nodes.metal_chair023.geometry}
          position={[-0.487, 0.019, -7.701]}
          rotation={[0, -0.248, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='metal_chair024'
          geometry={nodes.metal_chair024.geometry}
          position={[0.229, 0.019, -9.734]}
          rotation={[0, -0.648, 0]}
        >
          <meshStandardMaterial map={bakedTextures.metalChairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='stage_down'
          geometry={nodes.stage_down.geometry}
          position={[3.833, 1.156, -13.407]}
          rotation={[0, -0.019, 0]}
          receiveShadow
        >
          <meshStandardMaterial map={bakedTextures.stageDownBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='stage_up'
          geometry={nodes.stage_up.geometry}
          position={[3.833, 5.5, -13.461]}
          rotation={[0, 0.019, Math.PI]}
        >
          <meshStandardMaterial map={bakedTextures.stageUpBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='pole' geometry={nodes.pole.geometry} position={[3.891, 3.443, -13.545]}>
          <meshStandardMaterial map={bakedTextures.stageUpBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='walls' geometry={nodes.walls.geometry} position={[3.018, 0, -4.342]}>
          <meshStandardMaterial map={bakedTextures.wallsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='walls005' geometry={nodes.walls005.geometry} position={[3.018, 0, -4.342]}>
          <meshStandardMaterial map={bakedTextures.wallsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='ceiling001' geometry={nodes.ceiling001.geometry} position={[3.018, 0.011, -4.342]}>
          <meshStandardMaterial map={bakedTextures.ceilingBakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          name='Stairs'
          geometry={nodes.Stairs.geometry}
          position={[-7.906, 0, 12.156]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <meshStandardMaterial map={bakedTextures.stairsBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='bar_counter_bottom' geometry={nodes.bar_counter_bottom.geometry} position={[4.292, 0.845, 11.314]}>
          <meshStandardMaterial map={bakedTextures.barCounterBakedTexture} map-flipY={false} />
        </mesh>
        <mesh name='bar_counter_top' geometry={nodes.bar_counter_top.geometry} position={[4.292, 0.845, 11.314]}>
          <meshStandardMaterial map={bakedTextures.barCounterBakedTexture} map-flipY={false} />
        </mesh>
        <mesh ref={refs.floor} name='floor' geometry={nodes.floor.geometry} position={[3.018, 0, -4.342]}>
          <meshStandardMaterial map={bakedTextures.floor} map-flipY={false} />
        </mesh>
      </group>
    </>
  );
};

export default StripClubModel;
