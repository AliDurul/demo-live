import { AppSidebar } from "@/components/layout/app-sidebar"
import NavHeader from "@/components/layout/nav-header"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <NavHeader/>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
