"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import GreenCheckmark from "../Modules/GreenCheckMark";

function AssignmentControl() {
  return (
    <div className="d-flex align-items-center">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-2 text-secondary" />
    </div>
  );
}

export default function Assignments() {
  const assignments = [
    {
      id: 123,
      title: "A1 – ENV + HTML",
      sub1: "Multiple Modules | Not available until May 6 at 12:00 am",
      sub2: "Due May 13 at 11:59 pm | 100 pts",
    },
    {
      id: 124,
      title: "A2 – CSS + Bootstrap",
      sub1: "Multiple Modules | Available from May 13",
      sub2: "Due May 20 at 11:59 pm | 100 pts",
    },
    {
      id: 125,
      title: "A3 – JavaScript + DOM",
      sub1: "Multiple Modules | Available from May 20",
      sub2: "Due May 27 at 11:59 pm | 100 pts",
    },
  ];

  return (
    <div id="wd-assignments" style={{ padding: "15px" }}>
      <div className="d-flex align-items-center mb-3">
        <div className="flex-grow-1 position-relative me-2">
          <BiSearch
            className="position-absolute top-50 translate-middle-y ms-2 text-secondary"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="form-control ps-5 shadow-sm"
          />
        </div>
        <button className="btn btn-secondary me-2">+ Group</button>
        <button className="btn btn-danger">+ Assignment</button>
      </div>

      <ListGroup className="rounded-0 shadow-sm" id="wd-assignment-list">
        <ListGroupItem className="wd-module p-0 fs-5 border-0">
          {/* Group Header */}
          <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center border-start border-success border-3 rounded-top">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-4 text-secondary" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>

            <div className="d-flex align-items-center">
              <span className="badge rounded-pill bg-white text-dark border me-3 shadow-sm">
                40% of Total
              </span>
              <IoEllipsisVertical className="fs-4 text-secondary" />
            </div>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((a) => (
              <ListGroupItem
                key={a.id}
                className="wd-lesson p-3 d-flex justify-content-between align-items-center border-0 border-bottom"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-4 text-secondary mt-1" />
                  <MdAssignment className="me-3 fs-4 text-secondary mt-1" />
                  <div>
                    <Link
                      href={`/Courses/1234/Assignments/${a.id}`}
                      className="fw-bold text-dark text-decoration-none"
                    >
                      {a.title}
                    </Link>
                    <div className="text-muted small">
                      {a.sub1}
                      <br />
                      {a.sub2}
                    </div>
                  </div>
                </div>

                <AssignmentControl />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
