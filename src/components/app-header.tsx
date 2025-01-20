"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Wifi } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { checkDeveloperMode, getUserProfile, User } from '../api/profile';

export default function Header() {
  const [isDeveloper, setIsDeveloper] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleCheckDeveloperMode = useCallback(async () => {
    const isDev = await checkDeveloperMode();
    if (isDev) {
      setIsDeveloper(true);
      setCookie('isDev', 'true');
    }
  }, []);

  useEffect(() => {
    const isDev = getCookie('isDev') === 'true';
    setIsDeveloper(isDev);

    getUserProfile().then((profile) => {
      setUser(profile);
    });
  }, []);

  return (
    <header className="flex h-16 shrink-0 text-white px-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
      </div>

      <div className="flex items-center gap-4 w-auto">
        <div className="items-center">
          {!isDeveloper ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCheckDeveloperMode}
              className="rounded-full px-4 py-5 bg-[#A5CBAD] hover:bg-gray-400/20 text-xs text-black"
            >
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8571 2.5L16.0352 5.59076C14.8506 4.89741 13.4717 4.5 12 4.5C7.58172 4.5 4 8.08172 4 12.5C4 13.9571 4.38958 15.3233 5.07026 16.5M9.14286 22.5L7.96473 19.4092C9.14936 20.1026 10.5283 20.5 12 20.5C16.4183 20.5 20 16.9183 20 12.5C20 11.0429 19.6104 9.67669 18.9297 8.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              Switch to DEV MODE
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              disabled
              className="rounded-full px-4 py-5 bg-[#A5CBAD] text-black hover:bg-green-600 text-xs"
            >
              You are in DEV MODE
            </Button>
          )}
        </div>

        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full bg-neutral-900">
          <Wifi className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full bg-neutral-900">
              <Bell className="h-4 w-4" />
              <span className="sr-only">View notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>No new notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 gap-2 rounded-full px-0 md:h-10 md:px-2 ">
              <Avatar className="h-8 w-8 md:h-10 md:w-10 bg-[#A5CBAD]">
                <AvatarFallback>👨🏻</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col text-left md:flex">
                <span className="text-sm font-semibold">{user?.name || 'Loading...'}</span>
                <span className="text-xs text-gray-400">{user?.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard/settings" ><DropdownMenuItem>Profile</DropdownMenuItem></Link>
            
            <Link href="/dashboard/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
            
            <DropdownMenuSeparator />
            <Link href="/"><DropdownMenuItem>Log out</DropdownMenuItem></Link>
            
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

