import React, {useRef} from 'react'
import Link from 'next/link'
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

const ProductPage = (props) => {
  console.log(`props data ${props.data}`)
  const product = props.data.product[0]
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
    <section className="product-box">
    <div className="product-image">
    {product.model ? <ProductModel modelURL={product.model.url} style={{"pointer-events": "none"}}></ProductModel> : ''}
    </div>
    <div className="product-info">
      <h2>{product.title}</h2>
      <article className="product-description">
        <BlockContent blocks={product.description} />
      </article>

      
      <article className="product-specs">
        <h3>Technical Specifications</h3>
        <BlockContent blocks={product.specifications} />
      </article>

      
      <article className="product-downloads">
        <h3>Downloads</h3>
        <p><a href="#">Product Catalog PDF</a></p>
        <p><a href="#">Product Technical Specifications</a></p>
      </article>
    </div>
    
  </section>
    </main>
    </div>
    <Footer />

    <style global jsx>{`
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
    
  </div>);
}

ProductPage.useEffect = () => {
  videoRef = useRef()
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  // if (type.includes('.')) { return { "props": { "data": null}}; }
  // const router = useRouter()
  // const { type } = router.query
  // const navLinks = getNavLinks();

  // It's important to default the slug so that it doesn't return "undefined"
  // const { slug = "" } = context.query
  const data = await client.fetch(`
  {
    "product":*[_type == "product" && slug.current == "${slug}" && _lang == '${context.locale}'] {
      title,
      slug,
      "model":model.asset->,
      description,
      specifications
    }
  }
`);
console.log(`data response: ${JSON.stringify(data)}`);
  return {
    props: { data }
  }
}

export default ProductPage
