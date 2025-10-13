"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import GreenCheckmark from "../Modules/GreenCheckMark";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
function AssignmentControl() {
  return (
    <div className="d-flex align-items-center">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-2 text-secondary" />
    </div>
  );
}

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
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
            {assignments
              .filter((assignment) => assignment.course == cid)
              .map((a) => (
                <ListGroupItem
                  key={a._id}
                  className="wd-lesson p-3 d-flex justify-content-between align-items-center border-0 border-bottom"
                  style={{ backgroundColor: "#fff" }}
                >
                  <div
                    className="d-flex align-items-start p-2 mb-2 "
                    style={{
                      backgroundColor: "#fff",
                      transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <BsGripVertical className="me-3 fs-4 text-secondary mt-1 opacity-75" />
                    <MdAssignment className="me-3 fs-4 text-primary mt-1" />
                    <div className="flex-grow-1">
                      <Link
                        href={`/Courses/${cid}/Assignments/${a._id}`}
                        className="fw-semibold text-dark text-decoration-none d-block mb-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {a.title}
                      </Link>
                      <div
                        className="text-muted small"
                        style={{
                          lineHeight: "1.5",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {a.description}
                      </div>
                      <div className="mt-1 text-secondary small">
                        <strong>Due:</strong> {a.due} &nbsp; | &nbsp;
                        <strong>Available:</strong> {a.available} &nbsp; |
                        &nbsp;
                        <strong>Points:</strong> {a.points}
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
