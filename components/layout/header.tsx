"use client"
import { motion } from "framer-motion"
import { Music4, Sparkles } from "lucide-react"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Music4 className="h-5 w-5 text-[var(--accent)]" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Gesture Music Lab
          </p>
          <h1 className="text-2xl font-semibold">Chord Player</h1>
        </div>
      </div>
      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--muted)] md:flex">
        <Sparkles className="h-4 w-4 text-[var(--accent)]" />
        Camera, chords, and strumming in one client app
      </div>
    </motion.header>
  )
}