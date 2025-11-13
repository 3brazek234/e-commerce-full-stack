"use client";
import { Menu } from "lucide-react";
import React from "react";
import SideMenu from "./SideMenu";

function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Menu className="w-5 h-5 hover:text-darkColor hoverEffect md:hidden" />
      </button>
      <div className="md:hidden">
          <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
}

export default MobileMenu;
