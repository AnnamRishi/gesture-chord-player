"use client"

import { useEffect, useRef } from "react"
import { Hand } from "lucide-react"
import { useStore } from "@/hooks/useStore"
import { detectRaisedFingers } from "@/lib/gesture/fingers"

// Type‑only for editor hints (no runtime import)
declare global {
  interface Window {
    Camera: any
    Hands: any
  }
}

export default function CameraPanel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setGesture } = useStore()
  const handsInstance = useRef<any>(null)
  const cameraInstance = useRef<any>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script ${src}`))
        document.head.appendChild(script)
      })

    const setup = async () => {
      try {
        // Load scripts from CDN
        await loadScript(
          "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
        )
        await loadScript(
          "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
        )

        if (!window.Camera || !window.Hands) {
          throw new Error("MediaPipe Hands / Camera utils not loaded")
        }

        const hands = new window.Hands({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.5/${file}`,
        })

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        })

        hands.onResults((results: any) => {
          const gesture = detectRaisedFingers(results)
          setGesture(gesture)
        })

        const camera = new window.Camera(video, {
          onFrame: async () => {
            await hands.send({ image: video })
          },
          width: 1280,
          height: 720,
        })

        camera.start()

        // store refs so we can clean up later
        cameraInstance.current = camera
        handsInstance.current = hands
      } catch (err) {
        console.error("MediaPipe setup error:", err)
      }
    }

    void setup()

    return () => {
      if (cameraInstance.current) cameraInstance.current.stop()
      if (handsInstance.current) handsInstance.current.close()
    }
  }, [setGesture])

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-amber-500">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        width={1280}
        height={720}
      />
      <div className="absolute right-4 top-4">
        <Hand className="h-6 w-6 text-white drop-shadow-md" />
      </div>
    </div>
  )
}