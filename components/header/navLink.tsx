"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }:any) => {
  const pathName = usePathname();

  return (
    <Button variant="surface" size="1"    >
    <Link className={`rounded p-1 ${pathName === link.url && "bg-base-100 text-white"}`}
     href={link.url}>
      {link.title}
    </Link>
    </Button>
    
  );
};

export default NavLink;
