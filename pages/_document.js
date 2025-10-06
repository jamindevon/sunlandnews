import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const PIXEL_ID = '1091133472801541';

  return (
    <Html>
      <Head>
        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{display: 'none'}}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}