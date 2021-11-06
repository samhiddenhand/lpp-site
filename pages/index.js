import React, {useRef} from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Product from '../components/product'
import client from '../src/client'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import { LanguageContext } from '../components/languageContext'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const Home = (props) => {
  console.log(`props: ${JSON.stringify(props)}`)
  const { title = '', slug = '', description = '' } = props.data.about[0]
  const { title:newsTitle, slug:newsSlug, description:newsDescription, issueDate:newsDate, image:newsImage } = props.data.news[0]
  const videoRef = useRef()

  return (
  <div>
    
    <div className="styled-video">
      <video ref={videoRef} id="bg-video" playsInline="playsinline" autoPlay="autoplay" muted={true} loop="loop" onLoadedMetadata={/*videoRef.muted = true*/console.log('videoRef: ',videoRef)}>
        <source src="/LPP_Video.mp4" type="video/mp4" />
      </video>
      <video ref={videoRef} id="bg-video-drone" playsInline="playsinline" autoPlay="autoplay" muted={true} loop="loop" onLoadedMetadata={/*videoRef.muted = true*/console.log('videoRef: ',videoRef)}>
        <source src="/Drone_LPP_small.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="background-mat"></div>
    
    {/* <div className="video-filter"></div> */}
    <Head title="Home" />
    <Header page="home" />
    <div className="main-wrapper">
    <main>
      <section className="about">
        {/* <video id="about-video" playsInline="playsinline" autoPlay="autoplay" muted={true} loop="loop">
          <source src="/Drone_LPP_small.mp4" type="video/mp4" />
        </video> */}
        <div className="about-text">
          <h2>{title}</h2>
          <BlockContent blocks={description} />
          <p style={{'text-align':'center'}}>⤓</p>
        </div>
      </section>

      <div className="news-wrapper">
      <Link href="/product">
        <section className="featured-product product-1">
        <h2>Featured Product</h2>
      </section>
      </Link>

      <section className="news">
        <h2>News</h2>
        <h3>{newsTitle}</h3>
        <BlockContent blocks={newsDescription} />
      </section>
      </div>
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
      #bg-video-drone {
        /* display: none; */
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        object-fit: cover;
        opacity: 1;
        /* mix-blend-mode: multiply; */
        /* mix-blend-mode: hard-light; */
        /* filter: url('#convoblur'); */

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
      

      :global(body.nav-open) {
        @media(min-width: 854px) {
        .main-wrapper {
                  width: 75vw;
                  
                  main {
                    width: 83vw;
                  }
                } 
}
        
        
      }

      main {
        /* padding: calc(var(--grid-gap-unit) * 3);
        padding-top: calc(var(--grid-gap-unit) * 8); */
        padding: 0;
        /* margin-top: calc(var(--lpp-logo-height) * -2); */
      }

      section {
        display: block;
        float: left;
        width: 100%;
        /* background-color: rgba(255, 255, 255, 0.3); */
        background-color: var(--lpp-gray-translucent);
        -webkit-backdrop-filter: blur(10px);
        border-radius: calc(var(--grid-gap-unit) * 2);
        padding: calc(var(--grid-gap-unit) * 2);
        margin-bottom: var(--lpp-logo-height);
        box-shadow: 2px 2px 2px #33333377;
        backdrop-filter: blur(10px);
        color: #ffffff;

        &.about {
          position: relative;
          float: left;
          height: 100vh;
          width: 100%;
          padding: 0;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          margin-bottom: 0;
          -webkit-backdrop-filter: none;
          backdrop-filter: none;
          box-shadow: none;
          background-color: transparent;
        }

        /* &.about::after {
            content: '⤓ text';
            display: inline-block;
            width: 100%;
            height: 6vh;
            float: left;
            text-align: center;
            color: white;
            font-size: 6vh;
            margin-top: -6vh;
            background-color: white;
          } */

        &.featured-product {
          /* width: calc(33% - calc(calc(calc(var(--grid-gap-unit) * 2) * 2) / 2)); */
          position: relative;
          margin: calc(var(--grid-gap-unit) * 2);
          padding: calc(var(--grid-gap-unit) * 2);
          width: calc(50% - calc(var(--grid-gap-unit) * 4);
          height: 50vh;
          float: left;
          background-image: url('/featured-product.png');
          background-size: 33%;
          background-position: center 80%;
          background-repeat: no-repeat;
          padding-bottom: 6vh;
          margin-bottom: 0;
          cursor: pointer;

          h2 {
            width: 100%;
            position: absolute;
            top: 1em;
            text-align: center;
            text-transform: uppercase;
          }
        }
        &.featured-product:last-child {
          width: calc(33% - calc(calc(calc(var(--grid-gap-unit) * 2) * 2) / 2));
          float: left;
          margin-right: 0;
        }

        &.news {
          margin: calc(var(--grid-gap-unit) * 2);
          padding: calc(var(--grid-gap-unit) * 2);
          width: calc(50% - calc(var(--grid-gap-unit) * 4);
          height: 50vh;
          float: left;
          /* border-top-right-radius: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0; */
          /* box-shadow: none;
          backdrop-filter: none;
          background-color: transparent; */
          padding-bottom: 0;

          h2 {
            text-align: center;
            text-transform: uppercase;
          }

          p {
            max-width: 30em;
          }
        }
      }

      .news-wrapper {
        float: left;
        width: 100%;
        /* padding: 0;
        display: block;
        width: 100%;
        height: 50vh;
        box-shadow: 2px 2px 2px #33333377;
        background-color: rgba(255, 255, 255, 0.3);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        float: left;
        margin-bottom: var(--lpp-logo-height);
        border-bottom-left-radius: calc(var(--grid-gap-unit) * 2);
        border-bottom-right-radius: calc(var(--grid-gap-unit) * 2); */
        margin-bottom: var(--lpp-logo-height);
      }

      .about-text {
        color: #ffffff;
        /* color: #ffffffee;
        text-shadow: 2px 2px 2px #333333;
        --stroke-color:var(--lpp-gray);
          --stroke-width:1px;
          color:white;
          text-shadow: var(--stroke-width)  0 0 var(--stroke-color),
            calc(var(--stroke-width) * -1) 0 0 var(--stroke-color),
            0 var(--stroke-width) 0 var(--stroke-color),
            0 calc(var(--stroke-width) * -1) 0 var(--stroke-color); */
        position: absolute;
        bottom: calc(var(--grid-gap-unit) * 2);
        right: calc(var(--grid-gap-unit) * 2);
        padding: calc(var(--grid-gap-unit) * 2);
        width: 60%;
        background-color: var(--lpp-gray-translucent);
        -webkit-backdrop-filter: blur(10px);
        border-radius: calc(var(--grid-gap-unit) * 2);
        padding: calc(var(--grid-gap-unit) * 2);
        margin-bottom: calc(var(--grid-gap-unit) * 2);
        box-shadow: 2px 2px 2px #33333377;
        backdrop-filter: blur(10px);

        h2 {
          font-size: calc(var(--grid-gap-unit) * 4);
          font-weight: 600;
          text-transform: uppercase;
        }

        p {
          font-size: 1.5em;
          line-height: 1.5em;
          font-weight: 200;
          max-width: 33em;
        }
      }

      @media(max-width: 854px) {
        .about-text {
          width: 80%;
          right: 10%;
        }
      }
      #about-video {
        float: left;
        width: 100%;
        /* border-radius: calc(var(--grid-gap-unit) * 2); */
        /* margin-right: calc(var(--grid-gap-unit) * 2); */
      }

      :global(.page-transition-enter) {
        
      }

      :global(.page-transition-enter-active) {
      }

      #bg-video {
        opacity: 0;
        transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        object-fit: cover;
        /* filter: url('#convoblur'); */
        transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      #bg-video-drone {
        opacity: 1;
        transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      :global(.page-transition-exit-active) {
        #bg-video {
          opacity: 1;
        }

        #bg-video-drone {
          opacity: 0;
        }
      }
    `}</style>
    
  </div>);
}

Home.useEffect = () => {
  videoRef = useRef()
}

export async function getServerSideProps(context) {
  console.log(`locale: ${context.locale}`)
  // console.log(`LanguageContext: ${{ req, res, query, ...others }}`)
  // const navLinks = getNavLinks();

  // It's important to default the slug so that it doesn't return "undefined"
  // const { slug = "" } = context.query
  const data = await client.fetch(`
  {
    "about":*[_type == "about" && slug.current match "welcome-to-lpp*" && _lang == "${context.locale}"] | order(_createdAt desc) {
      title,
      slug,
      description
    },
    "news":*[_type == "news" && _lang == "${context.locale}"] | order(_createdAt desc) {
      title,
      slug,
      description,
      "date":issueDate,
      image
    },
}
`);
console.log(`data response: ${JSON.stringify(data)}`);
  return {
    props: { data }
  }
}
Home.contextType = LanguageContext

export default Home
