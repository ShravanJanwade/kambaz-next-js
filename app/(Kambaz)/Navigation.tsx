"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import {
  FaInbox,
  FaRegClock,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { MdOutlineHelpOutline } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import CourseNavigation from "./Courses/[cid]/Navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [desktopCoursePanelOpen, setDesktopCoursePanelOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  // portal element to render overlay/drawer outside app DOM
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "kambaz-portal";
    document.body.appendChild(el);
    setPortalEl(el);
    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
  }, []);

  const isActive = (path: string) => pathname?.startsWith(path);

  const navLinks = [
    { href: "/Account", icon: <FaRegCircleUser />, label: "Account" },
    { href: "/Dashboard", icon: <AiOutlineDashboard />, label: "Dashboard" },
    { href: "/Courses", icon: <LiaBookSolid />, label: "Courses" },
    { href: "/Calendar", icon: <IoCalendarOutline />, label: "Calendar" },
    { href: "/Inbox", icon: <FaInbox />, label: "Inbox" },
    { href: "/History", icon: <FaRegClock />, label: "History" },
    { href: "/Studio", icon: <PiStudent />, label: "Studio" },
    { href: "/Help", icon: <MdOutlineHelpOutline />, label: "Help" },
    { href: "/Labs", icon: <BiBook />, label: "Labs" },
  ];

  // demo courses — replace with your shared source
  const allCourses = [
    { id: "1234", code: "CS1234", title: "React JS" },
    { id: "2345", code: "CS2345", title: "Node JS" },
    { id: "3456", code: "CS3456", title: "MongoDB" },
    { id: "4567", code: "CS4567", title: "Java Programming" },
    { id: "5678", code: "CS5678", title: "Python" },
    { id: "6789", code: "CS6789", title: "HTML & CSS" },
    { id: "7890", code: "CS7890", title: "DevOps" },
    { id: "8901", code: "CS8901", title: "Data Structures" },
    { id: "9012", code: "CS9012", title: "Cyber Security" },
  ];

  const isCoursePage = pathname?.startsWith("/Courses");

  const MAIN_SIDEBAR_WIDTH = 110;
  const NAVBAR_HEIGHT = 56;
  const NAVBAR_Z = 10000;
  const SIDEBAR_Z = 1000;
  const MAIN_DRAWER_Z = 99999;

  const DESKTOP_PANEL_WIDTH_PERCENT = 35;
  const DESKTOP_PANEL_MIN = 320;
  const DESKTOP_PANEL_MAX = 560;
  const panelWidthCSS = `min(max(${DESKTOP_PANEL_WIDTH_PERCENT}vw, ${DESKTOP_PANEL_MIN}px), ${DESKTOP_PANEL_MAX}px)`;

  const goToCourse = (courseId: string) => {
    router.push(`/Courses/${courseId}/Home`);
    setDesktopCoursePanelOpen(false);
    setIsOpen(false);
    setMobileCoursesOpen(false);
    setCourseOpen(false);
  };

  const portalContent = (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={() => {
          setIsOpen(false);
          setMobileCoursesOpen(false);
        }}
        style={{
          position: "fixed",
          inset: 0,
          background: isOpen ? "rgba(0,0,0,0.45)" : "transparent",
          transition: "background 0.25s ease-in-out, opacity 0.25s ease-in-out",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          zIndex: MAIN_DRAWER_Z - 1,
        }}
      />

      <div
        role="dialog"
        aria-modal={isOpen}
        className="position-fixed top-0 start-0 w-100 h-100 bg-white text-danger d-flex flex-column"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s cubic-bezier(.2,.9,.2,1)",
          zIndex: MAIN_DRAWER_Z,
          inset: 0,
          opacity: 1,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <img
              style={{ height: "100px", width: "200px" }}
              src="/images/canvas.svg"
            />
          </div>
          <FaTimes
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div
          className="d-flex flex-column align-items-start px-4 mt-3 gap-2"
          style={{ overflow: "auto", paddingBottom: 40 }}
        >
          {navLinks.map(({ href, icon, label }) => {
            if (href === "/Courses") {
              return (
                <div key={href} className="w-100">
                  <button
                    onClick={() => setMobileCoursesOpen((s) => !s)}
                    className="w-100 d-flex align-items-center justify-content-between btn"
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "10px 6px",
                      color: "#dc3545",
                      fontWeight: 700,
                      textAlign: "left",
                    }}
                  >
                    <span
                      className="d-flex align-items-center"
                      style={{ gap: 10 }}
                    >
                      <span style={{ fontSize: 20 }}>{icon}</span>
                      <span style={{ fontSize: 16 }}>{label}</span>
                    </span>
                    <span>
                      {mobileCoursesOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  {mobileCoursesOpen && (
                    <div
                      style={{
                        paddingLeft: 46,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          marginTop: 4,
                          marginBottom: 6,
                          borderTop: "1px solid rgba(0,0,0,0.04)",
                          width: "100%",
                        }}
                      />
                      {allCourses.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => goToCourse(c.id)}
                          className="w-100 text-start btn"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#dc3545",
                            fontWeight: 600,
                            padding: "8px 6px",
                          }}
                        >
                          {c.code} — {c.title}
                        </button>
                      ))}
                      <div
                        style={{
                          marginTop: 6,
                          marginBottom: 8,
                          borderBottom: "1px solid rgba(0,0,0,0.04)",
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className="d-flex align-items-center gap-3 fs-5 fw-medium text-danger text-decoration-none w-100"
                onClick={() => {
                  setIsOpen(false);
                  setMobileCoursesOpen(false);
                }}
                style={{ padding: "10px 6px" }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <>
      <ListGroup
        className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-flex flex-column bg-black"
        style={{ width: MAIN_SIDEBAR_WIDTH, zIndex: SIDEBAR_Z }}
      >
        <ListGroupItem
          className="bg-black border-0 text-center py-3"
          as="a"
          target="_blank"
          href="https://www.northeastern.edu/"
        >
          <img
            src="/images/NEU.png"
            width="60px"
            alt="Northeastern University"
          />
        </ListGroupItem>

        <div className="flex-grow-1 d-flex flex-column align-items-center gap-1 mt-2">
          {navLinks.map(({ href, icon, label }) => {
            if (href === "/Courses") {
              return (
                <ListGroupItem
                  key={href}
                  className={`border-0 text-center w-100 py-2 ${
                    isActive(href) ? "bg-white" : "bg-black"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDesktopCoursePanelOpen((s) => !s);
                    }}
                    className={`w-100 h-100 text-decoration-none small ${
                      isActive(href) ? "text-danger" : "text-white"
                    }`}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className={`fs-4 ${
                        isActive(href) ? "text-danger" : "text-white"
                      }`}
                    >
                      {icon}
                    </span>
                    <div style={{ fontSize: "0.8rem" }}>{label}</div>
                  </button>
                </ListGroupItem>
              );
            }

            return (
              <ListGroupItem
                key={href}
                className={`border-0 text-center w-100 py-2 ${
                  isActive(href) ? "bg-white" : "bg-black"
                }`}
              >
                <Link
                  href={href}
                  className={`text-decoration-none small ${
                    isActive(href) ? "text-danger" : "text-white"
                  }`}
                >
                  <span
                    className={`fs-4 ${
                      isActive(href) ? "text-danger" : "text-white"
                    }`}
                  >
                    {icon}
                  </span>
                  <div style={{ fontSize: "0.8rem" }}>{label}</div>
                </Link>
              </ListGroupItem>
            );
          })}
        </div>

        <div className="mb-3 mt-2 border-top pt-2">
          <ListGroupItem
            className={`border-0 text-center w-100 py-2 ${
              isActive("/Labs") ? "bg-white" : "bg-black"
            }`}
          >
            <Link
              href="/Labs"
              className={`text-decoration-none small ${
                isActive("/Labs") ? "text-danger" : "text-white"
              }`}
            >
              <BiBook
                className={`fs-4 ${
                  isActive("/Labs") ? "text-danger" : "text-white"
                }`}
              />
              <div style={{ fontSize: "0.8rem" }}>Labs</div>
            </Link>
          </ListGroupItem>
        </div>
      </ListGroup>

      <div
        className="d-flex d-md-none align-items-center bg-black text-white px-3 py-2 position-fixed top-0 start-0 end-0"
        style={{ zIndex: NAVBAR_Z, height: NAVBAR_HEIGHT }}
      >
        <div className="d-flex align-items-center" style={{ gap: 12 }}>
          <FaBars
            size={22}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="flex-grow-1 text-center">
          <span className="fw-bold">Kambaz</span>
        </div>

        <div
          className="d-flex align-items-center"
          style={{ minWidth: 36, justifyContent: "flex-end" }}
        >
          {isCoursePage && (
            <button
              aria-label="open course menu"
              onClick={() => setCourseOpen((s) => !s)}
              className="btn p-0 d-inline-flex align-items-center justify-content-center"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.08)",
                position: "relative",
                zIndex: NAVBAR_Z + 1,
              }}
            >
              {courseOpen ? (
                <FaChevronUp size={14} />
              ) : (
                <FaChevronDown size={14} />
              )}
            </button>
          )}
        </div>
      </div>

      {portalEl ? createPortal(portalContent, portalEl) : null}

      <div className="d-md-none">
        <div
          aria-hidden={!(courseOpen && !isOpen)}
          onClick={() => {
            setCourseOpen(false);
          }}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: NAVBAR_HEIGHT,
            bottom: 0,
            background:
              courseOpen && !isOpen ? "rgba(0,0,0,0.35)" : "transparent",
            transition: "background 0.22s ease, opacity 0.22s ease",
            opacity: courseOpen && !isOpen ? 1 : 0,
            pointerEvents: courseOpen && !isOpen ? "auto" : "none",
            zIndex: NAVBAR_Z - 5,
          }}
        />

        <div
          role="dialog"
          aria-modal={courseOpen && !isOpen}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: NAVBAR_HEIGHT,
            height: courseOpen && !isOpen ? "50vh" : 0,
            transform:
              courseOpen && !isOpen ? "translateY(0)" : "translateY(-6px)",
            transition:
              "height 360ms cubic-bezier(.22,.9,.3,1), transform 300ms ease",
            background: "#ffffff",
            color: "#000000",
            zIndex: NAVBAR_Z - 3,
            overflow: "hidden",
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
            boxShadow: "0 10px 40px rgba(2,6,23,0.12)",
            pointerEvents: courseOpen && !isOpen ? "auto" : "none",
          }}
        >
          <div
            style={{
              height: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 4,
                borderRadius: 99,
                background: "rgba(0,0,0,0.06)",
              }}
            />
          </div>

          <div
            style={{
              padding: "8px 12px",
              height: `calc(50vh - 10px)`,
              overflow: "auto",
            }}
          >
            <div style={{ marginBottom: 8 }}>
              <CourseNavigation
                mobile
                onNavigate={() => setCourseOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!desktopCoursePanelOpen}
        onClick={() => setDesktopCoursePanelOpen(false)}
        style={{
          position: "fixed",
          left: `calc(${MAIN_SIDEBAR_WIDTH}px + ${panelWidthCSS})`,
          top: 0,
          bottom: 0,
          right: 0,
          background: desktopCoursePanelOpen
            ? "rgba(0,0,0,0.12)"
            : "transparent",
          opacity: desktopCoursePanelOpen ? 1 : 0,
          pointerEvents: desktopCoursePanelOpen ? "auto" : "none",
          transition: "background 220ms ease, opacity 220ms ease",
          zIndex: SIDEBAR_Z + 2,
        }}
      />

      <aside
        className="d-none d-md-block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: panelWidthCSS,
          transform: desktopCoursePanelOpen
            ? `translateX(${MAIN_SIDEBAR_WIDTH}px)`
            : "translateX(-100%)",
          transition: "transform 320ms cubic-bezier(.22,.9,.3,1)",
          overflow: "hidden",
          background: "#ffffff",
          color: "#dc3545",
          boxShadow: desktopCoursePanelOpen
            ? "8px 0 30px rgba(8,20,40,0.08)"
            : "none",
          zIndex: SIDEBAR_Z + 1,
          borderRight: "none",
        }}
      >
        <div
          style={{
            display: desktopCoursePanelOpen ? "block" : "none",
            height: "100%",
          }}
        >
          <div className="d-flex align-items-start justify-content-between px-3 py-3 border-bottom">
            <div>
              <h4 className="mb-1" style={{ color: "#dc3545" }}>
                Courses
              </h4>
              <hr style={{ margin: "6px 0 8px 0" }} />
              <h6 className="mb-1 text-danger">All Courses</h6>
              <hr style={{ margin: "6px 0 8px 0" }} />
              <div style={{ fontSize: 12, color: "#b02a37" }}>Courses</div>
            </div>

            <button
              onClick={() => setDesktopCoursePanelOpen(false)}
              aria-label="Close courses panel"
              className="btn"
              style={{
                border: "none",
                background: "transparent",
                color: "#6c757d",
              }}
            >
              <FaTimes />
            </button>
          </div>

          <div
            style={{
              padding: "12px",
              height: "calc(100vh - 110px)",
              overflowY: "auto",
            }}
          >
            {allCourses.map((c) => (
              <div
                key={c.id}
                className="d-flex align-items-center"
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  marginBottom: 8,
                  cursor: "pointer",
                }}
                onClick={() => goToCourse(c.id)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#dc3545" }}>
                    {c.code}
                  </div>
                  <div style={{ fontSize: 13, color: "#7a1b23" }}>
                    {c.title}
                  </div>
                </div>
                <div style={{ color: "#b02a37", fontWeight: 600 }}>Open</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
