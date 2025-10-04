"use client";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import { LuNotebookPen } from "react-icons/lu";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" style={{ padding: "20px 40px" }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" style={{ marginTop: "30px" }}>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {courses.map((course) => (
            <Col
              key={course.id}
              className="wd-dashboard-course"
              style={{ width: "350px" }}
            >
              <Card className="h-80 shadow-sm">
                <Link
                  href={`/Courses/${course.id}/Home`}
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

                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.code} {course.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "60px" }}
                    >
                      {course.description}
                    </CardText>
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Link
                        href={`/Courses/${course.id}/Home`}
                        className="d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: 44,
                          height: 36,
                          borderRadius: 8,
                          border: "1px solid rgba(0,0,0,0.08)",
                          background: "#fff",
                          textDecoration: "none",
                          gap: 6,
                          padding: "6px 8px",
                        }}
                        aria-label={`Open ${course.code}`}
                      >
                        <LuNotebookPen />
                      </Link>
                    </div>
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

const courses = [
  {
    id: "1234",
    code: "CS1234",
    title: "React JS",
    description: "Full Stack Software Developer",
    image: "/images/reactjs.jpg",
  },
  {
    id: "2345",
    code: "CS2345",
    title: "Node JS",
    description: "Backend Development",
    image: "/images/nodejs.png",
  },
  {
    id: "3456",
    code: "CS3456",
    title: "MongoDB",
    description: "NoSQL Database Systems",
    image: "/images/mongodb.jpg",
  },
  {
    id: "4567",
    code: "CS4567",
    title: "Java Programming",
    description: "Object-Oriented Programming",
    image: "/images/java.jpg",
  },
  {
    id: "5678",
    code: "CS5678",
    title: "Python",
    description: "Data Science & AI",
    image: "/images/python.png",
  },
  {
    id: "6789",
    code: "CS6789",
    title: "HTML & CSS",
    description: "Web Design & Styling",
    image: "/images/htmlcss.png",
  },
  {
    id: "7890",
    code: "CS7890",
    title: "DevOps",
    description: "CI/CD & Cloud Deployment",
    image: "/images/devops.png",
  },
  {
    id: "8901",
    code: "CS8901",
    title: "Data Structures",
    description: "Algorithms & Complexity",
    image: "/images/data-structure.png",
  },
  {
    id: "9012",
    code: "CS9012",
    title: "Cyber Security",
    description: "Security Fundamentals",
    image: "/images/cyber-security.png",
  },
];
