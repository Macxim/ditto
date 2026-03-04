"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "motion/react"

interface LikeButtonProps {
  slug: string
  className?: string
  showCount?: boolean
}

const HeartIcon = ({ filled, className = "" }: { filled?: boolean, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-[18px] h-[18px] ${className}`}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

export function LikeButton({ slug, className = "", showCount = true }: LikeButtonProps) {
  const [likes, setLikes] = React.useState<number | null>(null)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    // Fetch initial likes
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('count')
        .eq('slug', slug)
        .single()

      if (data) {
        setLikes(data.count)
      } else if (error && error.code === 'PGRST116') {
        // Row doesn't exist yet
        setLikes(0)
      } else if (error) {
        console.error("Supabase fetch error:", error)
        setLikes(0)
      }
    }

    // Check localStorage for liked state
    const liked = localStorage.getItem(`liked-${slug}`) === 'true'
    setIsLiked(liked)
    fetchLikes()

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`public:likes:slug=eq.${slug}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'likes',
        filter: `slug=eq.${slug}`
      }, (payload) => {
        setLikes(payload.new.count)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [slug])

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLiked) return

    setIsAnimating(true)
    setIsLiked(true)
    localStorage.setItem(`liked-${slug}`, 'true')

    // Optimistic update
    setLikes(prev => (prev !== null ? prev + 1 : 1))

    // Use RPC to increment to avoid race conditions
    // Requires a database function:
    // create function increment_likes(row_slug text) returns void as $$
    //   update likes set count = count + 1 where slug = row_slug;
    //   insert into likes (slug, count) select row_slug, 1 where not exists (select 1 from likes where slug = row_slug);
    // $$ language sql;

    const { error } = await supabase.rpc('increment_likes', { row_slug: slug })

    if (error) {
      console.warn("RPC increment failed, falling back to client-side update:", error.message)
      // Fallback if RPC isn't available or fails
      const { data, error: fetchError } = await supabase
        .from('likes')
        .select('count')
        .eq('slug', slug)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Supabase fallback fetch error:", fetchError)
      }

      if (data) {
        const { error: updateError } = await supabase
          .from('likes')
          .update({ count: data.count + 1 })
          .eq('slug', slug)
        if (updateError) console.error("Supabase update error:", updateError)
      } else {
        const { error: insertError } = await supabase
          .from('likes')
          .insert({ slug, count: 1 })
        if (insertError) console.error("Supabase insert error:", insertError)
      }
    }

    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiked}
      className={`group flex items-center gap-2 transition-all duration-300 outline-none ${className} ${isLiked ? 'cursor-default' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={isAnimating ? {
            scale: [1, 1.3, 1],
          } : {}}
          transition={{ duration: 0.4 }}
          className={`block ${isLiked ? 'text-white' : 'text-current opacity-40 group-hover:opacity-100 group-hover:text-red-400'} transition-colors duration-300`}
        >
          <HeartIcon filled={isLiked} />
        </motion.div>

        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -20, opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 text-red-500 pointer-events-none flex items-center justify-center"
            >
              <HeartIcon filled={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showCount && likes !== null && (
        <span className="text-xs font-mono tabular-nums">
          {likes.toLocaleString()}
        </span>
      )}
    </button>
  )
}
