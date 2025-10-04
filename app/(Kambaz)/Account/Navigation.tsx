"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    {
      href: "/Account/Signin",
      label: "Signin",
    },
    {
      href: "/Account/Signup",
      label: "Signup",
    },
    {
      href: "/Account/Profile",
      label: "Profile",
    },
  ];

  return (
    <div
      className="d-flex flex-column bg-white border-end"
      style={{ width: "150px" }}
    >
      <h4 className="mb-4">Account</h4>
      <div className="d-flex flex-column">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`d-flex align-items-center gap-2 py-2 px-3 mb-2 text-decoration-none ${
                active
                  ? "fw-bold border-start border-3 border-dark text-dark"
                  : "text-danger"
              }`}
              style={{ transition: "0.2s" }}
            >
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
