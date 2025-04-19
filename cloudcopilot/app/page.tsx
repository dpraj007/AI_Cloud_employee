"use client"

import { useEffect } from "react"
import TabBar from "@/components/tab-bar"
import BrowserView from "@/components/browser-view"
import ChatPanel from "@/components/chat-panel"
import { useTabs } from "@/hooks/use-tabs"
import { useChat } from "@/hooks/use-chat"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const isMobile = useMobile()
  const { tabs, activeTabIndex, addTab, closeTab, setActiveTab, getActiveChatSessionId } = useTabs()

  const { messages, inputValue, setInputValue, sendMessage, createChatSession, switchChatSession, removeChatSession } =
    useChat()

  // Handle tab actions with chat session synchronization
  const handleAddTab = () => {
    const newChatSessionId = addTab()
    createChatSession(newChatSessionId)
    switchChatSession(newChatSessionId)
  }

  const handleCloseTab = (index: number) => {
    const removedChatSessionId = closeTab(index)
    if (removedChatSessionId) {
      removeChatSession(removedChatSessionId)
    }
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    const chatSessionId = tabs[index].chatSessionId
    switchChatSession(chatSessionId)
  }

  // Ensure active chat session is synced with active tab on mount and when tabs change
  useEffect(() => {
    if (tabs.length > 0) {
      const activeChatSessionId = getActiveChatSessionId()
      if (activeChatSessionId) {
        switchChatSession(activeChatSessionId)
      }
    }
  }, [activeTabIndex, tabs])

  return (
    <main className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className={`${tabs.length > 0 ? "flex" : "hidden"} flex-col ${isMobile ? "h-1/2" : "w-3/5"}`}>
        <TabBar
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          onAddTab={handleAddTab}
          onCloseTab={handleCloseTab}
          onTabClick={handleTabClick}
        />
        <BrowserView />
      </div>

      <div className={`flex-1 ${isMobile ? "h-1/2" : tabs.length > 0 ? "w-2/5" : "w-full"}`}>
        <ChatPanel
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          sendMessage={sendMessage}
          activeChatSessionId={getActiveChatSessionId()}
        />
      </div>
    </main>
  )
}
