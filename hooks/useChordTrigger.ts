"use client"

import { useEffect, useRef } from "react"
import { useStore } from "@/hooks/useStore"
import { getInstrument, playChord } from "@/lib/audio/instruments"
import { ChordDefinition } from "@/types"

const chordMap: Record<number, ChordDefinition> = {
  1: { id: "c-major", name: "C Major", root: "C", notes: ["C4", "E4", "G4"] },
  2: { id: "a-minor", name: "A Minor", root: "A", notes: ["A3", "C4", "E4"] },
  3: { id: "g-major", name: "G Major", root: "G", notes: ["G3", "B3", "D4"] },
  4: { id: "d7", name: "D7", root: "D", notes: ["D4", "F#4", "A4", "C5"] },
  5: { id: "f-major", name: "F Major", root: "F", notes: ["F3", "A3", "C4"] },
}

export function useChordTrigger() {
  const gesture = useStore((state) => state.gesture)
  const instrument = useStore((state) => state.instrument)
  const setCurrentChord = useStore((state) => state.setCurrentChord)

  const lastCount = useRef<number | null>(null)

  useEffect(() => {
    const count = gesture.raisedCount
    if (!count || count === lastCount.current) return

    const chord = chordMap[count]
    if (!chord) return

    lastCount.current = count
    setCurrentChord(chord)
    getInstrument(instrument)
    void playChord(chord.notes)
  }, [gesture.raisedCount, instrument, setCurrentChord])
}