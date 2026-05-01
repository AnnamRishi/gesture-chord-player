"use client"
import { useStore } from "@/hooks/useStore"

export default function NowPlaying() {
  const { currentChord } = useStore()

  return (
    <div className="panel p-6">
      <h3 className="mb-6 text-xl font-bold">Now Playing</h3>
      {currentChord ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-3xl font-bold text-transparent">
            {currentChord.name}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentChord.notes.map((note: string) => (
              <span
                key={note}
                className="rounded-full bg-[var(--accent)]/20 px-3 py-1 font-mono text-sm"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-[var(--muted)]">Raise a finger to play</div>
      )}
    </div>
  )
}