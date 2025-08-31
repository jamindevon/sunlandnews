import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'
import dynamic from 'next/dynamic'

const PixelTracker = dynamic(() => import('../components/PixelTracker'), { ssr: false })

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Track page views on route changes
    const handleRouteChange = () => {
      ReactPixel.pageView()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <PixelTracker />
      <Component {...pageProps} />
    </>
  )
}