"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { useAuth } from "../lib/provider/authProvider";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
const Navbar = () => {
  const NavLinks: {
    path: string;
    href: string;
  }[] = [
    {
      path: "",
      href: "",
    },
  ];

  const { user, loading } = useAuth();

  return (
    <div className="h-20">
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full gap-4 p-4 border-b-2 bg-background/20 backdrop-blur-xl border-border">
        <div className="flex items-center justify-center gap-4">
          <div>LOGO</div>

          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger>Make Order</MenubarTrigger>
              <MenubarContent>
                <Link href={"order/laptop"}>
                  <MenubarItem>Laptop</MenubarItem>
                </Link>
                <Link href={"order/console"}>
                  <MenubarItem>Console</MenubarItem>
                </Link>{" "}
                <Link href={"order/badges"}>
                  <MenubarItem>Badges</MenubarItem>
                </Link>
                <MenubarSeparator />
                <MenubarItem>Your Orders</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            {user ? (
              <Link href={"/auth/signout"}>
                <Button>SIGN OUT</Button>
              </Link>
            ) : (
              <Link href={"/auth/signin"}>
                <Button>SIGN IN</Button>
              </Link>
            )}
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
