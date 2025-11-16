"use client";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const enc = (s: string) => encodeURIComponent(s);

  return (
    <Container className="py-4" id="wd-working-with-arrays">
      <h2 className="mb-4">Working with Arrays</h2>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Retrieving Data</h5>
            </Card.Header>
            <Card.Body>
              <h6 className="text-primary mb-3">Get All Todos</h6>
              <Button
                id="wd-retrieve-todos"
                variant="primary"
                href={API}
                className="w-100 mb-4"
              >
                Get Todos
              </Button>

              <h6 className="text-primary mb-3">Get Todo by ID</h6>
              <InputGroup className="mb-3">
                <Form.Control
                  id="wd-todo-id"
                  value={todo.id}
                  placeholder="Enter Todo ID"
                  onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <Button
                  id="wd-retrieve-todo-by-id"
                  variant="primary"
                  href={`${API}/${todo.id}`}
                >
                  Get Todo
                </Button>
              </InputGroup>

              <h6 className="text-primary mb-3">Filter Todos</h6>
              <Button
                id="wd-retrieve-completed-todos"
                variant="outline-primary"
                href={`${API}?completed=true`}
                className="w-100"
              >
                Get Completed Todos
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Modifying Data</h5>
            </Card.Header>
            <Card.Body>
              <h6 className="text-success mb-3">Create New Todo</h6>
              <Button
                id="wd-create-todo"
                variant="success"
                href={`${API}/create`}
                className="w-100 mb-4"
              >
                Create Todo
              </Button>

              <h6 className="text-success mb-3">Delete Todo by ID</h6>
              <InputGroup className="mb-3">
                <Form.Control
                  value={todo.id}
                  placeholder="Enter Todo ID"
                  onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                />
                <Button
                  id="wd-remove-todo"
                  variant="danger"
                  href={`${API}/${todo.id}/delete`}
                >
                  Delete
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Update Todo</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Todo ID</Form.Label>
                    <Form.Control
                      value={todo.id}
                      onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                      placeholder="Enter Todo ID"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      value={todo.title}
                      onChange={(e) =>
                        setTodo({ ...todo, title: e.target.value })
                      }
                      placeholder="Enter title"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="info"
                href={`${API}/${todo.id}/title/${todo.title}`}
                className="mb-4 w-100"
              >
                Update Title
              </Button>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-todo-description">
                  Description
                </Form.Label>
                <Form.Control
                  id="wd-todo-description"
                  value={todo.description}
                  onChange={(e) =>
                    setTodo({ ...todo, description: e.target.value })
                  }
                  as="textarea"
                  rows={2}
                  placeholder="Enter description"
                />
                <Button
                  id="wd-update-todo-description"
                  variant="info"
                  size="sm"
                  className="mt-2"
                  href={`${API}/${todo.id}/description/${enc(
                    todo.description
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Update Description
                </Button>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  id="wd-todo-completed"
                  type="checkbox"
                  label="Completed"
                  checked={todo.completed}
                  onChange={(e) =>
                    setTodo({ ...todo, completed: e.target.checked })
                  }
                />
                <Button
                  id="wd-update-todo-completed"
                  variant="info"
                  size="sm"
                  className="mt-2"
                  href={`${API}/${todo.id}/completed/${
                    todo.completed ? "true" : "false"
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
      </Row>
    </Container>
  );
}
