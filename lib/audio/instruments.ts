import * as Tone from "tone"
import { InstrumentName } from "@/types"

let currentSynth: Tone.PolySynth | null = null

export function getInstrument(name: InstrumentName): Tone.PolySynth {
  if (currentSynth) currentSynth.dispose()
  
  const config = {
    guitar: { osc: { type: "sawtooth" }, env: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.5 } },
    piano: { osc: { type: "triangle" }, env: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 } },
    flute: { osc: { type: "sine" }, env: { attack: 0.05, decay: 0.2, sustain: 0.7, release: 2 } },
    synth: { osc: { type: "square" }, env: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 1.2 } }
  }[name]
  
  currentSynth = new Tone.PolySynth(Tone.Synth, config).toDestination()
  return currentSynth
}

export async function playChord(notes: string[]) {
  await Tone.start()
  currentSynth?.triggerAttackRelease(notes, "0.5")
}