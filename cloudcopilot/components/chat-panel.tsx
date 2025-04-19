"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import MessageBubble from "./message-bubble"
import type { Message } from "@/types"

interface ChatPanelProps {
  messages: Message[]
  inputValue: string
  setInputValue: (value: string) => void
  sendMessage: () => void
  activeChatSessionId: string
}

export default function ChatPanel({
  messages,
  inputValue,
  setInputValue,
  sendMessage,
  activeChatSessionId,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle Ctrl/Cmd + Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">CloudCopilot Chat</h2>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {activeChatSessionId === "main-session"
              ? "Main Session"
              : activeChatSessionId.replace("chat-session-", "Session #")}
          </span>
        </div>
        <p className="text-sm text-gray-500">Ask questions about Google Cloud Console</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} isUser={message.sender === "user"} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="resize-none min-h-[80px]"
          />
          <Button onClick={sendMessage} disabled={!inputValue.trim()} size="icon" className="h-10 w-10 rounded-full">
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Press Ctrl/Cmd + Enter to send</p>
      </div>
    </div>
  )
}
