import * as Tone from "tone"
import { InstrumentName } from "@/types"

let currentSynth: Tone.PolySynth | null = null

export function getInstrument(_: InstrumentName): Tone.PolySynth {
  if (currentSynth) currentSynth.dispose()
  currentSynth = new Tone.PolySynth(Tone.Synth).toDestination()
  return currentSynth
}

export async function playChord(notes: string[]) {
  await Tone.start()
  currentSynth?.triggerAttackRelease(notes, "0.5")
}