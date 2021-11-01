import React, {Suspense, useRef, useEffect} from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import {parse, stringify, toJSON, fromJSON} from 'flatted';

// R3F
import * as THREE from 'three';
import { Canvas, useFrame, extend, useLoader, useThree } from "react-three-fiber";
import { Html, useProgress, useGLTF } from "@react-three/drei";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const useEquirectangularHDR = (url) => {
  const { gl } = useThree();
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  pmremGenerator.compileEquirectangularShader();

  const hdrEquirect = useLoader(RGBELoader, url);

  const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
  hdrEquirect.dispose();
  pmremGenerator.dispose();

  return hdrCubeRenderTarget.texture;
};

const fitCameraToCenteredObject = function (camera, object, offset, orbitControls ) {
  const boundingBox = new THREE.Box3();
  boundingBox.setFromObject( object );

  var middle = new THREE.Vector3();
  var size = new THREE.Vector3();
  boundingBox.getSize(size);

  // figure out how to fit the box in the view:
  // 1. figure out horizontal FOV (on non-1.0 aspects)
  // 2. figure out distance from the object in X and Y planes
  // 3. select the max distance (to fit both sides in)
  //
  // The reason is as follows:
  //
  // Imagine a bounding box (BB) is centered at (0,0,0).
  // Camera has vertical FOV (camera.fov) and horizontal FOV
  // (camera.fov scaled by aspect, see fovh below)
  //
  // Therefore if you want to put the entire object into the field of view,
  // you have to compute the distance as: z/2 (half of Z size of the BB
  // protruding towards us) plus for both X and Y size of BB you have to
  // figure out the distance created by the appropriate FOV.
  //
  // The FOV is always a triangle:
  //
  //  (size/2)
  // +--------+
  // |       /
  // |      /
  // |     /
  // | F° /
  // |   /
  // |  /
  // | /
  // |/
  //
  // F° is half of respective FOV, so to compute the distance (the length
  // of the straight line) one has to: `size/2 / Math.tan(F)`.
  //
  // FTR, from https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
  // the camera.fov is the vertical FOV.

  const fov = camera.fov * ( Math.PI / 180 );
  const fovh = 2*Math.atan(Math.tan(fov/2) * camera.aspect);
  let dx = size.z / 2 + Math.abs( size.x / 2 / Math.tan( fovh / 2 ) );
  let dy = size.z / 2 + Math.abs( size.y / 2 / Math.tan( fov / 2 ) );
  let cameraZ = Math.max(dx, dy);

  // offset the camera, if desired (to avoid filling the whole canvas)
  if( offset !== undefined && offset !== 0 ) cameraZ *= offset;

  camera.position.set( 0, 0, cameraZ );

  // set the far plane of the camera so that it easily encompasses the whole object
  const minZ = boundingBox.min.z;
  const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

  camera.far = cameraToFarEdge * 3;
  camera.updateProjectionMatrix();

  if ( orbitControls !== undefined ) {
      // set camera to rotate around the center
      orbitControls.target = new THREE.Vector3(0, 0, 0);

      // prevent camera from zooming out far enough to create far plane cutoff
      orbitControls.maxDistance = cameraToFarEdge * 2;
  }
};

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Model({ url }) {
  // const { viewport } = useThree();
  const gltf = useGLTF(url, true);
  
  // console.log('gltf bounding box: ', gltf);
  // gltf.scene.environment = useEquirectangularHDR('/models/environment2.hdr');
  // console.log('THREE', THREE);

  // const textHeight = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Height.png');
  // const textRoughness = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Roughness.png');
  // const textMetallic = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Metallic.png');
  // const textNormal = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Normal.png');
  // const textBaseColor = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Base_Color.png');
  const matcapTexture = useLoader(THREE.TextureLoader, '/matcaps/31.png');
  /* good matcaps: 1, 2, 4, */
  let video;
  useEffect(() => {
    video = document.getElementById( 'bg-video' )
  });
  // const videoTexture = new THREE.VideoTexture(video);

  var model = gltf.scene;
  var newMaterial = new THREE.MeshMatcapMaterial({
    // displacementMap: textHeight,
    // bumpMap: textHeight,
    // bumpScale: 0.03,
    // map: textBaseColor,
    // normalMap: textNormal,
    // color: 'rgb(103,127,145)',
    // metalness: 1,
    // roughness: 0.3,
    // refractionRatio: 0.25,
    // envMap: gltf.scene.environment,
    // envMapIntensity: 1
    matcap: matcapTexture
  });
  model.traverse((o) => {
    if (o.isMesh) o.material = newMaterial;
  });

  const { camera, size: { width, height } } = useThree();

const aabb = new THREE.Box3().setFromObject(model);
const sphere = aabb.getBoundingSphere(new THREE.Sphere());
const { center, radius } = sphere;

camera.position.copy(center.clone().add(new THREE.Vector3(1.0 * radius, 0 * radius, 1.0 * radius)));
camera.far = 10 * radius;

// camera.zoom = Math.min(
//   (width / (aabb.max.x - aabb.min.x)),
//   (height / (aabb.max.y - aabb.min.y))
// );
camera.lookAt(model)
camera.updateProjectionMatrix();

  return <primitive object={model} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Directional light */}
      {/* <directionalLight position={[10, 10, 15]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 10]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      /> */}
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[0, -80, -20]}>
          <Model url={modelPath} />
        </mesh>
      </group>
  );
};

const ProductModel = (props) => {
  const { modelURL } = props
  // console.log(`modelURL: ${modelURL}`)

  return (
    <>
    {/* <div className="product-image"> */}
    { typeof window !== 'undefined' ?
      <Canvas
        concurrent
        colorManagement
        orthographic
        dpr={{automatic: [1, 2]}}
        camera={{ position: [0, 0, 100], fov: 80, zoom: 3.5 }}>
        <CameraControls />
        {/* Lights Component */}
        {/* <Lights /> */}
        <Suspense fallback={<Html><div className="loading-model"></div></Html>}>
          <HTMLContent
            domContent={null}
            bgColor='#f15946'
            modelPath={modelURL}
            position={80}>
          </HTMLContent>
        </Suspense>
      </Canvas> : ''}
    {/* </div> */}
    
    
  </>
  )
}

export default ProductModel