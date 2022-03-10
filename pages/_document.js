import Document from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

// Generate styled components to render during server side rendering.
// Styled-components creates an instance of ServerStyleSheet This stylesheet
// retrieves any styles found in all the components
// This passses down to the html template
// Sheets.collect styles collects all of the styles from the app
// sheets.getElement generates the style tag, this is returned as props
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  // Put font styles in document
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;1,700&family=Poppins:wght@300;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
