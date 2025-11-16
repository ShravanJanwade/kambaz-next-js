"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";

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
    <Container className="py-4" id="wd-working-with-objects">
      <h2 className="mb-4">Working With Objects</h2>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Assignment</h4>
            </Card.Header>
            <Card.Body>
              {/* Retrieving Section */}
              <h5 className="text-primary mb-3">Retrieving</h5>
              <ButtonGroup className="mb-4 w-100">
                <Button
                  id="wd-retrieve-assignments"
                  variant="outline-primary"
                  href={`${ASSIGNMENT_API_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Assignment
                </Button>
                <Button
                  id="wd-retrieve-assignment-title"
                  variant="outline-primary"
                  href={`${ASSIGNMENT_API_URL}/title`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Title
                </Button>
              </ButtonGroup>

              <hr />

              {/* Modifying Section */}
              <h5 className="text-primary mb-3">Modifying</h5>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assignment-title">Title</Form.Label>
                <Form.Control
                  id="wd-assignment-title"
                  value={assignment.title}
                  onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                  }
                />
                <Button
                  id="wd-update-assignment-title"
                  variant="primary"
                  size="sm"
                  className="mt-2"
                  href={`${ASSIGNMENT_API_URL}/title/${enc(assignment.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Update Title
                </Button>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assignment-score">Score</Form.Label>
                <Form.Control
                  id="wd-assignment-score"
                  type="number"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  style={{ maxWidth: "150px" }}
                />
                <Button
                  id="wd-update-assignment-score"
                  variant="primary"
                  size="sm"
                  className="mt-2"
                  href={`${ASSIGNMENT_API_URL}/score/${enc(newScore)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Update Score
                </Button>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  id="wd-assignment-completed"
                  type="checkbox"
                  label="Completed"
                  checked={newCompleted}
                  onChange={(e) => setNewCompleted(e.target.checked)}
                />
                <Button
                  id="wd-update-assignment-completed"
                  variant="primary"
                  size="sm"
                  className="mt-2"
                  href={`${ASSIGNMENT_API_URL}/completed/${
                    newCompleted ? "true" : "false"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Update Completed
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">Module</h4>
            </Card.Header>
            <Card.Body>
              {/* Retrieving Section */}
              <h5 className="text-success mb-3">Retrieving</h5>
              <ButtonGroup className="mb-4 w-100">
                <Button
                  id="wd-get-module"
                  variant="outline-success"
                  href={`${MODULE_API_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Module
                </Button>
                <Button
                  id="wd-get-module-name"
                  variant="outline-success"
                  href={`${MODULE_API_URL}/name`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Module Name
                </Button>
              </ButtonGroup>

              <hr />

              {/* Modifying Section */}
              <h5 className="text-success mb-3">Modifying</h5>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-module-name-input">
                  New Module Name
                </Form.Label>
                <Form.Control
                  id="wd-module-name-input"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  type="text"
                />
                <Button
                  id="wd-update-module-name"
                  variant="success"
                  size="sm"
                  className="mt-2"
                  href={`${MODULE_API_URL}/name/${enc(newModuleName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Update Module Name
                </Button>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-module-desc-input">
                  New Module Description
                </Form.Label>
                <Form.Control
                  id="wd-module-desc-input"
                  value={newModuleDescription}
                  onChange={(e) => setNewModuleDescription(e.target.value)}
                  as="textarea"
                  rows={3}
                />
                <Button
                  id="wd-update-module-description"
                  variant="success"
                  size="sm"
                  className="mt-2"
                  href={`${MODULE_API_URL}/description/${enc(
                    newModuleDescription
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Update Module Description
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
