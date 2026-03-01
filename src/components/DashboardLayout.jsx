import React from 'react'
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import AppHeader from './shared/sidebar/AppHeader';
import { BreadCrumb } from './shared/BreadCrumb';

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset >
                <AppHeader/>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <BreadCrumb />
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}


