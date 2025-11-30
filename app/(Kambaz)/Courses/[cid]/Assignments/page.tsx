"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import GreenCheckmark from "../Modules/GreenCheckMark";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/(Kambaz)/hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteAssignment, setAssignments } from "./reducer";
import { RootState } from "@/app/(Kambaz)/store";
import * as client from "./client";
import { Dropdown, Modal, Button } from "react-bootstrap";

function AssignmentControl({
  assignmentId,
  cid,
}: {
  assignmentId: string;
  cid: string;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useSelector((s: RootState) => s.auth.currentUser);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    router.push(`/Courses/${cid}/Assignments/${assignmentId}`);
  };

  const onDeleteClicked = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (err) {
      console.error("Failed to delete assignment:", err);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <GreenCheckmark />
      {currentUser?.role === "FACULTY" ||
        (currentUser?.role === "ADMIN" && (
          <div className="ms-2">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                bsPrefix="btn btn-sm btn-link p-0 text-secondary"
                id={`assignment-control-${assignmentId}-toggle`}
                title="Edit or delete assignment"
              >
                <IoEllipsisVertical className="fs-4" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow-sm" style={{ minWidth: 150 }}>
                <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                <Dropdown.Item
                  onClick={onDeleteClicked}
                  className="text-danger"
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Modal
              show={showDeleteConfirm}
              onHide={() => setShowDeleteConfirm(false)}
              centered
              style={{ zIndex: 200000 }}
              aria-labelledby="confirm-delete-assignment"
            >
              <Modal.Header closeButton>
                <Modal.Title id="confirm-delete-assignment">
                  Delete this assignment?
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                This will permanently remove the assignment. Students will not
                be able to access it after deletion.
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  No
                </Button>
                <Button variant="danger" size="sm" onClick={confirmDelete}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
    </div>
  );
}

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const assignments = useSelector(
    (state: RootState) => state.assignments.assignments
  );
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("ASSIGNMENTS");
  const filteredAssignments = assignments
    .filter((assignment) => assignment.course == cid)
    .filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGroup = groupFilter === "ALL" || assignment.course === cid;
      return matchesSearch && matchesGroup;
    });
  const refresh = async () => {
    if (!cid) return;
    try {
      const serverAssignments = await client.findAssignmentsForCourse(
        String(cid)
      );
      dispatch(
        setAssignments(
          Array.isArray(serverAssignments) ? serverAssignments : []
        )
      );
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  };

  useEffect(() => {
    refresh();
  }, [cid]);

  const handleDeleteConfirm = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      await refresh();
    } catch (err) {
      console.error("Failed to delete assignment:", err);
    }
  };

  return (
    <div id="wd-assignments" style={{ padding: "15px" }}>
      <div className="d-flex align-items-center mb-3 gap-2">
        <div className="flex-grow-1 position-relative">
          <BiSearch
            className="position-absolute top-50 translate-middle-y ms-2 text-secondary"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="form-control ps-5 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={() =>
            setGroupFilter(groupFilter === "ALL" ? "ASSIGNMENTS" : "ALL")
          }
        >
          + Group
        </button>
        {currentUser?.role === "FACULTY" ||
          (currentUser?.role === "ADMIN" && (
            <button
              className="btn btn-danger"
              onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
            >
              + Assignment
            </button>
          ))}
      </div>

      <ListGroup className="rounded-0 shadow-sm" id="wd-assignment-list">
        <ListGroupItem className="wd-module p-0 fs-5 border-0">
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
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((a) => (
                <ListGroupItem
                  key={a._id}
                  className="wd-lesson p-3 d-flex justify-content-between align-items-center border-0 border-bottom"
                  style={{ backgroundColor: "#fff" }}
                >
                  <div
                    className="d-flex align-items-start p-2 mb-2 flex-grow-1"
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

                  <AssignmentControl assignmentId={a._id} cid={cid as string} />
                </ListGroupItem>
              ))
            ) : (
              <ListGroupItem className="p-3 text-center text-muted">
                No assignments found
              </ListGroupItem>
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
