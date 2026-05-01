import { FingerName, GestureSnapshot } from "@/types"

const tipLandmarks = {
  thumb: 4,
  index: 8,
  middle: 12,
  ring: 16,
  pinky: 20
} as Record<FingerName, number>

const pipLandmarks = {
  thumb: 3,
  index: 6,
  middle: 10,
  ring: 14,
  pinky: 18
} as Record<FingerName, number>

export function detectRaisedFingers(landmarks: number[][]): GestureSnapshot {
  const activeFingers: FingerName[] = []
  
  (["thumb", "index", "middle", "ring", "pinky"] as FingerName[]).forEach(finger => {
    const tip = landmarks[tipLandmarks[finger]]
    const pip = landmarks[pipLandmarks[finger]]
    
    if (finger === "thumb") {
      if (tip[0] < pip[0]) activeFingers.push(finger)
    } else {
      if (tip[1] < pip[1]) activeFingers.push(finger)
    }
  })
  
  return {
    activeFingers,
    raisedCount: activeFingers.length
  }
}