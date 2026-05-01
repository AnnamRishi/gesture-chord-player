"use client"
import CameraPanel from "@/components/camera/CameraPanel"
import SettingsPanel from "@/components/audio/SettingsPanel" 
import NowPlaying from "@/components/audio/NowPlaying"
import { Header } from "@/components/layout/header"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid-shell">
          <div className="space-y-6">
            <CameraPanel />
            <NowPlaying />
          </div>
          <div className="space-y-6">
            <SettingsPanel />
          </div>
        </div>
      </div>
    </main>
  )
}