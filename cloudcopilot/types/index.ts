export interface Tab {
  id: string
  title: string
  isPermanent: boolean
  chatSessionId: string
}

export interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: string
}

export interface ChatSession {
  id: string
  messages: Message[]
}
