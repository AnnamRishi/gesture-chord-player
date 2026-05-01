export type InstrumentName = "guitar" | "piano" | "flute" | "synth";
export type FingerName = "thumb" | "index" | "middle" | "ring" | "pinky";
export interface ChordDefinition {
  id: string;
  name: string;
  root: string;
  notes: string[];
  frets?: number[];
}
export interface GestureSnapshot {
  activeFingers: FingerName[];
  raisedCount: number;
}