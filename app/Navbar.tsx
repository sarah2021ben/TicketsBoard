import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/logo-ticketboard.png";

const Navbar = () => {
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
              className="text-zinc-600 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
