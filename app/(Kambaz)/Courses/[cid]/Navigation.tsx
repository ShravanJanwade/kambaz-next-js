"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import {
  FaComments,
  FaVideo,
  FaClipboardList,
  FaQuestionCircle,
  FaUsers,
} from "react-icons/fa";

type Props = {
  mobile?: boolean;
  courseId?: string;
  onNavigate?: () => void;
};

export default function CourseNavigation({
  mobile = false,
  onNavigate,
}: Props) {
  const base = "/Courses/1234";
  const links = [
    { href: `${base}/Home`, label: "Home", icon: <AiOutlineHome size={18} /> },
    { href: `${base}/Modules`, label: "Modules", icon: <BiBook size={18} /> },
    { href: `${base}/Piazza`, label: "Piazza", icon: <FaComments size={18} /> },
    { href: `${base}/Zoom`, label: "Zoom", icon: <FaVideo size={18} /> },
    {
      href: `${base}/Assignments`,
      label: "Assignments",
      icon: <FaClipboardList size={18} />,
    },
    {
      href: `${base}/Quizzes`,
      label: "Quizzes",
      icon: <FaQuestionCircle size={18} />,
    },
    {
      href: `${base}/People/Table`,
      label: "People",
      icon: <FaUsers size={18} />,
    },
  ];

  if (mobile) {
    return (
      <nav
        className="d-flex flex-column w-100"
        aria-label="Course quick links"
        style={{
          gap: 6,
          padding: "8px 1px",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => onNavigate?.()}
            className="text-danger text-decoration-none w-100 d-flex align-items-center"
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.15px",
              padding: "8px 6px",
              lineHeight: "1.05",
              display: "flex",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 24,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </span>
            <span style={{ display: "inline-block" }}>{label}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ href, label }, idx) => (
        <Link
          key={href}
          href={href}
          className={`list-group-item ${
            idx === 0 ? "active" : "text-danger"
          } border-0`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
