"use client"

import { useEffect, useRef } from "react"
import { Hand } from "lucide-react"
import { useStore } from "@/hooks/useStore"
import { detectRaisedFingers } from "@/lib/gesture/fingers"

declare global {
  interface Window {
    Hands: any
  }
}

export default function CameraPanel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setGesture } = useStore()
  const handsInstance = useRef<any>(null)
  const streamRef = useRef<MediaStream | null>(null)

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
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.js")

        const HandsCtor = (window as any).Hands
        if (!HandsCtor) throw new Error("Hands not loaded")

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        })

        streamRef.current = stream
        video.srcObject = stream
        await video.play()

        const hands = new HandsCtor({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`,
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

        const loop = async () => {
          if (!video.videoWidth || !video.videoHeight) {
            requestAnimationFrame(loop)
            return
          }

          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          await hands.send({ image: video })
          requestAnimationFrame(loop)
        }

        handsInstance.current = hands
        void loop()
      } catch (err) {
        console.error("Webcam / MediaPipe setup error:", err)
      }
    }

    void setup()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (handsInstance.current?.close) {
        handsInstance.current.close()
      }
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
      />
      <div className="absolute right-4 top-4">
        <Hand className="h-6 w-6 text-white drop-shadow-md" />
      </div>
    </div>
  )
}