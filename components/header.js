import React from 'react'
import Link from 'next/link'
import Nav from './nav'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

const links = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'Github' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

function updateLanguage(event) {
  console.log(event.target.value);
  bake_cookie('NEXT_LOCALE', event.target.value);
  location.href = "/";
}

function selectLanguage(event) {
  console.log('onload!')
  console.log(event.target.value);
  let lang = read_cookie('NEXT_LOCALE');
  console.log(`lang: ${lang}`)
  event.target.value = lang;
}

const Header = ({page}) => (
  <header className={page}>
    <div className="company-logomark">
    <svg id="header-rect-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1255.49 57">
      <path d="M0,0V114H1255.49l-3.88-6.72A370.88,370.88,0,0,1,1187,0Z" />
    </svg>
    <Link href="/">
    <svg id="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 598.3687 212.3202">
    <defs>
      <linearGradient id="gradient" x1="0.5" y1="0" x2="0.5" y2="1" >
        <stop offset="0" stop-color="rgba(255,255,255,0.0)" />
        <stop offset="1" stop-color="rgba(255,255,255,1)" />
        <stop offset="2" stop-color="rgba(255,255,255,0.0)" />
      </linearGradient>
      <pattern id="metal" patternUnits="userSpaceOnUse" width="600" height="414">
        <image href="concrete-texture.png" x="0" y="0" width="600" height="414" />
      </pattern>
      <filter id="displacement" x="0%" y="0%" height="100%" width="100%">
        <feDisplacementMap scale="100" in2="SourceGraphic" xChannelSelector="G"/>
      </filter>
      <filter id="convoblur">
        <feColorMatrix in="SourceGraphic"
            type="matrix"
            values="1   0   0   0   0.41
                    0   1   0   0   0.5
                    0   0   1   0   0.57
                    -10   -2   0   1   0 " result="matrix"/>
        <feGaussianBlur  stdDeviation="6" result="blur"/>
        {/* <feConvolveMatrix order="3" kernelMatrix="1 -1  1 -1 -0.001 -1 1 -1 1" edgeMode="none" result="convo"/> */}
        <feMerge>
          <feMergeNode in="matrix"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="convo"/>
        </feMerge>
      </filter>
      <filter id="noir">
        <feGaussianBlur stdDeviation="1.5"/>
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 .5 1 1"/>
          <feFuncG type="discrete" tableValues="0 .5 1"/>
          <feFuncB type="discrete" tableValues="0"/>
        </feComponentTransfer>
      </filter>
    </defs>
      <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <g id="Layer_2-2" data-name="Layer 2">
          <g id="Layer_1-2-2" data-name="Layer 1-2">
          <rect className="logo-color" x="92.88" y="25.55" width="411.65" height="95.47" />
          <path d="M299.18,212.32c138.37,0,256-88.69,299.19-212.32H0C43.19,123.63,160.82,212.32,299.18,212.32ZM429.81,45.1h36.65c19.32,0,26.09,14.14,26.09,24.31,0,17.23-11.55,25.29-27.89,25.29H451.72v21.52H429.81ZM387.16,96.5h20.72v19.72H387.16ZM319.32,45.1H356c19.33,0,26.1,14.14,26.1,24.31,0,17.23-11.55,25.29-27.9,25.29H341.23v21.52H319.32ZM276.69,96.5H297.4v19.72H276.69ZM203.37,45.1h21.92V98h31.47v18.23H203.37Zm-70.29,3.77a8.41,8.41,0,1,0,14.33-.3,35.14,35.14,0,0,1,16.28,61.35l5.48,14.83-14.09-9.44A35.19,35.19,0,0,1,122.47,113c14.52-1.21,27.68-7.54,32.26-22.82,2-6.8,1.42-12.58-.59-17l.51-.11c2.55-.47,9.31,4.22,10.55,4.3,1.56-.08,2.27-1.61,1.38-2.48-4.51-3.81-15.85-11.74-26.35-11.83l-.39,0c-6.1-.35-12.79,1.85-16.66,3.58-4.11,1.84-5.62,2.85-4.66,5s11.07-4.61,18,1.78c1.73,1.58,5.79,11.51,3.05,20.64-2.78,9.28-11.07,12.4-18,13.3a7.49,7.49,0,0,0,1-2,7.22,7.22,0,0,0-12.9-6.12,35.14,35.14,0,0,1,23.4-50.26Z" />
          <path d="M361.35,70.2c0-6.47-5-6.87-10.36-6.87h-9.76V77.77h8.46C355.37,77.77,361.35,77.37,361.35,70.2Z" />
          <path d="M471.84,70.2c0-6.47-5-6.87-10.37-6.87h-9.75V77.77h8.46C465.86,77.77,471.84,77.37,471.84,70.2Z" />
          </g>
          </g>
          {/* <rect x="362.13" width="2700" height="114"/>   */}
        </g>
      </g>
    </svg></Link>
    <svg id="header-rect-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1255.49 57">
      <path d="M68.51,0A370.66,370.66,0,0,1,3.88,107.28L0,114H1255.49V0Z" />
    </svg>
    </div>
    <Nav />
    {/* <select id="language-selector" onChange={updateLanguage} onLoad={selectLanguage}>
      <option disabled selected value>Language:</option>
      <option value="en_US" className="flag-icon-background flag-icon-en">English</option>
      <option value="fr" className="flag-icon-background flag-icon-fr">Français</option>
    </select> */}
    <div id="language-selector">
      <span className="flag-icon-background flag-icon-usa"></span>
    </div>
    <div id="site-border"></div>

    <style jsx>{`

    #language-selector {
      position: absolute;
      left: calc(var(--lpp-header-height) / 4);
      top: 0;
      z-index: 9999;
      color: var(--lpp-gray);
      background-color: white;
      border-width: 0;
      padding: 0;
      margin: 0;
      height: var(--lpp-header-height);
      font-size: calc(var(--lpp-header-height) / 2);
      line-height: calc(var(--lpp-header-height) / 2);
      overflow: visible;

      span {
        display: block;
        margin-top: calc(var(--lpp-header-height) * 0.25);
        height: calc(var(--lpp-header-height) * 0.5);
        width: 3vw;
      }
    }

    .flag-icon-background, .flag-icon {
      background-position: 0;
    }

    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: auto;
      z-index: 9999;

      .company-logomark {
        position: relative;
        display: block;
        float: left;
        width: 100vw;
        height: var(--lpp-header-height);
        z-index: 9999;

        svg {
            width: auto;
            float: left;
            height: var(--lpp-header-height);
            fill: var(--lpp-white);
            fill-opacity: 1;
            
          }
        #logo-svg {
          position: absolute;
          top: 0;
          left: calc(50% - calc(var(--lpp-logo-width) / 2));
          width: var(--lpp-logo-width);
          height: var(--lpp-logo-height);
          fill: var(--lpp-white);
          cursor: pointer;
          z-index: 9999;
          filter: drop-shadow(2px 2px 2px #33333377);

          .logo-color {
            fill: var(--lpp-gray);
          }
        }

        #header-rect-2 {
          float: right;
          margin-right: 0;
        }

        #header-rect-1 {
          margin-left: 0;
        }

        .company-name {
          display: none;
          float: left;
          width: calc(70% - calc(var(--grid-gap-unit) * 2));
          height: auto;

          margin: var(--grid-gap-unit);
          padding: 0;
          color: var(--lpp-red);

          svg {
            width: 100%;
            height: 100%;
            /* fill: var(--lpp-gray); */
            fill: white;
            /* fill: url('#metal'); */
          }
        }

        .logo {
          height: 4vw;
          /* width: calc(30% - calc(var(--grid-gap-unit) * 2)); */
          float: left;
          margin: var(--grid-gap-unit);

          svg {
            width: 100%;
            height: 100%;
            fill: var(--lpp-red);
            fill: white;

            .cls-1 {
              fill: var(--lpp-red);
            }
          }
        }
      }
      
      #site-border {
        position: fixed;
        top: var(--lpp-header-height);
        left: var(--lpp-header-height);
        width: calc(100vw - calc(var(--lpp-header-height) * 2));
        pointer-events: none;
        height: calc(100vh - calc(var(--lpp-header-height) * 2));
        border: 2px solid var(--lpp-red-translucent);
        display: none;
      }
    }

    @media(max-width: 854px) {
      :global(header) {
        z-index: 9999;
        &, *, * *, * * * {
          transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .company-logomark {
          position: relative;
          display: block;
          float: left;
          width: 100vw;
          height: var(--lpp-header-height);
          
          #header-rect-1 {
            margin-left: calc(calc(var(--lpp-logo-width) / 0.35) * -1) !important;
            -webkit-filter: none;
            filter: none;
          }

          #header-rect-2 {
            margin-right: calc(calc(var(--lpp-logo-width) / 0.35) * -1) !important;
            -webkit-filter: none;
            filter: none;
          }

            #logo-svg {
              left: calc(50% - calc(calc(var(--lpp-logo-width) * 2) / 2)) !important;
              width: calc(var(--lpp-logo-width) * 2) !important;
              height: calc(var(--lpp-logo-height) * 2) !important;
            }
        }
      }
    }

    :global(#bg-video) {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        object-fit: cover;
        opacity: 1;
        filter: url('#convoblur');

      }

    :global(.page-transition-enter header.home), :global(.page-transition-exit header.home) {

      &, *, * *, * * * {
        transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      .company-logomark {
        height: var(--lpp-header-height);

        svg {
            height: var(--lpp-header-height);
          }
        #logo-svg {
          left: calc(50% - calc(var(--lpp-logo-width) / 2));
          width: var(--lpp-logo-width);
          height: var(--lpp-logo-height);
        }

        #header-rect-2 {
          float: right;
          margin-right: 0;
        }

        #header-rect-1 {
          margin-left: 0;
        }

        .company-name {
          width: calc(70% - calc(var(--grid-gap-unit) * 2));
          height: auto;
        }

        .logo {
          height: 4vw;
        }
    }
    }

    /* :global(.page-transition-enter-done header.home) {
      &, *, * *, * * * {
        transition: all 5s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    } */

    @media(max-width: 854px) {
      :global(header.home) {
        z-index: 9999;
        &, *, * *, * * * {
          transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .company-logomark {
          position: relative;
          display: block;
          float: left;
          width: 100vw;
          height: var(--lpp-header-height);
          
          #header-rect-1 {
            margin-left: calc(calc(var(--lpp-logo-width) / 0.35) * -1);
            -webkit-filter: none;
            filter: none;
          }

          #header-rect-2 {
            margin-right: calc(calc(var(--lpp-logo-width) / 0.35) * -1);
            -webkit-filter: none;
            filter: none;
          }

            #logo-svg {
              left: calc(50% - calc(calc(var(--lpp-logo-width) * 2) / 2));
              width: calc(var(--lpp-logo-width) * 2);
              height: calc(var(--lpp-logo-height) * 2);
            }
        }
      }
    }

    @media(min-width: 855px) {
    
      :global(header.home) {
        z-index: 9999;
        &, *, * *, * * * {
          transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .company-logomark {
          position: relative;
          display: block;
          float: left;
          width: 100vw;
          height: var(--lpp-header-height);
          
          #header-rect-1 {
            margin-left: calc(calc(var(--lpp-logo-width) / 2) * -1);
            -webkit-filter: none;
            filter: none;
          }

          #header-rect-2 {
            margin-right: calc(calc(var(--lpp-logo-width) / 2) * -1);
            -webkit-filter: none;
            filter: none;
          }

            #logo-svg {
              left: calc(50% - calc(calc(var(--lpp-logo-width) * 2) / 2));
              width: calc(var(--lpp-logo-width) * 2);
              height: calc(var(--lpp-logo-height) * 2);
            }
        }
      }
    }
      `}</style>
      
  </header>

  
  
)

export default Header
