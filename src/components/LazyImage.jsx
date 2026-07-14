import { useLazyImage } from '../hooks/useLazyImage'

/**
 * LazyImage — Flipkart-style smart lazy image component
 *
 * Features:
 * 1. Native loading="lazy" attribute (browser-level support)
 * 2. IntersectionObserver-based JS lazy loading (for animations)
 * 3. Blur-to-sharp transition animation (premium feel)
 * 4. Graceful placeholder while loading
 *
 * Usage:
 *   <LazyImage src="product.jpg" alt="Product" className="w-full h-48 object-cover" />
 *
 * @param {string} src           — Image URL
 * @param {string} alt           — Alt text
 * @param {string} className     — CSS classes
 * @param {Object} style         — Inline styles
 * @param {string} rootMargin    — IntersectionObserver root margin
 * @param {string} placeholder   — Low-res placeholder or data URI
 * @param {number} width         — Optional width attribute
 * @param {number} height        — Optional height attribute
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  style = {},
  rootMargin = '300px 0px',
  placeholder = '',
  width,
  height,
  onLoad,
  ...rest
}) {
  const { imgRef, isLoaded, currentSrc } = useLazyImage(src, { rootMargin, placeholder })

  return (
    <img
      ref={imgRef}
      src={currentSrc || undefined}
      alt={alt}
      width={width}
      height={height}
      // Native browser lazy loading — extra fallback
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        ...style,
        // Blur-to-sharp transition: Flipkart waali smooth image load effect
        filter: isLoaded ? 'blur(0px)' : 'blur(6px)',
        transition: 'filter 0.4s ease, opacity 0.4s ease',
        opacity: isLoaded ? 1 : (currentSrc ? 0.6 : 0),
        willChange: 'filter, opacity',
      }}
      onLoad={() => {
        onLoad?.()
      }}
      {...rest}
    />
  )
}
