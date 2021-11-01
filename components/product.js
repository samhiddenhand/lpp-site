import React, {Suspense, useRef, useEffect} from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

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
  const gltf = useGLTF(url, true);
  
  console.log('gltf model: ', gltf);
  gltf.scene.environment = useEquirectangularHDR('/models/environment2.hdr');
  console.log('THREE', THREE);

  const textHeight = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Height.png');
  const textRoughness = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Roughness.png');
  const textMetallic = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Metallic.png');
  const textNormal = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Normal.png');
  const textBaseColor = useLoader(THREE.TextureLoader, '/models/textures/Brushed_iron_02_1K_Base_Color.png');
  let video;
  useEffect(() => {
    video = document.getElementById( 'bg-video' )
  });
  // const videoTexture = new THREE.VideoTexture(video);

  var model = gltf.scene;
  var newMaterial = new THREE.MeshStandardMaterial({
    displacementMap: textHeight,
    bumpMap: textHeight,
    bumpScale: 0.03,
    map: textBaseColor,
    normalMap: textNormal,
    color: 'rgb(103,127,145)',
    metalness: 1,
    roughness: 0.3,
    refractionRatio: 0.25,
    envMap: gltf.scene.environment,
    envMapIntensity: 1
  });
  model.traverse((o) => {
    if (o.isMesh) o.material = newMaterial;
  });
  return <primitive object={model} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Directional light */}
      <directionalLight position={[10, 10, 15]} intensity={1} />
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
      />
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
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model url={modelPath} />
        </mesh>
      </group>
  );
};

const Product = () => {

  return (
  <section className="product-box">
    <div className="product-image">
    { typeof window !== 'undefined' ?
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 100], fov: 70 }}>
        <CameraControls />
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={<Html><img src="/3Dplaceholder.png" /></Html>}>
          <HTMLContent
            domContent={null}
            bgColor='#f15946'
            modelPath='/models/Compas.glb'
            position={60}>
          </HTMLContent>
        </Suspense>
      </Canvas> : ''}
    </div>
    <div className="product-info">
      <h2>Product Name</h2>
      <article className="product-description">
        <p>Quisque varius convallis eros at efficitur. Nam ante eros, dignissim eu mauris eget, dictum sodales lectus. Aliquam quis mattis lacus, non ornare sem.</p>
        <p>Maecenas gravida neque sed tincidunt vestibulum. Integer sed nunc at magna pulvinar elementum. Nulla aliquet felis eget lorem commodo, id posuere orci scelerisque. Praesent volutpat libero quis nunc sollicitudin, at rhoncus lacus varius. Aenean ultrices porttitor orci, lobortis molestie tortor tempor at. Suspendisse diam ipsum, vestibulum eget magna quis, tristique iaculis dui. Nunc at purus ex. Nam feugiat lacus in nisi porttitor viverra. Maecenas a justo quam. Aliquam non rhoncus ligula. Etiam ut feugiat lorem, consectetur efficitur mi. Quisque ac consectetur sapien.</p>

      </article>

      
      <article className="product-specs">
        <h3>Technical Specifications</h3>
        <ul>
          <li>137/222 Quisque varius convallis eros at efficitur.</li>
          <li>Nam ante eros, 360 dignissim eu mauris eget</li>
          <li>Aliquam quis mattis lacus, non ornare sem: 356</li>
          <li>0.33 Maecenas gravida neque sed tincidunt vestibulum.</li>
        </ul>
      </article>

      
      <article className="product-downloads">
        <h3>Downloads</h3>
        <p><a href="#">Product Catalog PDF</a></p>
        <p><a href="#">Product Technical Specifications</a></p>
      </article>
    </div>
    <style jsx>{`
    .product-box {
      width: 100%;
      height: 100%;
      padding: var(--grid-gap-unit);
      /* color: var(--lpp-gray-translucent); */
      color: #333;
      float: left;

      .product-image {
        width: 33%;
        height: 100%;
        float: left;
        position: relative;
        /* padding: var(--grid-gap-unit); */
        cursor: grab;
        /* z-index: -1; */

        img {
          width: 100%;
        }
      }

      .product-info {
        display: block;
        float: left;
        width: 66%;
        /* padding: calc(var(--grid-gap-unit) * 2); */
        margin-bottom: var(--lpp-logo-height);

        h2 {
          font-variant: small-caps;
          color: #fff;
          text-shadow: 2px 2px 2px var(--lpp-gray);
        }

        h3 {
          margin-bottom: var(--grid-gap-unit);
          /* text-shadow: 2px 2px 2px var(--lpp-red); */
        }

        article {
          float: left;
          /* text-align: justify; */
          margin-bottom: var(--grid-gap-unit);
          margin-right: calc(var(--grid-gap-unit) * 2);
          letter-spacing: 0.02em;
          /* font-variant: small-caps; */
          /* text-shadow: 2px 2px 2px var(--lpp-gray); */

          p {
           font-weight: 100; 
           color: #fff;
           text-shadow: 2px 2px 2px #333;
          }
          

          li {
            list-style-type: "→ ";
            font-weight: 100;
            font-style: italic;
          }

          a {
            color: var(--lpp-red);
            text-decoration: underline;
          }

          &.product-specs, &.product-downloads {
            float: left;
            width: 25vw;
            background-color: rgba(255, 255, 255, 0.3);
            -webkit-backdrop-filter: blur(10px);
            border-radius: calc(var(--grid-gap-unit) * 2);
            padding: calc(var(--grid-gap-unit) * 2);
            margin-bottom: var(--lpp-logo-height);
            box-shadow: 2px 2px 2px #33333377;
            backdrop-filter: blur(10px);
            
            p, a {
              text-shadow: none;
            }
          }
        }


        .product-description {
          float: left;
          width: 25vw;
          font-weight: 300;
          line-height: 1.5em;
          columns: 21em auto;

          p {
            margin-bottom: var(--grid-gap-unit);
          }
        }
      }
    }
    `}</style>
    
  </section>
  )
}

export default Product