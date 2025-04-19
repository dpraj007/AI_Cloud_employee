"use client"

import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useTabs } from "@/hooks/use-tabs"

type ConnectionStatus = "Connected" | "Reconnecting" | "Idle"

export default function BrowserView() {
  const [status, setStatus] = useState<ConnectionStatus>("Connected")
  const { tabs, activeTabIndex } = useTabs()

  const activeTab = tabs[activeTabIndex]

  // Simulate status changes for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: ConnectionStatus[] = ["Connected", "Reconnecting", "Idle"]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setStatus(randomStatus)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-800 border-green-200"
      case "Reconnecting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Idle":
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="relative flex-1 bg-white border border-gray-200 rounded-lg m-4 overflow-hidden shadow-sm">
      <Badge className={`absolute top-4 right-4 z-10 ${getStatusColor()}`} variant="outline">
        {status}
      </Badge>

      <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500">
        <div className="text-center p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-4">
            <p className="text-lg font-medium">GUI agent streaming here</p>
            <p className="text-sm mt-2 text-blue-500">{activeTab ? activeTab.title : "No active tab"}</p>
          </div>
          <p className="text-sm text-gray-400">This iframe will display the Google Cloud Console interface</p>
        </div>
      </div>
    </div>
  )
}
