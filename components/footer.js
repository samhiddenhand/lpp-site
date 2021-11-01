import React from 'react'

const Footer = props => (
  <footer>
    <div className="site-frame">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3062.13 3119.11">
      <defs>
        <pattern id="metal2" patternUnits="userSpaceOnUse" width="600" height="414">
          <image href="concrete-texture.png" x="0" y="0" width="600" height="414" />
        </pattern>
      </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <rect y="3005.11" width="3062.13" height="114"/>
            <rect x="0.07" width="114" height="3062.13"/>
            <rect x="2948.07" y="0.06" width="114" height="3062.13"/>
          </g>
        </g>
      </svg>
    </div>

    <style jsx>{`
    footer {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      float: left;
      width: 100vw;
      height: calc(100vh - var(--lpp-logo-height));
      overflow: hidden;
      pointer-events: none;

      .site-frame {
        display: block;
        float: left;
        width: 100vw;
        height: calc(100vh - var(--lpp-logo-height));
        pointer-events: none;
        overflow: hidden;
        /* opacity: 0.9; */


        svg {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: auto;
            fill: var(--lpp-gray);
            fill: url('#metal');
            fill-opacity: 1;
            /* filter: drop-shadow(2px 2px 2px var(--lpp-red)); */
            /* fill-opacity: 0;
             stroke: var(--lpp-gray);
             stroke-width: 4px; */
            /* filter: drop-shadow(2px 2px 2px #4666FF); */
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
            fill: var(--lpp-gray);
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

            .cls-1 {
              fill: var(--lpp-red);
            }
          }
        }
      }
    }
      `}</style>
  </footer>
)

export default Footer
