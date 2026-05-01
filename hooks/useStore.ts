import { create } from "zustand"
import { ChordDefinition, InstrumentName, FingerName, GestureSnapshot } from "@/types"

interface Store {
  bpm: number
  instrument: InstrumentName
  strumPattern: string
  gesture: GestureSnapshot
  mappings: Partial<Record<FingerName, string>>
  currentChord: ChordDefinition | null
  setGesture: (gesture: GestureSnapshot) => void
  setInstrument: (instrument: InstrumentName) => void
  setCurrentChord: (currentChord: ChordDefinition) => void
}

export const useStore = create<Store>((set) => ({
  bpm: 90,
  instrument: "guitar",
  strumPattern: "D DUDU",
  gesture: { activeFingers: [], raisedCount: 0 },
  mappings: {},
  currentChord: null,
  setGesture: (gesture) => set({ gesture }),
  setInstrument: (instrument) => set({ instrument }),
  setCurrentChord: (currentChord) => set({ currentChord }),
}))