import React from 'react'
import Link from 'next/link'

const links = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'Github' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <>
  <div id="nav-toggle" onClick={function(){
    if (document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
    } else {
      document.body.classList.add('nav-open');
    }
    
  }}>
    {/* <i className="fas fa-bars nav-button"></i> */}
  <svg viewBox="0 0 100 80" width="100%" height="100%" className="nav-button" style={{fill: 'var(--lpp-gray)'}}>
<rect width="100" height="20"></rect>
<rect y="30" width="100" height="20"></rect>
<rect y="60" width="100" height="20"></rect>
</svg></div>

  <nav>
    
    <ul onClick={() => { document.body.classList.remove('nav-open') }}>
      {/* <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li> */}
      <li><Link href="/about"><a>About</a></Link></li>
      <li><Link href="/services"><a>Services</a></Link></li>
      <li><Link href="/products"><a>Products</a></Link>
      </li>
      <li><Link href="#"><a>Contact</a></Link></li>
      {/* <ul>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul> */}
    </ul>

    <style jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
      :global(:root) {
        --line-height: 1.5;
        --line-height-rem: 1.5rem;
      }
      :global(*) {
        margin: 0;
        padding: 0;
        list-style-type: none;
        box-sizing: border-box;
      }
      :global(html) {
        font-size: calc(0.5em + 0.5vmax);
        
      }
      :global(h2, h3, h4, h5, h6) {
        /* font-family: 'Alegreya Sans SC', sans-serif;
        font-weight: 500; */
        font-weight: 100;
        letter-spacing: 0.1em;
        line-height: 1em;
        margin-bottom: var(--grid-gap-unit);
        /* text-transform: uppercase; */
        /* font-stretch: condensed; */
      }
      :global(h1) {
        font-size: calc(calc(1rem * var(--line-height)) * 4);
      }
      :global(h2) {
        font-size: calc(var(--line-height-rem) * 1.5);
        font-variant: small-caps;
      }
      :global(a) {
        text-decoration: none;
        color: white;
      }
      :global(p) {
        margin-bottom: 1em;
      }

      @media(max-width: 854px) {
        :global(body) {
          --lpp-logo-height: calc(100vw / 8);
        --lpp-logo-height-unitless: calc(100 / 8);
        --lpp-logo-width: calc(var(--lpp-logo-height) * 2.818);
        --lpp-header-height: calc(65vw / 12);
        --lpp-header-height-unitless: calc(65 / 12);
        --grid-gap-unit: calc(var(--lpp-header-height) / 2);
        }

        :global(main) {
          border-radius: 14vw !important;
          padding-top: calc(var(--grid-gap-unit) * 10) !important;
        }
      }

      @media(min-width: 855px) {
        :global(body) {
          --lpp-logo-height: calc(100vw / 30.6213);
        --lpp-logo-height-unitless: calc(100 / 30.6213);
        --lpp-logo-width: calc(var(--lpp-logo-height) * 2.818);
        --lpp-header-height: calc(65vw / 30.6213);
        --lpp-header-height-unitless: calc(65 / 30.6213);
        --grid-gap-unit: calc(var(--lpp-header-height) / 2);
        }

        :global(main) {
          border-radius: 7vw;
        }
      }
      
      :global(body) {
        margin: 0;
        font-family: 'Inter', Helvetica, sans-serif;
        --lpp-white: rgb(256,256,256);
        --lpp-gray: rgb(103,127,145); /* color palette ref: https://coolors.co/677f91 */
        --lpp-gray-translucent: rgba(103,127,145,0.6);
        --lpp-red: rgb(203,79,83); /* color palette ref: https://coolors.co/cb4f53 */
        --lpp-red-translucent: rgba(203,79,83,0.8);
        --lpp-bronze: rgb(144,123,138); /* color palette ref: https://coolors.co/907b8a */
        --lpp-bronze-translucent: rgb(144,123,138,0.8);
        background-color: var(--lpp-gray);
        /* background-image: url('concrete-texture.png'); */
        background-size: 400px 276px;
      }

      :global(#nav-toggle) {
          /* display: none; */
          position: absolute;
          right: calc(var(--lpp-header-height) / 4);
          top: calc(var(--lpp-header-height) / 4);
          width: calc(var(--lpp-header-height) / 2);
          height: calc(var(--lpp-header-height) / 2);
          cursor: pointer;
          z-index: 9999;

          &:before {
            position: absolute;
          top: calc(50% - 50px);
          left: -30px;
          width: 0px; 
          height: 0px; 
          /* border-top: 100px solid transparent;
          border-bottom: 100px solid transparent; 
          border-right: 10px solid var(--lpp-red); */
          /* background-color: var(--lpp-red); */
          cursor: pointer;
          }
        }


        @media(max-width: 854px) {
          :global(nav) {
            display: block;
            width: 100vw;
            height: calc(100vh - var(--lpp-header-height));
            float: left;
            /* outline: 1px solid green; */
            font-weight: 100;
            /* background-color: var(--lpp-red); */
            
            position: fixed;
            bottom: calc(calc(100vh - var(--lpp-header-height)) * -1);
            left: 0;
            z-index: 9998;
            padding: 0;
            overflow: hidden;

            transition: bottom 600ms cubic-bezier(0.16, 1, 0.3, 1);

            ul {
              /* outline: 1px solid purple; */
              width: 102vw;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: space-around;

              text-transform: uppercase;
              /* margin: 0 var(--grid-gap-unit); */
              /* margin: -5vw -3.75vw; */
              margin-left: -1vw;
              padding: 0;
              /* border-bottom: calc(100vh - calc(calc(calc(var(--grid-gap-unit) * 2) + 1em) * 8)) solid white; */
              backdrop-filter: blur(20px);
              border: 5vw solid var(--lpp-white);
              border-radius: 10vw;
              /* background-image: url('concrete-texture.png'); */
                /* background-size: 400px 276px; */
                /* border-left: 2px solid var(--lpp-red); */
            }
          }
        }
      @media(min-width: 855px) {
        :global(nav) {
        display: block;
        width: 25vw;
        height: calc(100vh - var(--lpp-header-height));
        float: left;
        /* outline: 1px solid green; */
        font-weight: 100;
        /* background-color: var(--lpp-red); */
        
        position: fixed;
        right: -25vw;
        top: var(--lpp-header-height);
        z-index: 9999;
        padding: 0;
        overflow: hidden;

        transition: right 600ms cubic-bezier(0.16, 1, 0.3, 1);

        ul {
          /* outline: 1px solid purple; */
          width: calc(100% + 7.5vw);
          height: calc(100% + 10vw);
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          text-transform: uppercase;
          /* margin: 0 var(--grid-gap-unit); */
          margin: -5vw -2.5vw;
          padding: 0;
          /* border-bottom: calc(100vh - calc(calc(calc(var(--grid-gap-unit) * 2) + 1em) * 8)) solid white; */
          backdrop-filter: blur(20px);
          border: 5vw solid var(--lpp-white);
          border-radius: 7vw;
          /* background-image: url('concrete-texture.png'); */
            /* background-size: 400px 276px; */
            /* border-left: 2px solid var(--lpp-red); */
        }
        }
      }

      :global(nav) {

        a {
          color: var(--lpp-gray);
          color: white !important;
          /* border-right: 1px solid #333; */

        }
        
        li {
          width: 100%;
          height: 25%;
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: center;
          
          &:after {
            display: block;
            content: '';
            margin-top: 20%;
          }

          a {
            /* padding: calc(var(--grid-gap-unit) * 1); */
            display: inline-block;
            /* width: 50%; */
            width: 100%;
            margin: auto;
            padding: calc(25% - 0.625em);
            /* height: 80%; */
            background-color: rgba(255,255,255,0);
            color: white !important;
            text-align: center;
            vertical-align: middle;
            font-size: 1rem;
            font-weight: bold;
            line-height: 1rem;
            letter-spacing: 0.1em;
            /* clip-path: polygon(25% 100%, 0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%); */
            clip-path: circle(150% at 50% 50%);
            transition: clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1),
                        background-color 600ms cubic-bezier(0.16, 1, 0.3, 1)
            ;

          }

          a:hover {
            background-color: white;
            /* border-radius: 100%; */
            color: var(--lpp-gray) !important;
            clip-path: circle(25% at 50% 50%); /* polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); */
            /* box-shadow: 2px 2px 2px #333; */
          }

          
          
          ul {
            display: none;
          }
        }

        /* li:first-child a {
            border-radius: var(--grid-gap-unit) var(--grid-gap-unit) 0 0;
          } */
      }

      @media(max-width: 854px) {
      :global(body.nav-open) {

        nav {
          bottom: 0;
        }
        .main-wrapper {
          width: 100vw;

          main {
            width: 110vw;
          }
        }
      }
    }
      
      @media(min-width: 855px) {
      :global(body.nav-open) {

        nav {
          right: 0;
        }
        .main-wrapper {
          width: 75vw;

          main {
            width: 85vw;
          }
        }
      }
    }

      :global(.page-transition-enter main *) {
        opacity: 0;
        transform: translateX(100vw);
      }

      :global(.page-transition-enter-active main *) {
        opacity: 1;
        transform: translateX(0);
        transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      /* :global(.page-transition-enter-done main *) {
        transform: translateX(0);
        transition: transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      } */

      :global(.page-transition-exit main *) {
        transform: translateX(0);
        transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      :global(.page-transition-exit-active main *) {
        transform: translateX(-100vw);
        transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    `}</style>
  </nav>
  </>
)

export default Nav
