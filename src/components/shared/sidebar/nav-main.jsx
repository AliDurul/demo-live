import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useLocation, Link } from "react-router-dom"
import { BadgeDollarSign, Warehouse, CircleStar, ShoppingCart, Boxes, ChartNetwork } from "lucide-react"


const items = [
  {
    title: "Analytics",
    url: "/stock",
    icon: ChartNetwork,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/stock",
      },
      {
        title: "Reports",
        url: "/stock/reports",
      },
    ],
  },
  {
    title: "Purchases",
    url: "purchases",
    icon: ShoppingCart,
  },
  {
    title: "Sales",
    url: "sales",

    icon: BadgeDollarSign,
  },
  {
    title: "Firms",
    url: "firms",
    icon: Warehouse,
  },
  {
    title: "Brands",
    url: "brands",
    icon: CircleStar,
  },
  {
    title: "Products",
    url: "products",
    icon: Boxes,
  },
]

export function NavMain() {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Services</SidebarGroupLabel>
      <SidebarMenu className="gap-3 group-data-[collapsible=icon]:gap-3">
        {items.map((item) => (
          item.items ? (<Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild >
                <SidebarMenuButton tooltip={item.title} isActive={location.pathname === `/stock`}>
                  {item.icon && <item.icon className="text-primary size-5!" />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={location.pathname === subItem.url}>
                        <Link to={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title} >
              <Link to={`/stock/${item.url}`} className="flex items-center gap-2">
                <SidebarMenuButton tooltip={item.title} isActive={location.pathname === `/stock/${item.url}`}>
                  {item.icon && <item.icon className='text-primary size-4!' />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
