import React, {useRef} from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Product from '../components/product'

const ProductPage = () => {
  const videoRef = useRef()

  return (
  <div>
    
    <div className="styled-video">
      <video ref={videoRef} id="bg-video" playsInline="playsinline" autoPlay="autoplay" muted={true} loop="loop" onLoadedMetadata={/*videoRef.muted = true*/console.log('videoRef: ',videoRef)}>
        <source src="/LPP_Video.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="background-mat"></div>
    
    {/* <div className="video-filter"></div> */}
    <Head title="Home" />
    <Header />
    <div className="main-wrapper">
    <main>
      <Product />
    </main>
    </div>
    <Footer />

    <style jsx>{`
    :global(body) {
        /* transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1); */
        overflow-x: hidden;
      }
      /* :global(body.nav-open) {
        transform: translateX(-33vw);
      } */
      :global(.styled-video) {
        /* display: none; */
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--lpp-gray-translucent);
        /* background-color: #fff; */
        /* background-image: url('/trianglify-lowres.png'); */
        /* background-color: yellowgreen; */
        background-size: cover;
        z-index: -3;
      }
      :global(#bg-video) {
        /* display: none; */
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        object-fit: cover;
        opacity: 1;
        filter: url('#convoblur');

      }
      :global(.background-mat) {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        /* background-image: url('#whitecarbon'); */
        z-index: -2;
      }
      :global(.video-filter) {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        /* background-color: var(--lpp-red); */
        /* backdrop-filter: blur(10px); */
        opacity: 0.5
      }
      :global(.main-wrapper) {
        float: left;
        height: calc(100vh - var(--lpp-header-height));
        width: 100vw;
        margin-top: var(--lpp-header-height);
        overflow: hidden;
        transition: width 600ms cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 9999;
        position: absolute;
      }
      :global(main) {
        float: left;
        height: calc(calc(100vh - var(--lpp-header-height)) + 10vw);
        width: 110vw;
        overflow-y: auto;
        padding: var(--grid-gap-unit);
        margin-top: -5vw;
        margin-left: -5vw;
        padding-top: 2vw;
        line-height: 1.5rem;
        border: 5vw solid var(--lpp-white);
        /* border-top: 5vw solid transparent; */
        border-radius: 7vw;
        transition: width 600ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      :global(body.nav-open) {
        .main-wrapper {
          width: 75vw;
          
          main {
            width: 85vw;
          }
        }
        
      }
    `}</style>
    
  </div>);
}

ProductPage.useEffect = () => {
  videoRef = useRef()
}

export default ProductPage
