import React, {useRef} from 'react'
import Link from 'next/link'
import Head from '../../components/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Product from '../../components/product'
import ProductModel from '../../components/productModel'
import client from '../../src/client'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const ProductTypesPage = (props) => {
  const { equipmentTypes } = props.data
  console.log(`equipmentTypes: ${JSON.stringify(equipmentTypes)}`)
  const videoRef = useRef()

  const ets = []
  equipmentTypes.map((et, index) => {
    ets.push(
      <li className="product-category">
          {et.model ? <ProductModel modelURL={et.model.url}></ProductModel> : ''}
          <h2>{et.title}</h2>
          {et.description ? <p>{et.description}</p> : ''}
        <ul>
          {et.productCategories.map((pc, index) => {
            return (
            <li>
              <Link href={`/products/${encodeURIComponent(et.slug.current)}/${pc.slug.current}/`}>
                <a><h3>{pc.title}</h3></a>
              </Link>
            </li>
            )
          })}
        </ul>
      </li>
    )
  })

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
      <section className="product-categories">
        <ul>{ets}</ul>
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

      :global(.product-categories > ul) {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 50% 50%;
        grid-gap: var(--grid-gap-unit);
        text-align: center;
        padding-right: var(--grid-gap-unit);

        :global(.product-category) {
          display: flex;
          flex-direction: column;
          align-items: center;
          float: left;
          width: 100%;
          min-height: calc(50vh - calc(var(--grid-gap-unit) * 3.5));
          text-align: left;

          :global(h2) {
            width: 66%;
            font-variant: small-caps;
            background-color: #fff;
            color: var(--lpp-gray);
            /* text-shadow: 2px 2px 2px var(--lpp-gray); */

            border-radius: calc(var(--grid-gap-unit) * 2);
            padding: calc(var(--grid-gap-unit) * 2);
            box-shadow: 2px 2px 2px #33333377;
          }
          
          :global(ul) {
            height: 100%;
            width: 66%;
            /* background-color: rgba(255, 255, 255, 0.3); */
            background-color: var(--lpp-gray-translucent);
            -webkit-backdrop-filter: blur(10px);
            border-radius: calc(var(--grid-gap-unit) * 2);
            padding: calc(var(--grid-gap-unit) * 2);
            /* margin-bottom: var(--lpp-logo-height); */
            box-shadow: 2px 2px 2px #33333377;
            backdrop-filter: blur(10px);

            :global(li a h3) {
              /* text-shadow: 1px 1px 2px #333333; */
            }
          }
        }
      }

      @media(max-width: 854px) {
        :global(.product-categories) {
          
        }
        :global(.product-categories > ul) {
          display: grid;
          width: 100%;
          height: 100%;
          grid-template-columns: 100%;
          grid-gap: var(--grid-gap-unit);
          text-align: center;
          padding-right: var(--grid-gap-unit);

          :global(.product-category) {

:global(h2) {
  width: 100%;
}

:global(ul) {
  width: 100%;
}
}
        }

        
      }
    `}</style>

  </div>);
}

ProductTypesPage.useEffect = () => {
  videoRef = useRef()
}

export async function getServerSideProps(context) {
  // const navLinks = getNavLinks();

  // It's important to default the slug so that it doesn't return "undefined"
  // const { slug = "" } = context.query
  const data = await client.fetch(`
  {
    "equipmentTypes":*[_type == "equipmentType" && _lang == '${context.locale}'] {
      title,
      slug,
      description,
      "productCategories":*[_type == "productCategory" && references(^._id) && _lang == '${context.locale}'] {
        title,
        slug,
        "model":model.asset->,
        description
      }
    }
  }
`);
console.log(`data response: ${JSON.stringify(data)}`);
  return {
    props: { data }
  }
}

export default ProductTypesPage
