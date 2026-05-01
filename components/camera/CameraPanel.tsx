"use client"
import { useEffect, useRef, useCallback } from "react"
import { Hand } from "lucide-react"
import { useStore } from "@/hooks/useStore"
import * as cam from "@mediapipe/camera_utils"
import * as hand from "@mediapipe/hands"
import { detectRaisedFingers } from "@/lib/gesture/fingers"

export default function CameraPanel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setGesture } = useStore()
  const handsRef = useRef<any>(null)

  useEffect(() => {
    const hands = new hand.Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    })
    
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 0,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5
    })

    hands.onResults((results: any) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
        const snapshot = detectRaisedFingers(results.multiHandLandmarks[0])
        setGesture(snapshot)
      }
    })

    handsRef.current = hands

    if (videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await hands.send({ image: videoRef.current })
          }
        },
        width: 640,
        height: 480
      })
      camera.start()
    }

    return () => {
      hands.close()
    }
  }, [setGesture])

  return (
    <div className="panel p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Hand className="w-5 h-5 text-accent" />
        <h2 className="text-2xl font-bold">Live Gestures</h2>
      </div>
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black/20">
        <video 
          ref={videoRef}
          className="w-full h-full scale-x-[-1]"
          autoPlay 
          muted 
          playsInline 
        />
      </div>
    </div>
  )
}