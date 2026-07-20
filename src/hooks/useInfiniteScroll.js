import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useInfiniteScroll — Flipkart-style infinite scroll hook
 *
 * Ye hook ek "sentinel" element ko watch karta hai IntersectionObserver se.
 * Jab sentinel viewport me aata hai, `loadMore` callback call hoti hai.
 *
 * Usage:
 *   const { sentinelRef, hasMore, visibleItems, loadMore } = useInfiniteScroll({ items, pageSize: 15 })
 *
 * @param {Object} options
 * @param {Array}  options.items      — Full data array (already fetched / filtered)
 * @param {number} options.pageSize   — Kitne items ek baar dikhane hain (default: 15)
 * @param {number} options.threshold  — IntersectionObserver threshold (0 to 1)
 */
export function useInfiniteScroll({ items = [], pageSize = 15, threshold = 0.1 } = {}) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const sentinelRef = useRef(null)
  const observerRef = useRef(null)

  // Reset when items list changes (search/filter ke baad)
  useEffect(() => {
    setVisibleCount(pageSize)
  }, [items, pageSize])

  const hasMore = visibleCount < items.length
  const visibleItems = items.slice(0, visibleCount)

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + pageSize, items.length))
  }, [pageSize, items.length])

  // Setup IntersectionObserver on sentinel element
  useEffect(() => {
    if (!sentinelRef.current) return

    // Cleanup old observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (!hasMore) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold }
    )

    observerRef.current.observe(sentinelRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loadMore, threshold])

  return {
    sentinelRef,   // Attach to a div at the bottom of your list
    hasMore,       // Boolean — kya aur items hain?
    visibleItems,  // Array — abhi render hone wale items
    visibleCount,  // Number — current visible count
    totalCount: items.length,
    loadMore,      // Manual trigger (optional)
  }
}
