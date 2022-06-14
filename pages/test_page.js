import Head from 'next/head'
import {
  LinkBar,
  Press,
  Header,
  Callout,
  CtaBlock,
  TitleBlock,
  MediaBlock,
  Actions,
  Footer,
} from '@bobbynicholson78704/tpl-react-barebones/dist'

import styles2 from '@styles/libs/glide.core.min.scss'
import pageStyles from '@styles/pages/example_page.scss'
export default function MindedPage({ content }) {
  return (
    <>
      <style jsx>{styles2}</style>
      <style jsx>{pageStyles}</style>

      <div className="wrapper">
        <LinkBar text="Get your first month for only $10" />
        <Header logoPath="/tpl/img/Logo.png" logoLink="https://thesistesting.com" />
        <Callout
          id="callout-1"
          classes="first-callout"
          titleBlock={{
            title: 'You deserve to feel like yourself again.',
            text: 'Get depression and anxiety medication prescribed online',
          }}
          extras={
            <div className="cta-with-img">
              <CtaBlock ctaText="Get Started" ctaLink="/mind-test" />
              <img src="/tpl/img/tp.png" alt="tpl" />
            </div>
          }
          mediaBlock={{
            image: '/tpl/img/first-call-mb.jpg',
            images: [
              {
                min: 1440,
                src: '/tpl/img/first-call-tb.png',
              },
            ],
          }}
        />
        <Press
          isCarousel={true}
          id="press-1"
          topExtras={
            <div className="cta-with-img">
              <TitleBlock
                title="Custom title in Press Section"
                text="Custom text in Press Section"
              />
            </div>
          }
          classes="press-carousel"
          glideOptions={{
            type: 'carousel',
            startAt: 0,
            perView: 3,
          }}
          brands={[
            {
              logo: '/tpl/img/aw.png',
            },
            {
              logo: '/tpl/img/ax.png',
            },
            {
              logo: '/tpl/img/for.png',
            },
            {
              logo: '/tpl/img/tc.png',
            },
            {
              logo: '/tpl/img/wsj.png',
            },
          ]}
        />
        <Actions
          isCarousel={true}
          titleBlock={{
            title: 'Actions',
          }}
          actions={[
            {
              ctaBlock: {
                ctaText: 'Button',
                ctaLink: 'https://www.google.com',
                fineText: 'fine text',
              },
              actionExtras: <div>Action Children</div>,
              listBlock: {
                items: [
                  {
                    text: 'Item 1',
                    icon: 'icon-1',
                  },
                ],
                id: 'id',
                classes: 'classes',
              },
              title: 'Glide JS Actions',
              text: 'Hello Yall',
              mediaBlock: {
                image: 'https://via.placeholder.com/300x200',
                imageLink: 'https://google.com',
                imageRel: 'nofollow',
                imageAlt: 'image alt',
                imageLazy: true,
                images: [
                  {
                    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    min: 768,
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    min: 1440,
                  },
                ],

                mediaCaption: 'Media Caption',
                mediaCredit: 'Media Credit',
                classes: 'classes',
                id: 'id',
              },
            },
            {
              ctaBlock: {
                ctaText: 'Button',
                ctaLink: 'https://www.google.com',
                fineText: 'fine text',
              },
              listBlock: {
                id: 'list-block-id',
                classes: 'list-block-classes',
                items: [
                  {
                    text: 'Item 1',
                    icon: 'icon-1',
                  },
                ],
              },
              title: 'Super Action',
              text: 'Hello Yall',
              mediaBlock: {
                image: 'https://via.placeholder.com/300x200',
                imageLink: 'https://google.com',
                imageRel: 'nofollow',
                imageAlt: 'image alt',
                imageLazy: true,
                images: [
                  {
                    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    min: 768,
                  },
                  {
                    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    min: 1440,
                  },
                ],

                mediaCaption: 'Media Caption',
                mediaCredit: 'Media Credit',
                classes: 'classes',
                id: 'id',
              },
            },
          ]}
          glideOptions={{
            type: 'carousel',
            perView: 2,
            gap: 10,
            perMove: 1,
            breakpoints: {
              1440: {
                perView: 2,
              },
              600: {
                perView: 1,
              },
            },
            // autoplay: true,
          }}
        />

        <Footer
          copyright="&copy; 2022"
          links={[
            {
              text: 'Terms of Service',
              url: 'https://www.tplreactbarebones.com',
            },
            {
              text: 'Privacy Policy',
              url: 'https://www.tplreactbarebones.com',
            },
          ]}
        />
      </div>
    </>
  )
}

MindedPage.getInitialProps = async ({ asPath }) => {
  // Fetches from global JSON on client-side redirects (Next/Link or Next/Router)
  if (process.browser) return __NEXT_DATA__.props.pageProps

  // get content from JSON
  const content = await require('page-content/minded-a.json')
  console.log('MindedPage.js: content', content)
  return {
    // will be passed to the page component as props
    content,
    pathname: asPath,
  }
}
