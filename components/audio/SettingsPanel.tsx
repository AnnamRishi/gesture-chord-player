"use client"
import { useStore } from "@/hooks/useStore"
import { Music } from "lucide-react"

export default function SettingsPanel() {
  const { bpm, instrument, strumPattern, setInstrument } = useStore()

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Music className="h-5 w-5" />
          Controls
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">BPM</label>
            <input
              type="range"
              min="60"
              max="180"
              value={bpm}
              onChange={() => {}}
              className="accent-[var(--accent)] w-full cursor-pointer appearance-none rounded-lg bg-[var(--surface-2)]"
            />
            <span className="text-sm">{bpm}</span>
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">Instrument</label>
            <select
              value={instrument}
              onChange={(e) => setInstrument(e.target.value as any)}
              className="w-full rounded-xl border border-white/10 bg-[var(--surface-2)] p-3"
            >
              <option value="guitar">Guitar</option>
              <option value="piano">Piano</option>
              <option value="flute">Flute</option>
              <option value="synth">Synth</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">Pattern</label>
            <input
              value={strumPattern}
              onChange={() => {}}
              className="w-full rounded-xl border border-white/10 bg-[var(--surface-2)] p-3"
              placeholder="D DUDU"
            />
          </div>
        </div>
      </div>
    </div>
  )
}