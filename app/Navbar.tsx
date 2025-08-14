"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../public/logo-ticketboard.png";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";

const Navbar = () => {
  // If you want to highlight the active link, you can use pathname
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/tickets", label: "Tickets" },
  ];
  return (
    <nav className="flex space-x-6 border-b border-gray-200 px-4 mb-5 h-15 items-center">
      <Link href="/">
        <Image src={logo} alt="TicketBoard Logo" width={150} height={33} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href ? "text-amber-500" : "text-zinc-600"
              } hover:text-amber-400 transition-colors`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box className="ml-auto">
        {status === "authenticated" ? (
          <>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  className="cursor-pointer"
                  fallback="?"
                  radius="full"
                  size="2"
                  referrerPolicy="no-referrer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Label>
                  <Text size="2">{session.user!.name}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        ) : (
          <Link
            href="/api/auth/signin"
            className="text-amber-500 hover:text-amber-400"
          >
            Login
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
