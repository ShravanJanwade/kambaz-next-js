"use client";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import { LuNotebookPen } from "react-icons/lu";
import * as db from "../Database";

export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard" style={{ padding: "20px 40px" }}>
      <h1 id="wd-dashboard-title" className="mt-5 mt-md-0">
        Dashboard
      </h1>
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" style={{ marginTop: "30px" }}>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course">
              <Card className="h-100 shadow-sm">
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image}
                    width="100%"
                    height={180}
                    style={{
                      objectFit: "cover",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    }}
                  />
                  <CardBody
                    className="position-relative"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <CardTitle className="wd-dashboard-course-title text-truncate">
                      {course.number} {course.name}
                    </CardTitle>

                    <CardText
                      className="wd-dashboard-course-description"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "0.9rem",
                        color: "#555",
                        marginBottom: "45px",
                      }}
                    >
                      {course.description}
                    </CardText>

                    <Link
                      href={`/Courses/${course._id}/Home`}
                      className="d-flex align-items-center justify-content-center position-absolute"
                      style={{
                        right: "12px",
                        bottom: "12px",
                        width: "38px",
                        height: "38px",
                        borderRadius: "8px",
                        border: "1px solid rgba(0,0,0,0.08)",
                        background: "#fff",
                        textDecoration: "none",
                        transition: "all 0.2s ease-in-out",
                      }}
                      aria-label={`Open ${course.number}`}
                    >
                      <LuNotebookPen size={20} color="#333" />
                    </Link>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
