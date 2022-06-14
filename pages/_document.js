import Document, { Html, Head, Main, NextScript } from 'next/document'

class ThesisDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        {/* i18n optimization? if not - can delete this file */}
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ThesisDocument
