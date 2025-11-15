"use client";
import Link from "next/link";
import type React from "react";
import { Row, Col, Card, FormControl, Button } from "react-bootstrap";
import { LuNotebookPen } from "react-icons/lu";
import * as client from "../Courses/client";

import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  addCourse,
  deleteCourse as deleteCourseAction,
  updateCourse as updateCourseAction,
  setCourses,
  setEnrolledCourses,
  enrollCourse,
  unenrollCourse,
} from "../Courses/reducer";
import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

export default function Dashboard() {
  const { courses, enrolledCourses } = useSelector(
    (state: RootState) => state.coursesReducer
  );
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<Course>({
    _id: uuidv4(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const refreshServerData = async () => {
    try {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses ?? []));

      try {
        const myCourses = await client.findMyCourses();
        const myCourseIds = Array.isArray(myCourses)
          ? myCourses.map((c: Course) => c._id)
          : [];
        dispatch(setEnrolledCourses(myCourseIds));
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
      }
    } catch (err) {
      console.error("Failed to fetch courses from server:", err);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    refreshServerData();
  }, [currentUser, dispatch, router]);

  const displayedCourses =
    currentUser?.role === "FACULTY"
      ? courses
      : showAllCourses
      ? courses
      : courses.filter((c) => enrolledCourses.includes(c._id));

  const handleAddCourse = async () => {
    try {
      const newCoursePayload = {
        ...course,
      };
      const created = await client.createCourse(newCoursePayload);
      await refreshServerData();

      setCourse({
        _id: uuidv4(),
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      });
    } catch (err) {
      console.error("Failed to create course:", err);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      await refreshServerData();
    } catch (err) {
      console.error("Failed to update course:", err);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      await refreshServerData();
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await client.enrollCourseOnServer(courseId);
      await refreshServerData();
    } catch (err: any) {
      console.error("Failed to enroll:", err);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await client.unenrollCourseOnServer(courseId);
      await refreshServerData();
    } catch (err: any) {
      console.error("Failed to unenroll:", err);
    }
  };
  return (
    <div id="wd-dashboard" style={{ padding: "20px 40px" }}>
      <h1 id="wd-dashboard-title" className="mt-5 mt-md-0">
        Dashboard
      </h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update{" "}
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />

          <FormControl
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          Published Courses ({displayedCourses.length})
        </h2>
        {currentUser?.role === "STUDENT" && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
            id="wd-enrollments-button"
          >
            {showAllCourses ? "My Courses" : "Enrollments"}
          </Button>
        )}
      </div>
      <hr />

      <div id="wd-dashboard-courses" style={{ marginTop: "30px" }}>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {displayedCourses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course._id);
            return (
              <Col key={course._id} className="wd-dashboard-course">
                <Card className="h-100 shadow-sm">
                  {isEnrolled || currentUser?.role === "FACULTY" ? (
                    <Link
                      href={`/Courses/${course._id}/Home`}
                      className="text-decoration-none text-dark"
                      style={{ display: "block" }}
                    >
                      <div style={{ height: 160, overflow: "hidden" }}>
                        <Card.Img
                          src={course.image || "/images/reactjs.jpg"}
                          alt={course.name}
                          style={{ objectFit: "cover", height: "160px" }}
                        />
                      </div>
                      <Card.Body style={{ paddingBottom: "72px" }}>
                        <Card.Title
                          className="mb-1"
                          style={{ fontSize: "1rem", fontWeight: 700 }}
                        >
                          {course.number} {course.name}
                        </Card.Title>
                        <Card.Text
                          as="div"
                          style={{
                            fontSize: "0.9rem",
                            color: "#555",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {course.description}
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  ) : (
                    <div style={{ display: "block" }}>
                      <div style={{ height: 160, overflow: "hidden" }}>
                        <Card.Img
                          src={course.image || "/images/reactjs.jpg"}
                          alt={course.name}
                          style={{ objectFit: "cover", height: "160px" }}
                        />
                      </div>
                      <Card.Body style={{ paddingBottom: "72px" }}>
                        <Card.Title
                          className="mb-1"
                          style={{ fontSize: "1rem", fontWeight: 700 }}
                        >
                          {course.number} {course.name}
                        </Card.Title>
                        <Card.Text
                          as="div"
                          style={{
                            fontSize: "0.9rem",
                            color: "#555",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {course.description}
                        </Card.Text>
                      </Card.Body>
                    </div>
                  )}

                  <div
                    className="d-flex align-items-center justify-content-between p-2"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    {(isEnrolled || currentUser?.role === "FACULTY") && (
                      <Link
                        href={`/Courses/${course._id}/Home`}
                        aria-label={`Open ${course.number}`}
                        className="d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: 42,
                          height: 38,
                          borderRadius: 8,
                          background: "#fff",
                          border: "1px solid rgba(0,0,0,0.08)",
                          textDecoration: "none",
                          color: "#0d6efd",
                        }}
                      >
                        <LuNotebookPen size={18} />
                      </Link>
                    )}

                    {currentUser?.role === "FACULTY" && (
                      <div className="ms-auto d-flex gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          aria-label={`Edit ${course.number}`}
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            setCourse({ ...course });
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="d-inline-flex align-items-center gap-1"
                        >
                          <FiEdit2 size={14} />
                          <span className="d-none d-md-inline">Edit</span>
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          aria-label={`Delete ${course.number}`}
                          onClick={async (e: React.MouseEvent) => {
                            e.preventDefault();
                            await handleDeleteCourse(course._id);
                          }}
                          className="d-inline-flex align-items-center gap-1"
                        >
                          <FaTrash size={12} />
                          <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    )}

                    {currentUser?.role === "STUDENT" && (
                      <div className="ms-auto">
                        {isEnrolled ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              handleUnenroll(course._id);
                            }}
                            className="d-inline-flex align-items-center gap-1"
                            id={`wd-unenroll-${course._id}`}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              handleEnroll(course._id);
                            }}
                            className="d-inline-flex align-items-center gap-1"
                            id={`wd-enroll-${course._id}`}
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
