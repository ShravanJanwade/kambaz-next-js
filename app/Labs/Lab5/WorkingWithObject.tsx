"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: "m101",
    name: "Intro to Node & Express",
    description: "Fundamentals of building servers using Node.js and Express.",
    course: "Web Development 101",
  });

  const [newModuleName, setNewModuleName] = useState(moduleObj.name);
  const [newModuleDescription, setNewModuleDescription] = useState(
    moduleObj.description
  );
  const [newScore, setNewScore] = useState(assignment.score.toString());
  const [newCompleted, setNewCompleted] = useState(assignment.completed);

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  const enc = (s: string) => encodeURIComponent(s);

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Assignment — Retrieving</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Assignment
      </a>

      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Title
      </a>

      <hr />

      <h4>Assignment — Modifying</h4>

      <label htmlFor="wd-assignment-title" className="form-label">
        Title
      </label>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mb-3"
        href={`${ASSIGNMENT_API_URL}/title/${enc(assignment.title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Title
      </a>

      <br />

      <label htmlFor="wd-assignment-score" className="form-label">
        Score
      </label>
      <FormControl
        id="wd-assignment-score"
        className="mb-2 w-25"
        type="number"
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary mb-3"
        href={`${ASSIGNMENT_API_URL}/score/${enc(newScore)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Score
      </a>

      <br />

      <label
        htmlFor="wd-assignment-completed"
        className="form-check-label me-2"
      >
        Completed
      </label>
      <input
        id="wd-assignment-completed"
        className="form-check-input me-2"
        type="checkbox"
        checked={newCompleted}
        onChange={(e) => setNewCompleted(e.target.checked)}
      />
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/completed/${
          newCompleted ? "true" : "false"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Completed
      </a>

      <hr />
      <h4>Module — Retrieving</h4>
      <a
        id="wd-get-module"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Module
      </a>

      <a
        id="wd-get-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Module Name
      </a>

      <hr />

      <h4>Module — Modifying</h4>
      <label htmlFor="wd-module-name-input" className="form-label">
        New Module Name
      </label>
      <FormControl
        id="wd-module-name-input"
        className="mb-2 w-75"
        value={newModuleName}
        onChange={(e) => setNewModuleName(e.target.value)}
        type="text"
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary mb-3"
        href={`${MODULE_API_URL}/name/${enc(newModuleName)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Module Name
      </a>

      <br />

      <label htmlFor="wd-module-desc-input" className="form-label">
        New Module Description
      </label>
      <FormControl
        id="wd-module-desc-input"
        className="mb-2 w-75"
        value={newModuleDescription}
        onChange={(e) => setNewModuleDescription(e.target.value)}
        as="textarea"
        rows={2}
      />
      <a
        id="wd-update-module-description"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/description/${enc(newModuleDescription)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Update Module Description
      </a>

      <hr />
    </div>
  );
}
