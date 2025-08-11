"use client";

import {
  GiftIcon,
  CubeIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

const links = [
  {
    name: "Data Input",
    href: "/sandbox/data-input",
    icon: GiftIcon,
  },
  {
    name: "Cross Field",
    href: "/sandbox/cross-field",
    icon: CubeIcon,
  },
  {
    name: "Controls",
    href: "/sandbox/controls",
    icon: CogIcon,
  },
  {
    name: "Other",
    href: "/sandbox/other",
    icon: QuestionMarkCircleIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[22px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-400 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-900 text-[#E20074]": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
