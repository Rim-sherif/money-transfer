"use client"
import * as React from "react"
import {Download, LogOut,ArrowLeftRight, Calendar, Hand,  LayoutGrid, MessageCircleMore, CopyPlus, Settings, Store, Logs, CheckCheckIcon, Users } from 'lucide-react'
import { Setting2 } from 'iconsax-react'
import { Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import { NavMain } from "./nav-main"
import { getCookie,deleteCookie } from 'cookies-next'
// import { NavUser } from "./nav-user"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar} from "@/components/ui/sidebar"
import { getUserProfile, User } from '../api/profile';




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isDeveloper, setIsDeveloper] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const isDev = getCookie('isDev') === 'true';
    setIsDeveloper(isDev);
  
    getUserProfile().then((profile) => {
      setUser(profile);
    });
  }, []);


    function logout() {
      console.log('Token before logout:', getCookie('token')); 
      deleteCookie('token', { path: '/' });
      deleteCookie('isDev', { path: '/' });
      window.location.href = '/';
    }
const data = {
  user: {
    name: "ta7wila",
    email: "support@ta7wila.com",
    avatar: "/logo.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      title: "Transactions",
      url: "/dashboard/transaction",
      icon: ArrowLeftRight,
    },
    {
      title: "Invoices",
      url: "/dashboard/invoices",
      icon: Calendar,
    },
    {
      title: "Checkout",
      url: "/dashboard/checkouts",
      icon: CheckCheckIcon,
    },
    // {
    //   title: "Manual Check",
    //   url: "/dashboard/manualcheck",
    //   icon: Hand,
    // },
    {
      title: "Stores",
      url: "/dashboard/stores",
      icon: Store,
    },
    {
      title: "Add new store",
      url: "/dashboard/addstore",
      icon: CopyPlus,
    },
    ...(isDeveloper
      ? [
          {
            title: "Vendors",
            url: "/dashboard/vendors",
            icon: Hand,
            
          },
        ]
      : []),
      ...(user?.user_type === 'admin'
        ? [
            {
              title: "Users",
              url: "/dashboard/users",
              icon: Users,
            },
          ]
        : []),
    {
      title: "Our WhatsApp",
      url: "https://web.whatsapp.com",
      icon: MessageCircleMore,
    },
  ],
  preferences: [
    {
      title: "Setting",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Logs",
      url: "/dashboard/logs",
      icon: Logs,
    },
    {
      title: "Log out",
      url: "/",
      icon: LogOut,
      onClick: logout,
    },
  ],
  
}



  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader className="items-center py-6">
       <Image src="/Frame 1984078121.png" alt="Logo" width={130} height={100} />
      </SidebarHeader>
      <SidebarContent>
      
      <NavMain items={data.navMain} label="MANAGE" />
      <NavMain items={data.preferences} label="PREFERENCES" />
        
        
      </SidebarContent>
      <SidebarFooter className="my-8 np">
        <div className="space-y-6">
         

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                className="w-full justify-start gap-4 bg-[#2A4838] text-[#A5CBAD] p-4 rounded-3xl "
              >
                <Download className="h-5 w-5" />
                <span className={isCollapsed ? 'sr-only' : ''}>Download app</span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Download app</TooltipContent>}
          </Tooltip>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

