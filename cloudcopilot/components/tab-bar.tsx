"use client"

import { PlusIcon, X } from "lucide-react"
import type { Tab } from "@/types"

interface TabBarProps {
  tabs: Tab[]
  activeTabIndex: number
  onAddTab: () => void
  onCloseTab: (index: number) => void
  onTabClick: (index: number) => void
}

export default function TabBar({ tabs, activeTabIndex, onAddTab, onCloseTab, onTabClick }: TabBarProps) {
  return (
    <div className="flex items-center bg-white border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`
            flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer
            transition-all duration-200 hover:bg-gray-50
            ${activeTabIndex === index ? "bg-white border-b-2 border-b-blue-500" : "bg-gray-100"}
          `}
          onClick={() => onTabClick(index)}
        >
          <span className="mr-2">{tab.title}</span>
          {activeTabIndex === index && (
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" title="Active chat session"></span>
          )}
          {!tab.isPermanent && (
            <button
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                onCloseTab(index)
              }}
              aria-label={`Close ${tab.title}`}
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}

      <button
        className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
        onClick={onAddTab}
        aria-label="Add new tab"
      >
        <PlusIcon size={16} className="mr-1" />
        <span>New Tab</span>
      </button>
    </div>
  )
}
