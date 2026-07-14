import { useEffect, useRef, useState } from 'react'

/**
 * useLazyImage — Flipkart-style image lazy loading hook
 *
 * Image sirf tab load hoti hai jab wo viewport ke rootMargin ke andar aati hai.
 * Pehle ek tiny placeholder/blur dikha, phir asli image load hoti hai.
 *
 * Usage:
 *   const { imgRef, isLoaded, currentSrc } = useLazyImage(src, { rootMargin: '200px' })
 *
 * @param {string} src          — Actual image URL
 * @param {Object} options
 * @param {string} options.rootMargin   — Kitna pehle load shuru karein (default: '200px')
 * @param {string} options.placeholder  — Placeholder URL ya data URI (optional)
 */
export function useLazyImage(src, { rootMargin = '200px 0px', placeholder = '' } = {}) {
  const imgRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(placeholder)
  const observerRef = useRef(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    // Browser-native lazy loading support check
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true)
            // Observe band kar do — ek baar viewport me aane ke baad kaam ho gaya
            observerRef.current?.disconnect()
          }
        },
        { rootMargin }
      )
      observerRef.current.observe(el)
    } else {
      // Fallback: Agar IntersectionObserver nahi hai to turant load karo
      setIsInView(true)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [rootMargin])

  // Jab image viewport me aaye, tabhi src set karo
  useEffect(() => {
    if (!isInView || !src) return

    // Image preload karke check karo
    const img = new Image()
    img.src = src
    img.onload = () => {
      setCurrentSrc(src)
      setIsLoaded(true)
    }
    img.onerror = () => {
      setCurrentSrc(src) // Error pe bhi set karo (browser handle karega)
      setIsLoaded(true)
    }
  }, [isInView, src])

  return {
    imgRef,       // Attach to your <img> element
    isLoaded,     // Boolean — image load ho gayi?
    isInView,     // Boolean — viewport me hai?
    currentSrc,   // String — abhi use hone wala src (placeholder ya actual)
  }
}
