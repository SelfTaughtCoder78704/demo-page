import Head from 'next/head'
import { SWRConfig } from 'swr'
import { CTAConfig } from '@core/CTAConfig'
import Thixel from '@components/analytics/thixel'

function ClientApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <CTAConfig
        enabledParams={
          {
            // utm_source: true,
            // utm_medium: true,
            // utm_content: true,
            // utm_campaign: true,
            // utm_term: true,
          }
        }
      >
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge,chrome=1" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {/* csrf meta tags? */}
          <Thixel />
          {typeof window !== 'undefined' && <script src="/tpl/tpl-vue-beta.umd.min.js" />}
          <link rel="stylesheet" href="/tpl/tpl-vue-beta.css" />
        </Head>
        <Component {...pageProps} />
      </CTAConfig>
    </SWRConfig>
  )
}

export default ClientApp
