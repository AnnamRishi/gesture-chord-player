import { Music } from "lucide-react"

export function Header() {
  return (
    <header className="bg-surface-2/50 backdrop-blur-md border-b border-border px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-accent/10 rounded-2xl">
          <Music className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Gesture Chord Player
          </h1>
          <p className="text-muted text-sm">Hand tracking + Web Audio</p>
        </div>
      </div>
    </header>
  )
}