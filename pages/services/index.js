import React, {useRef} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from '../../components/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import client from '../../src/client'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const ServicesPage = (props) => {
  console.log(`props ${JSON.stringify(props)}`)
  const { title = "", description = "" } = props.data.services[0]

  const router = useRouter()

  // console.log(`equipmentTypes: ${JSON.stringify(equipmentTypes)}`)
  const videoRef = useRef()

  return (
  <div>
    <div className="styled-video">
      <video ref={videoRef} id="bg-video" playsInline="playsinline" autoPlay="autoplay" muted={true} loop="loop" onLoadedMetadata={/*videoRef.muted = true*/console.log('videoRef: ',videoRef)}>
        <source src="/LPP_Video.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="background-mat"></div>
    <Head title="Home" />
    <Header />
    <div className="main-wrapper">
    <main>
    <section className="about-box">
      <div className="about-info">
        <h2>{title}</h2>
        <article className="about-description">
          <BlockContent blocks={description}></BlockContent>
        </article>
      </div>
    </section>
    </main>
    </div>
    <Footer />

    <style jsx>{`
    :global(body) {
        overflow-x: hidden;
      }
      :global(.styled-video) {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--lpp-gray-translucent);
        background-size: cover;
        z-index: -3;
      }
      :global(.background-mat) {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: -2;
      }
      :global(.video-filter) {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        opacity: 0.5
      }
      :global(.main-wrapper) {
        float: left;
        height: calc(100vh - var(--lpp-header-height));
        width: 100vw;
        margin-top: var(--lpp-header-height);
        overflow: hidden;
        transition: width 600ms cubic-bezier(0.16, 1, 0.3, 1);
        /* z-index: 9999; */
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
        border-radius: 7vw;
        transition: width 600ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      :global(.product-categories) {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 33% 33% 33%;
        grid-gap: var(--grid-gap-unit);

        :global(.product-category) {
          display: block;
          float: left;
          width: 100%;
          min-height: 25vh;
          text-align: center;
        }
      }

      .about-box {
      width: 66%;
      height: 100%;
      padding: var(--grid-gap-unit);
      /* color: var(--lpp-gray-translucent); */
      color: #333;
      float: left;
      margin-left: calc(33% / 2);

      .about-info {
        display: flex;
        flex-direction: column;
        align-content: stretch;
        float: left;
        min-height: 100%;
        width: calc(100% - var(--grid-gap-unit));
        /* padding: calc(var(--grid-gap-unit) * 2); */
        margin-bottom: var(--lpp-logo-height);
        margin-left: var(--grid-gap-unit);

        h2 {
          width: 100%;
          /* font-variant: small-caps; */
          text-transform: uppercase;
          background-color: #fff;
          color: var(--lpp-gray);
          /* text-shadow: 2px 2px 2px var(--lpp-gray); */

          border-radius: calc(var(--grid-gap-unit) * 2);
          padding: calc(var(--grid-gap-unit) * 2);
          box-shadow: 2px 2px 2px #33333377;
        }

        :global(h3) {
          margin-bottom: var(--grid-gap-unit);
          /* text-shadow: 2px 2px 2px var(--lpp-red); */
          font-family: 'Inter', Helvetica, sans-serif;
          font-weight: 600;
          letter-spacing: 0.015;
          text-transform: uppercase;
          margin-top: 2em;
        }

        :global(h3:first-child) {
          margin-top: initial;
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

          &.about-description {
            float: left;
            width: 100%;
            /* background-color: rgba(255, 255, 255, 0.3); */
            background-color: var(--lpp-gray-translucent);
            -webkit-backdrop-filter: blur(10px);
            border-radius: calc(var(--grid-gap-unit) * 2);
            padding: calc(var(--grid-gap-unit) * 2);
            margin-bottom: var(--grid-gap-unit);
            box-shadow: 2px 2px 2px #33333377;
            backdrop-filter: blur(10px);
            color: #ffffff;
            
            p, a {
              text-shadow: none;
            }
          }

          &.about-description {
            /* flex-grow: 1; */
            font-size: 1.2em;
            font-weight: 100;
          }
        }

        .about-description {
          float: left;
          /* width: 25vw; */
          font-weight: 300;
          /* line-height: 1.5em;
          columns: 21em auto; */
          /* font-size: 1.5em; */
          line-height: 1.5em;
          font-weight: 200;

          p {
            margin-bottom: var(--grid-gap-unit);
          }
        }
      }
    }

    @media(max-width: 854px) {
      .about-box {
        width: calc(100% - calc(var(--grid-gap-unit) * 2));
        height: 100%;
        padding: var(--grid-gap-unit);
        /* color: var(--lpp-gray-translucent); */
        /* color: #333; */
        float: left;
        margin-left: calc(var(--grid-gap-unit) / 2);
      }
      
    }
    `}</style>

  </div>);
}

ServicesPage.useEffect = () => {
  videoRef = useRef()
}

export async function getServerSideProps(context) {
  console.error(`conetext.locale: ${context.locale}`)
  const { about } = context.query;
  const { locale = "en_US" } = context;
  // if (type.includes('.')) { return { "props": { "data": null}}; }
  // console.log(`category slug: ${category}`)
  // const router = useRouter()
  // const { type } = router.query
  // const navLinks = getNavLinks();

  // It's important to default the slug so that it doesn't return "undefined"
  // const { slug = "" } = context.query
  const data = await client.fetch(`
  {
    "services":*[_type == "service" && slug.current match "lpp-services*" && _lang == '${locale}'] | order(_createdAt desc) {
      title,
      slug,
      description
    }
}
`);
console.log(`data response: ${JSON.stringify(data)}`);
  return {
    props: { data, locale }
  }
}

export default ServicesPage
