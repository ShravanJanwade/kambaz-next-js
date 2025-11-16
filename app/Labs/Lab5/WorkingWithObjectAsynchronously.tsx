"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import * as client from "./Client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };

  const updateTitle = async (title: string) => {
    const updatedAssignment = await client.updateTitle(title);
    setAssignment(updatedAssignment);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <Container className="py-4" id="wd-asynchronous-objects">
      <h2 className="mb-4">Working with Objects Asynchronously</h2>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Assignment Editor</h5>
              {assignment.completed && <Badge bg="success">Completed</Badge>}
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={assignment.title || ""}
                    onChange={(e) =>
                      setAssignment({ ...assignment, title: e.target.value })
                    }
                    placeholder="Enter assignment title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={assignment.description || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        description: e.target.value,
                      })
                    }
                    as="textarea"
                    rows={3}
                    placeholder="Enter assignment description"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.due || ""}
                    onChange={(e) =>
                      setAssignment({ ...assignment, due: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="switch"
                    id="wd-completed"
                    label="Completed"
                    checked={assignment.completed || false}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        completed: e.target.checked,
                      })
                    }
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => updateTitle(assignment.title)}
                  >
                    Update Title
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-secondary text-white">
              <h5 className="mb-0">Assignment Object (JSON)</h5>
            </Card.Header>
            <Card.Body>
              <div className="bg-light p-3 rounded border">
                <pre
                  className="mb-0"
                  style={{ maxHeight: "400px", overflow: "auto" }}
                >
                  <code>{JSON.stringify(assignment, null, 2)}</code>
                </pre>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
