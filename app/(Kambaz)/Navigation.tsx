"use client";

import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, FaRegClock } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { MdOutlineHelpOutline } from "react-icons/md";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { BiBook } from "react-icons/bi";

export default function KambazNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  const navItemClass = (path: string) =>
    `border-0 text-center w-100 py-2 ${
      isActive(path) ? "bg-white" : "bg-black"
    }`;

  const linkClass = (path: string) =>
    `text-decoration-none small ${
      isActive(path) ? "text-danger" : "text-white"
    }`;

  const iconClass = (path: string) =>
    `fs-4 ${isActive(path) ? "text-danger" : "text-white"}`;

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-flex flex-column bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      {/* NEU Logo */}
      <ListGroupItem
        className="bg-black border-0 text-center py-3"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="60px" alt="Northeastern University" />
      </ListGroupItem>

      {/* Links */}
      <div className="flex-grow-1 d-flex flex-column align-items-center gap-1 mt-2">
        <ListGroupItem className={navItemClass("/Account")}>
          <Link href="/Account" className={linkClass("/Account")}>
            <FaRegCircleUser className={iconClass("/Account")} />
            <div style={{ fontSize: "0.8rem" }}>Account</div>
          </Link>
        </ListGroupItem>

        <ListGroupItem className={navItemClass("/Dashboard")}>
          <Link href="/Dashboard" className={linkClass("/Dashboard")}>
            <AiOutlineDashboard className={iconClass("/Dashboard")} />
            <div style={{ fontSize: "0.8rem" }}>Dashboard</div>
          </Link>
        </ListGroupItem>

        <ListGroupItem className={navItemClass("/Courses")}>
          <Link href="/Courses" className={linkClass("/Courses")}>
            <LiaBookSolid className={iconClass("/Courses")} />
            <div style={{ fontSize: "0.8rem" }}>Courses</div>
          </Link>
        </ListGroupItem>

        <ListGroupItem className={navItemClass("/Calendar")}>
          <Link href="/Calendar" className={linkClass("/Calendar")}>
            <IoCalendarOutline className={iconClass("/Calendar")} />
            <div style={{ fontSize: "0.8rem" }}>Calendar</div>
          </Link>
        </ListGroupItem>

        <ListGroupItem className={navItemClass("/Inbox")}>
          <Link href="/Inbox" className={linkClass("/Inbox")}>
            <FaInbox className={iconClass("/Inbox")} />
            <div style={{ fontSize: "0.8rem" }}>Inbox</div>
          </Link>
        </ListGroupItem>

        <ListGroupItem className={navItemClass("/History")}>
          <Link href="/History" className={linkClass("/History")}>
            <FaRegClock className={iconClass("/History")} />
            <div style={{ fontSize: "0.8rem" }}>History</div>
          </Link>
        </ListGroupItem>

        <ListGroupItem className={navItemClass("/Studio")}>
          <Link href="/Studio" className={linkClass("/Studio")}>
            <PiStudent className={iconClass("/Studio")} />
            <div style={{ fontSize: "0.8rem" }}>Studio</div>
          </Link>
        </ListGroupItem>

        <ListGroupItem className={navItemClass("/Help")}>
          <Link href="/Help" className={linkClass("/Help")}>
            <MdOutlineHelpOutline className={iconClass("/Help")} />
            <div style={{ fontSize: "0.8rem" }}>Help</div>
          </Link>
        </ListGroupItem>
      </div>

      {/* Labs link separated at bottom */}
      <div className="mb-3 mt-2 border-top pt-2">
        <ListGroupItem className={navItemClass("/Labs")}>
          <Link href="/Labs" className={linkClass("/Labs")}>
            <BiBook className={iconClass("/Labs")} />
            <div style={{ fontSize: "0.8rem" }}>Labs</div>
          </Link>
        </ListGroupItem>
      </div>
    </ListGroup>
  );
}
