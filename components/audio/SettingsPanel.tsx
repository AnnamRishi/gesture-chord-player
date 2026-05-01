"use client"
import { useStore } from "@/hooks/useStore"
import { Music } from "lucide-react"

export default function SettingsPanel() {
  const { bpm, instrument, strumPattern, setInstrument } = useStore()

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Music className="w-5 h-5" />
          Controls
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-2">BPM</label>
            <input type="range" min="60" max="180" value={bpm} 
              onChange={(e) => {/* update store */}}
              className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span className="text-sm">{bpm}</span>
          </div>
          <div>
            <label className="block text-sm text-muted mb-2">Instrument</label>
            <select value={instrument} onChange={(e) => setInstrument(e.target.value as any)}
              className="w-full p-3 bg-surface-2 border border-border rounded-xl"
            >
              <option value="guitar">🎸 Guitar</option>
              <option value="piano">🎹 Piano</option>
              <option value="flute">🪈 Flute</option>
              <option value="synth">🔊 Synth</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted mb-2">Pattern</label>
            <input value={strumPattern} 
              onChange={(e) => {/* update */}}
              className="w-full p-3 bg-surface-2 border border-border rounded-xl" 
              placeholder="D DUDU" />
          </div>
        </div>
      </div>
    </div>
  )
}