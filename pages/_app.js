import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Replace with your actual pixel ID
const FACEBOOK_PIXEL_ID = '1191376851980285'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // This code will only run on the client side
    if (typeof window !== 'undefined') {
      // Load Facebook Pixel
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        t.onload = function() {
          // Initialize the pixel after script loads
          window.fbq('init', FACEBOOK_PIXEL_ID)
          window.fbq('track', 'PageView')
        }
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

      // Track page views on route changes
      const handleRouteChange = () => {
        if (window.fbq) {
          window.fbq('track', 'PageView')
        }
      }

      router.events.on('routeChangeComplete', handleRouteChange)

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])

  return <Component {...pageProps} />
}