import App, { Container } from 'next/app'
import React from 'react'
import { PageTransition } from 'next-page-transitions'
// import {LanguageContext} from '../components/languageContext'
// import { nextI18NextRewrites } from 'next-i18next/rewrites'
// import {useRouter} from 'next/router'
// import { I18nextProvider } from 'react-i18next';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, router } = this.props
    return (
      // <LanguageContext.Provider>
      <Container>
        <PageTransition timeout={100} classNames="page-transition">
        {/* <I18nextProvider i18n={ i18n } initialLanguage={router.locale}> */}
          <Component {...pageProps} key={router.route} />
        {/* </I18nextProvider> */}
        </PageTransition>
        <style jsx global>{`
          // .page-transition-enter {
          //   opacity: 1;
          // }
          // .page-transition-enter-active {
          //   opacity: 1;
          //   transition: opacity 300ms;
          //   #bg-video-drone {
          //     opacity: 0;
          //     transition: opacity 600ms;
          //   }
          // }
          // .page-transition-exit {
          //   #bg-video-drone {
          //     opacity: 1;
          //     transition: opacity 600ms;
          //   }
            
          // }
          // .page-transition-exit-active {
            
            
          // }
        `}</style>
      </Container>
      // </LanguageContext.Provider>
    )
  }
}