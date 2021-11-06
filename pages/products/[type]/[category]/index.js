import React, {useRef} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from '../../../../components/head'
import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Product from '../../../../components/product'
import ProductModel from '../../../../components/productModel'
import client from '../../../../src/client'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const CategoryPage = (props) => {
  console.log(`props data ${props.data}`)
  const { products, model: categoryModel, description: categoryDescription, title: categoryTitle } = props.data.productCategory[0]

  const router = useRouter()
  console.log(`router query: ${JSON.stringify(router.query)}`)
  const { type, category } = router.query

  // console.log(`equipmentTypes: ${JSON.stringify(equipmentTypes)}`)
  const videoRef = useRef()

  const ets = []
  products.map((et, index) => {
    ets.push(
      <li><h4>{et.title}</h4>
      <BlockContent blocks={et.description}></BlockContent>
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
    <section className="product-box">
      <div className="product-image">
        {categoryModel ? <ProductModel modelURL={categoryModel.url} style={{"pointer-events": "none"}}></ProductModel> : ''}
      </div>

      <div className="product-info">
        <h2>{categoryTitle}</h2>
        <article className="product-description">
          <BlockContent blocks={categoryDescription}></BlockContent>
        </article>
        <article className="product-downloads">
        <h3>Products</h3>
        <ul>
          {ets}
        </ul>
        <p><a href="#">Product Catalog PDF</a></p>
      </article>
      </div>
      
    </section>
      {/* <section className="product-categories">
        {ets}
      </section> */}
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

      .product-box {
      width: 100%;
      height: 100%;
      padding: var(--grid-gap-unit);
      /* color: var(--lpp-gray-translucent); */
      color: #333;
      float: left;

      .product-image {
        width: calc(50% - var(--grid-gap-unit));
        height: 100%;
        float: left;
        position: relative;
        /* padding: var(--grid-gap-unit); */
        cursor: grab;
        /* z-index: -1; */
        background-color: rgba(255, 255, 255, 0.01);
        background-color: var(--lpp-gray-translucent);
        -webkit-backdrop-filter: blur(10px);
        border-radius: calc(var(--grid-gap-unit) * 2);
        margin-bottom: var(--grid-gap-unit);
        margin-right: var(--grid-gap-unit);
        box-shadow: 2px 2px 2px #33333377;
        backdrop-filter: blur(5px);

        img {
          width: 100%;
        }

        :global(canvas) {
          width: 100%;
          height: 100%;
        }
      }

      .product-info {
        display: flex;
        flex-direction: column;
        align-content: stretch;
        float: left;
        min-height: 100%;
        width: calc(50% - var(--grid-gap-unit));
        /* padding: calc(var(--grid-gap-unit) * 2); */
        margin-bottom: var(--lpp-logo-height);
        margin-left: var(--grid-gap-unit);

        h2 {
          width: 66%;
          font-variant: small-caps;
          background-color: #fff;
          color: var(--lpp-gray);
          /* text-shadow: 2px 2px 2px var(--lpp-gray); */

          border-radius: calc(var(--grid-gap-unit) * 2);
          padding: calc(var(--grid-gap-unit) * 2);
          box-shadow: 2px 2px 2px #33333377;
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

          &.product-specs, &.product-downloads, &.product-description {
            float: left;
            width: 66%;
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

          &.product-description {
            flex-grow: 4;
            font-size: 1.5em;
            font-weight: 100;
          }

          &.product-downloads {
            margin-bottom: 0;
          }
        }

        :global(.product-downloads p) {
          color: white;
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

    @media(max-width: 854px) {
      .product-box {
        display: flex;
        flex-direction: column;

        .product-image {
          width: 100%;
          height: 50%;
        }

        .product-info {
          width: 100%;
          margin: 0;
          min-height: auto !important;
          margin-bottom: 10vh !important;
          float: left;
          clear: both;

          h2 {
            width: 100%;
          }

          .product-description {
            width: 100% !important;
            height: auto !important;
            flex-grow: 1 !important;
          }

          .product-downloads {
            width: 100% !important;
          }
        }
      }
    }
    `}</style>

  </div>);
}

CategoryPage.useEffect = () => {
  videoRef = useRef()
}

export async function getServerSideProps(context) {
  const { category } = context.query;
  // if (type.includes('.')) { return { "props": { "data": null}}; }
  console.log(`category slug: ${category}`)
  // const router = useRouter()
  // const { type } = router.query
  // const navLinks = getNavLinks();

  // It's important to default the slug so that it doesn't return "undefined"
  // const { slug = "" } = context.query
  const data = await client.fetch(`
  {
    "productCategory":*[_type == "productCategory" && slug.current == "${category}" && _lang == '${context.locale}'] {
      title,
      slug,
      "model":model.asset->,
      description,
      "products":*[_type == "product" && references(^._id) && _lang == '${context.locale}'] {
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

export default CategoryPage
