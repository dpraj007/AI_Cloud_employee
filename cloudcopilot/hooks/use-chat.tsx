"use client"

import { useState, useEffect } from "react"
import type { Message, ChatSession } from "@/types"

const DEFAULT_WELCOME_MESSAGE = {
  id: "welcome",
  content: "Welcome to CloudCopilot Lite! How can I help you with Google Cloud Console today?",
  sender: "agent" as const,
  timestamp: new Date().toISOString(),
}

export function useChat() {
  const [chatSessions, setChatSessions] = useState<Record<string, ChatSession>>({
    "main-session": {
      id: "main-session",
      messages: [
        DEFAULT_WELCOME_MESSAGE,
        {
          id: "sample-user",
          content: "I need to create a new VM instance. Can you help me with that?",
          sender: "user",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          id: "sample-agent",
          content:
            "I'll guide you through creating a VM instance. First, let's navigate to the Compute Engine section.",
          sender: "agent",
          timestamp: new Date(Date.now() - 30000).toISOString(),
        },
      ],
    },
  })

  const [activeChatSessionId, setActiveChatSessionId] = useState<string>("main-session")
  const [inputValue, setInputValue] = useState("")

  // Load chat sessions from localStorage on mount
  useEffect(() => {
    const savedChatSessions = localStorage.getItem("cloudcopilot-chat-sessions")
    const savedActiveChatSessionId = localStorage.getItem("cloudcopilot-active-chat-session")

    if (savedChatSessions) {
      setChatSessions(JSON.parse(savedChatSessions))
    }

    if (savedActiveChatSessionId) {
      setActiveChatSessionId(savedActiveChatSessionId)
    }
  }, [])

  // Save chat sessions to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cloudcopilot-chat-sessions", JSON.stringify(chatSessions))
  }, [chatSessions])

  // Save active chat session ID to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cloudcopilot-active-chat-session", activeChatSessionId)
  }, [activeChatSessionId])

  const createChatSession = (sessionId: string) => {
    if (chatSessions[sessionId]) return sessionId

    setChatSessions((prev) => ({
      ...prev,
      [sessionId]: {
        id: sessionId,
        messages: [
          {
            ...DEFAULT_WELCOME_MESSAGE,
            id: `welcome-${sessionId}`,
            timestamp: new Date().toISOString(),
          },
        ],
      },
    }))

    return sessionId
  }

  const switchChatSession = (sessionId: string) => {
    if (!chatSessions[sessionId]) {
      createChatSession(sessionId)
    }

    setActiveChatSessionId(sessionId)
    setInputValue("") // Clear input when switching sessions
  }

  const removeChatSession = (sessionId: string) => {
    if (sessionId === "main-session") return // Don't remove main session

    setChatSessions((prev) => {
      const newSessions = { ...prev }
      delete newSessions[sessionId]
      return newSessions
    })
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setChatSessions((prev) => ({
      ...prev,
      [activeChatSessionId]: {
        ...prev[activeChatSessionId],
        messages: [...prev[activeChatSessionId].messages, newMessage],
      },
    }))

    setInputValue("")

    // Simulate agent response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm processing your request. This is a placeholder response since we're not connected to the backend yet.",
        sender: "agent",
        timestamp: new Date().toISOString(),
      }

      setChatSessions((prev) => ({
        ...prev,
        [activeChatSessionId]: {
          ...prev[activeChatSessionId],
          messages: [...prev[activeChatSessionId].messages, responseMessage],
        },
      }))
    }, 1000)
  }

  const activeMessages = chatSessions[activeChatSessionId]?.messages || []

  return {
    messages: activeMessages,
    inputValue,
    setInputValue,
    sendMessage,
    activeChatSessionId,
    createChatSession,
    switchChatSession,
    removeChatSession,
  }
}
