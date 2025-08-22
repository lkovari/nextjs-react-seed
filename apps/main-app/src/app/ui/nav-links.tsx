"use client";

import {
  GiftIcon,
  CubeIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  DocumentCheckIcon,
  UserCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Data Input", href: "/sandbox/data-input", icon: GiftIcon },
  { name: "Elapsed Time", href: "/sandbox/elapsed-time", icon: ClockIcon },
  { name: "Cross Field", href: "/sandbox/cross-field", icon: CubeIcon },
  { name: "Controls", href: "/sandbox/controls", icon: CogIcon },
  { name: "Stepper", href: "/sandbox/stepper", icon: DocumentCheckIcon },
  {
    name: "Forms with Radix",
    href: "/sandbox/radix-based-forms",
    icon: UserCircleIcon,
  },
  {
    name: "Forms with Shadcn",
    href: "/sandbox/shadcn-based-forms",
    icon: UserCircleIcon,
  },
  { name: "Other", href: "/sandbox/other", icon: QuestionMarkCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("menu-link", { "menu-link--active": isActive })}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
