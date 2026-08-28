import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Warehouse } from "lucide-react";
import { Boxes } from "lucide-react";
import { CircleStar } from "lucide-react";
import { BadgeDollarSign } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ChartNetwork } from "lucide-react";
import { ChevronRightIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom";


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
];


export function NavMain() {

  const location = useLocation()
  // console.log(location)

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} defaultOpen={item.isActive} render={<SidebarMenuItem />}>
            <SidebarMenuButton tooltip={item.title} render={<Link to={`/stock/${item.url}`} className={location.pathname === `/stock/${item.url}` && "bg-sidebar-accent"} />}>
              {item.icon && (<item.icon className="text-primary size-5!" />)}
              <span>{item.title}</span>
            </SidebarMenuButton>
            {item.items?.length ? (
              <>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuAction className="aria-expanded:rotate-90" />
                  }>
                  <ChevronRightIcon />
                  <span className="sr-only">Toggle</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          render={<Link to={subItem.url} />}
                          // className={location.pathname === `${item.url}` && "bg-sidebar-accent"}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
