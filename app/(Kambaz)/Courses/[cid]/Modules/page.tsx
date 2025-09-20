"use client";
import { useState } from "react";

export default function Modules() {
  const [publishMenu, setPublishMenu] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button>Collapse All</button>
        <button>View Progress</button>

        <div style={{ position: "relative" }}>
          <button onClick={() => setPublishMenu(!publishMenu)}>
            Publish All ▾
          </button>
          {publishMenu && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                margin: 0,
                padding: "8px",
                listStyle: "none",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "6px",
                zIndex: 10,
              }}
            >
              <li style={{ padding: "4px 8px", cursor: "pointer" }}>
                Publish All
              </li>
              <li style={{ padding: "4px 8px", cursor: "pointer" }}>
                Unpublish All
              </li>
            </ul>
          )}
        </div>

        <button>+ Module</button>
      </div>

      <ul id="wd-modules" style={{ listStyle: "none", padding: 0 }}>
        <li className="wd-module" style={moduleStyle}>
          <div className="wd-title">
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
          </div>
          <ul className="wd-lessons" style={lessonListStyle}>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>Introduction to the course</li>
                <li>Learn what is Web Development</li>
              </ul>
            </li>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">READING</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>Full Stack Developer – Chapter 1</li>
                <li>Full Stack Developer – Chapter 2</li>
              </ul>
            </li>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>Introduction to Web Development</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module" style={moduleStyle}>
          <div className="wd-title">Week 2, Lecture 2 - HTML Basics</div>
          <ul className="wd-lessons" style={lessonListStyle}>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>HTML Structure</li>
                <li>Headings, Paragraphs, Lists</li>
              </ul>
            </li>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">READING</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>HTML Basics - Chapter 3</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module" style={moduleStyle}>
          <div className="wd-title">Week 3, Lecture 3 - CSS Fundamentals</div>
          <ul className="wd-lessons" style={lessonListStyle}>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>Selectors and Properties</li>
                <li>Colors, Fonts, and Box Model</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module" style={moduleStyle}>
          <div className="wd-title">Week 4, Lecture 4 - Advanced CSS</div>
          <ul className="wd-lessons" style={lessonListStyle}>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>Flexbox and Grid</li>
                <li>Responsive Design</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module" style={moduleStyle}>
          <div className="wd-title">Week 5, Lecture 5 - JavaScript Basics</div>
          <ul className="wd-lessons" style={lessonListStyle}>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>Variables and Data Types</li>
                <li>Functions and Events</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module" style={moduleStyle}>
          <div className="wd-title">Week 6, Lecture 6 - DOM Manipulation</div>
          <ul className="wd-lessons" style={lessonListStyle}>
            <li className="wd-lesson" style={lessonStyle}>
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content" style={contentListStyle}>
                <li>Accessing Elements</li>
                <li>Modifying Content & Styles</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

const moduleStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "12px",
};

const lessonListStyle: React.CSSProperties = {
  listStyle: "none",
  paddingLeft: "20px",
  marginTop: "8px",
};

const lessonStyle: React.CSSProperties = {
  marginBottom: "8px",
};

const contentListStyle: React.CSSProperties = {
  listStyle: "disc",
  paddingLeft: "20px",
  marginTop: "4px",
};
