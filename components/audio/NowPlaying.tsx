"use client"
import { useStore } from "@/hooks/useStore"

export default function NowPlaying() {
  const { currentChord } = useStore()

  return (
    <div className="panel p-6">
      <h3 className="text-xl font-bold mb-6">Now Playing</h3>
      {currentChord ? (
        <div className="space-y-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            {currentChord.name}
          </div>
          <div className="flex gap-2 flex-wrap">
            {currentChord.notes.map(note => (
              <span key={note} className="px-3 py-1 bg-accent/20 rounded-full text-sm font-mono">
                {note}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-muted text-center py-8">Raise a finger to play</div>
      )}
    </div>
  )
}