"\"use client"

import { useContext } from "react"
import { TabsContext } from "@/contexts/tabs-context"

export function useTabs() {
  return useContext(TabsContext)
}
