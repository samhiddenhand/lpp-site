import React, {useRef} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from '../../../components/head'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Product from '../../../components/product'
import ProductModel from '../../../components/productModel'
import client from '../../../src/client'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const ProductCategoriesPage = (props) => {
  console.log(`props data ${props.data}`)
  const { productCategories } = props.data.equipmentTypes[0]

  const router = useRouter()
  console.log(`router query: ${JSON.stringify(router.query)}`)
  const { type } = router.query

  // console.log(`equipmentTypes: ${JSON.stringify(equipmentTypes)}`)
  const videoRef = useRef()

  const ets = []
  productCategories.map((et, index) => {
    ets.push(
      <Link href={`/products/${type}/${encodeURIComponent(et.slug.current)}/`}>
        <a key={et.slug.current} className="product-category">
          {et.model ? <ProductModel modelURL={et.model.url} style={{"pointer-events": "none"}}></ProductModel> : ''}
          <h3>{et.title}</h3>
          {/* {et.description ? <BlockContent blocks={et.description} /> : ''} */}
        </a>
      </Link>
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
        {ets}
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
      

      :global(.product-categories) {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 50% 50%;
        grid-gap: var(--grid-gap-unit);

        :global(.product-category) {
          display: block;
          float: left;
          width: 100%;
          min-height: 25vh;
          text-align: center;
        }
      }
    `}</style>

  </div>);
}

ProductCategoriesPage.useEffect = () => {
  videoRef = useRef()
}

export async function getServerSideProps(context) {
  const { type } = context.query;
  // if (type.includes('.')) { return { "props": { "data": null}}; }
  console.log(`type slug: ${type}`)
  // const router = useRouter()
  // const { type } = router.query
  // const navLinks = getNavLinks();

  // It's important to default the slug so that it doesn't return "undefined"
  // const { slug = "" } = context.query
  const data = await client.fetch(`
  {
    "equipmentTypes":*[_type == "equipmentType" && slug.current == "${type}" && _lang == '${context.locale}'] {
      title,
      slug,
      "model":model.asset->,
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

export default ProductCategoriesPage
