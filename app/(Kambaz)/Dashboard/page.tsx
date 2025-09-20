import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" style={{ padding: "20px", display: "flex" }}>
      <div style={{ flex: "0 0 70%" }}>
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />

        <h2 id="wd-dashboard-published">Published Courses (7)</h2>
        <hr />

        <div
          id="wd-dashboard-courses"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="wd-dashboard-course"
              style={cardStyle}
            >
              <Link
                href={`/Courses/${course.id}`}
                className="wd-dashboard-course-link"
              >
                <Image
                  src={course.image}
                  width={300}
                  height={180}
                  alt={course.title}
                  style={{
                    borderRadius: "6px",
                    width: "100%",
                    height: "60%",
                    objectFit: "cover",
                  }}
                />
                <div style={{ marginTop: "6px", textAlign: "center" }}>
                  <h5 style={{ margin: "4px 0" }}>
                    {course.code} {course.title}
                  </h5>
                  <p
                    className="wd-dashboard-course-title"
                    style={{ fontSize: "0.9rem", color: "#555" }}
                  >
                    {course.description}
                  </p>
                  <button
                    style={{
                      marginTop: "6px",
                      padding: "6px 12px",
                      fontSize: "0.85rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  >
                    Go
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: "0 0 30%" }}></div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#fff",
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

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
];
