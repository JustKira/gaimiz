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

  return (
    <div className="h-20">
      <nav className="fixed top-0 z-50 flex items-center w-full gap-4 p-4 border-b-2 bg-background/20 backdrop-blur-xl border-border">
        <div>LOGO</div>

        {/* <ul>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger>ORDER</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Order Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"order/laptop"}>
                <DropdownMenuItem>Laptop</DropdownMenuItem>
              </Link>
              <Link href={"order/console"}>
                <DropdownMenuItem>Console</DropdownMenuItem>
              </Link>

              <Link href={"order/badges"}>
                <DropdownMenuItem>Badges</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul> */}

        <Menubar>
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
      </nav>
    </div>
  );
};

export default Navbar;
