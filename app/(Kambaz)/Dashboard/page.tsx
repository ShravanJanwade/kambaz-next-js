"use client";
import Link from "next/link";
import type React from "react";
import {
  Row,
  Col,
  Card,
  FormControl,
  Button,
  Badge,
  Container,
} from "react-bootstrap";
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
import {
  FaTrash,
  FaPlus,
  FaGraduationCap,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { BookOpen, Calendar, Users, TrendingUp } from "lucide-react";
import styles from "./dashboard.module.css";

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
    <div className={styles.dashboardWrapper}>
      <Container fluid className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>
                {currentUser?.role === "FACULTY" ? (
                  <>
                    <FaChalkboardTeacher className={styles.headerIcon} />
                    Faculty Dashboard
                  </>
                ) : (
                  <>
                    <FaGraduationCap className={styles.headerIcon} />
                    Student Dashboard
                  </>
                )}
              </h1>
              <p className={styles.subtitle}>
                Welcome back, {currentUser?.firstName || "User"}!{" "}
                {currentUser?.role === "FACULTY"
                  ? "Manage your courses"
                  : "Continue your learning journey"}
              </p>
            </div>
            {currentUser?.role === "STUDENT" && (
              <Button
                variant={showAllCourses ? "outline-primary" : "primary"}
                onClick={() => setShowAllCourses(!showAllCourses)}
                className={styles.enrollmentBtn}
                id="wd-enrollments-button"
              >
                <BookOpen size={18} className="me-2" />
                {showAllCourses ? "My Courses" : "Browse All Courses"}
              </Button>
            )}
          </div>
        </div>

        {currentUser?.role === "FACULTY" && (
          <Card className={`${styles.createCourseCard} shadow-sm mb-4`}>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className={styles.sectionTitle}>
                  <FaPlus className="me-2" />
                  Create New Course
                </h5>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    onClick={handleUpdateCourse}
                    id="wd-update-course-click"
                    className={styles.actionBtn}
                  >
                    <FiEdit2 size={16} className="me-2" />
                    Update
                  </Button>
                  <Button
                    variant="primary"
                    id="wd-add-new-course-click"
                    onClick={handleAddCourse}
                    className={styles.actionBtn}
                  >
                    <FaPlus size={14} className="me-2" />
                    Add Course
                  </Button>
                </div>
              </div>

              <Row className="g-3">
                <Col md={6}>
                  <label className={styles.formLabel}>Course Name</label>
                  <FormControl
                    value={course.name}
                    className={styles.formInput}
                    onChange={(e) =>
                      setCourse({ ...course, name: e.target.value })
                    }
                    placeholder="Enter course name"
                  />
                </Col>
                <Col md={6}>
                  <label className={styles.formLabel}>Course Number</label>
                  <FormControl
                    value={course.number}
                    className={styles.formInput}
                    onChange={(e) =>
                      setCourse({ ...course, number: e.target.value })
                    }
                    placeholder="Enter course number"
                  />
                </Col>
                <Col xs={12}>
                  <label className={styles.formLabel}>Description</label>
                  <FormControl
                    as="textarea"
                    rows={3}
                    value={course.description}
                    className={styles.formInput}
                    onChange={(e) =>
                      setCourse({ ...course, description: e.target.value })
                    }
                    placeholder="Enter course description"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        <div className={styles.coursesSection}>
          <div className={styles.coursesSectionHeader}>
            <h2 className={styles.coursesTitle}>
              <TrendingUp size={24} className="me-2" />
              {showAllCourses
                ? "All Available Courses"
                : currentUser?.role === "FACULTY"
                ? "Your Courses"
                : "Enrolled Courses"}
            </h2>
            <Badge bg="primary" className={styles.countBadge}>
              {displayedCourses.length}{" "}
              {displayedCourses.length === 1 ? "Course" : "Courses"}
            </Badge>
          </div>

          <div className={styles.coursesGrid}>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {displayedCourses.map((course) => {
                const isEnrolled = enrolledCourses.includes(course._id);
                return (
                  <Col key={course._id}>
                    <Card className={styles.courseCard}>
                      {isEnrolled || currentUser?.role === "FACULTY" ? (
                        <Link
                          href={`/Courses/${course._id}/Home`}
                          className={styles.courseLink}
                        >
                          <div className={styles.courseImageWrapper}>
                            <Card.Img
                              src={course.image || "/images/reactjs.jpg"}
                              alt={course.name}
                              className={styles.courseImage}
                            />
                            <div className={styles.courseOverlay}>
                              <span className={styles.viewCourse}>
                                View Course
                              </span>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className={styles.courseImageWrapper}>
                          <Card.Img
                            src={course.image || "/images/reactjs.jpg"}
                            alt={course.name}
                            className={styles.courseImage}
                          />
                        </div>
                      )}

                      <Card.Body className={styles.courseBody}>
                        <div className={styles.courseHeader}>
                          <Badge bg="secondary" className={styles.courseNumber}>
                            {course.number}
                          </Badge>
                          {isEnrolled && currentUser?.role === "STUDENT" && (
                            <Badge
                              bg="success"
                              className={styles.enrolledBadge}
                            >
                              Enrolled
                            </Badge>
                          )}
                        </div>

                        <Card.Title className={styles.courseTitle}>
                          {course.name}
                        </Card.Title>

                        <Card.Text className={styles.courseDescription}>
                          {course.description}
                        </Card.Text>
                      </Card.Body>

                      <div className={styles.courseFooter}>
                        {(isEnrolled || currentUser?.role === "FACULTY") && (
                          <Link
                            href={`/Courses/${course._id}/Home`}
                            aria-label={`Open ${course.number}`}
                            className={styles.openBtn}
                          >
                            <LuNotebookPen size={18} />
                          </Link>
                        )}

                        {currentUser?.role === "FACULTY" && (
                          <div className={styles.facultyActions}>
                            <Button
                              variant="warning"
                              size="sm"
                              aria-label={`Edit ${course.number}`}
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                setCourse({ ...course });
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={styles.editBtn}
                            >
                              <FiEdit2 size={14} />
                              <span className="d-none d-lg-inline ms-1">
                                Edit
                              </span>
                            </Button>

                            <Button
                              variant="danger"
                              size="sm"
                              aria-label={`Delete ${course.number}`}
                              onClick={async (e: React.MouseEvent) => {
                                e.preventDefault();
                                await handleDeleteCourse(course._id);
                              }}
                              className={styles.deleteBtn}
                            >
                              <FaTrash size={12} />
                              <span className="d-none d-lg-inline ms-1">
                                Delete
                              </span>
                            </Button>
                          </div>
                        )}

                        {currentUser?.role === "STUDENT" && (
                          <div className={styles.studentActions}>
                            {isEnrolled ? (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={(e: React.MouseEvent) => {
                                  e.preventDefault();
                                  handleUnenroll(course._id);
                                }}
                                className={styles.unenrollBtn}
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
                                className={styles.enrollBtn}
                                id={`wd-enroll-${course._id}`}
                              >
                                <FaPlus size={12} className="me-1" />
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
      </Container>
    </div>
  );
}
