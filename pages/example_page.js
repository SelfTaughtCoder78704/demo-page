import Head from 'next/head'
import { useCTAConfig } from '@core/CTAConfig'
import {
  LinkBar,
  Press,
  Header,
  Callout,
  RenderHTML,
  QuoteBlock,
  Longform,
  Footer,
  ImageTextPair,
} from '@bobbynicholson78704/tpl-react-barebones/dist'

import styles2 from '@styles/libs/glide.core.min.scss'
import pageStyles from '@styles/pages/example_page.scss'

export default function MindedPage(props) {
  console.log(props.content)
  const { useOverrideCTA } = useCTAConfig()
  const { content } = props
  return (
    <>
      <Head>
        <title>{content.page_title}</title>
      </Head>

      <style jsx>{styles2}</style>
      <style jsx>{pageStyles}</style>
      <LinkBar {...content.linkbar} />
      <Header {...content.header} />
      <Callout {...content.callout} />
      <Press
        brands={content.press.brands}
        topExtras={[
          ...content.press.topExtras.map((item, index) => (
            <RenderHTML htmlPart={item} key={index} />
          )),
        ]}
      />
      <QuoteBlock {...content.quoteBlock} />
      <div className="bg-wrapper">
        <Callout {...content.callout2} />
        <Callout {...content.callout3} />
      </div>
      <ImageTextPair {...content.imageTextPair} />
      <Footer links={[...content.footer.links]} />
    </>
  )
}

MindedPage.getInitialProps = async ({ asPath }) => {
  // Fetches from global JSON on client-side redirects (Next/Link or Next/Router)
  if (process.browser) return __NEXT_DATA__.props.pageProps

  // get content from Storyblok
  // if slug does not exist in Storyblok you will get a Error: Request failed with status code 404
  const content = await require('page-content/first-page.json')

  return {
    // will be passed to the page component as props
    content,
    pathname: asPath,
  }
}
