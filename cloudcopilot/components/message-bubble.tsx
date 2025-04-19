import type { Message } from "@/types"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: Message
  isUser: boolean
}

export default function MessageBubble({ message, isUser }: MessageBubbleProps) {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3 shadow-sm",
          isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none",
        )}
      >
        <p>{message.content}</p>
        <div className={cn("text-xs mt-1", isUser ? "text-blue-100" : "text-gray-500")}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  )
}
