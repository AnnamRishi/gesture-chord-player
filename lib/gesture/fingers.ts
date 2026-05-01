import { FingerName, GestureSnapshot } from "@/types"

const tipLandmarks: Record<FingerName, number> = {
  thumb: 4,
  index: 8,
  middle: 12,
  ring: 16,
  pinky: 20
}

const pipLandmarks: Record<FingerName, number> = {
  thumb: 3,
  index: 6,
  middle: 10,
  ring: 14,
  pinky: 18
}

export function detectRaisedFingers(landmarks: number[][]): GestureSnapshot {
  const activeFingers: FingerName[] = []
  const fingers: FingerName[] = ["thumb", "index", "middle", "ring", "pinky"]

  for (const finger of fingers) {
    const tip = landmarks[tipLandmarks[finger]]
    const pip = landmarks[pipLandmarks[finger]]

    if (!tip || !pip) continue

    if (finger === "thumb") {
      if (tip[0] < pip[0]) activeFingers.push(finger)
    } else {
      if (tip[1] < pip[1]) activeFingers.push(finger)
    }
  }

  return {
    activeFingers,
    raisedCount: activeFingers.length
  }
}