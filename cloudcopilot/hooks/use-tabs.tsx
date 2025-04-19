"use client"

import { useState, useEffect } from "react"
import type { Tab } from "@/types"

export function useTabs() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "main",
      title: "Main Session",
      isPermanent: true,
      chatSessionId: "main-session",
    },
  ])
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [requestCount, setRequestCount] = useState(1)

  // Load tabs from localStorage on mount
  useEffect(() => {
    const savedTabs = localStorage.getItem("cloudcopilot-tabs")
    const savedActiveIndex = localStorage.getItem("cloudcopilot-active-tab")
    const savedRequestCount = localStorage.getItem("cloudcopilot-request-count")

    if (savedTabs) {
      setTabs(JSON.parse(savedTabs))
    }

    if (savedActiveIndex) {
      setActiveTabIndex(Number.parseInt(savedActiveIndex))
    }

    if (savedRequestCount) {
      setRequestCount(Number.parseInt(savedRequestCount))
    }
  }, [])

  // Save tabs to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cloudcopilot-tabs", JSON.stringify(tabs))
    localStorage.setItem("cloudcopilot-active-tab", activeTabIndex.toString())
    localStorage.setItem("cloudcopilot-request-count", requestCount.toString())
  }, [tabs, activeTabIndex, requestCount])

  const addTab = () => {
    const chatSessionId = `chat-session-${requestCount}`
    const newTab: Tab = {
      id: `request-${requestCount}`,
      title: `Request #${requestCount}`,
      isPermanent: false,
      chatSessionId,
    }

    setTabs([...tabs, newTab])
    setActiveTabIndex(tabs.length)
    setRequestCount(requestCount + 1)

    return chatSessionId
  }

  const closeTab = (index: number) => {
    if (tabs[index].isPermanent) return

    const newTabs = [...tabs]
    const removedTab = newTabs.splice(index, 1)[0]
    setTabs(newTabs)

    // Adjust active tab index if needed
    if (activeTabIndex >= newTabs.length) {
      setActiveTabIndex(Math.max(0, newTabs.length - 1))
    } else if (activeTabIndex === index) {
      setActiveTabIndex(Math.max(0, index - 1))
    }

    return removedTab.chatSessionId
  }

  const getActiveChatSessionId = () => {
    return tabs[activeTabIndex]?.chatSessionId
  }

  return {
    tabs,
    activeTabIndex,
    addTab,
    closeTab,
    setActiveTab: setActiveTabIndex,
    getActiveChatSessionId,
  }
}
