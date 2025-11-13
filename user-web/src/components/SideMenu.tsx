'use client';
import { navLinks } from "@/constants/data";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";

export default function SideMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
    const pathName = usePathname();
    const sidebsrRef = useOutsideClick<HTMLDivElement>(onClose)
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hoverEffect text-white/80`}
    >
      <div ref={sidebsrRef} className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop-light-green flex flex-col gap-6">
        <div className="between-row gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button className="hover:text-shop_light_green hoverEffect" onClick={onClose}>
            <span className="text-2xl">
                &times;
            </span>
          </button>
        </div>

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wider">
          {
            navLinks.map((item)=>
                <Link
                  key={item.label}
                  href={item.href}
                  className={` text-lg hover:text-shop_light_green hoverEffect ${
                    pathName === item.href && "text-white"
                  } tracking-wide`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
            )
          }  
          <SocialMedia/>
        </div>
      </div>
    </div>
  );
}
