"use client";
import { navLinks } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu() {
  const pathName = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-7 capitalize text-sm font-semibold text-lightColor ">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            pathName === link.href && "text-shop_light_green"
          } hover:text-shop_light_green hoverEffect relative group`}
        >
          {link.label}
          <span
            className={`absolute inset-x-0 bottom-0 h-0.5 bg-shop_light_green scale-x-0 transition-transform group-hover:scale-x-100 ${
              pathName === link.href && "scale-x-100"
            }`}
          />
        </Link>
      ))}
    </div>
  );
}
