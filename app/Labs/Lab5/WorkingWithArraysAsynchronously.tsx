"use client";
import React, { useState, useEffect } from "react";
import * as client from "./Client";
import {
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  Alert,
  Badge,
  ButtonGroup,
} from "react-bootstrap";
import { FaPlusCircle, FaTrash, FaPencilAlt, FaCheck } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };

  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };

  const createNewTodo = async () => {
    const todos = await client.createNewTodo();
    setTodos(todos);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container className="py-4" id="wd-asynchronous-arrays">
      <h2 className="mb-4">Working with Arrays Asynchronously</h2>

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">Todo List</h5>
            <small>
              {todos.length} {todos.length === 1 ? "item" : "items"}
            </small>
          </div>
          <ButtonGroup>
            <Button
              variant="success"
              size="sm"
              onClick={createNewTodo}
              title="Create New Todo (GET)"
            >
              <FaPlusCircle className="me-1" />
              Create (GET)
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={postNewTodo}
              id="wd-post-todo"
              title="Post New Todo"
            >
              <FaPlusCircle className="me-1" />
              Post (POST)
            </Button>
          </ButtonGroup>
        </Card.Header>

        <Card.Body className="p-0">
          {errorMessage && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setErrorMessage(null)}
              className="m-3 mb-0"
              id="wd-todo-error-message"
            >
              <strong>Error:</strong> {errorMessage}
            </Alert>
          )}

          {todos.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p className="mb-0">
                No todos yet. Click the button above to create one!
              </p>
            </div>
          ) : (
            <ListGroup variant="flush">
              {todos.map((todo) => (
                <ListGroup.Item
                  key={todo.id}
                  className="d-flex align-items-center py-3"
                >
                  <Form.Check
                    type="checkbox"
                    className="me-3"
                    checked={todo.completed}
                    onChange={(e) =>
                      updateTodo({ ...todo, completed: e.target.checked })
                    }
                  />

                  <div className="flex-grow-1">
                    {!todo.editing ? (
                      <span
                        className={
                          todo.completed
                            ? "text-decoration-line-through text-muted"
                            : ""
                        }
                      >
                        {todo.title}
                      </span>
                    ) : (
                      <Form.Control
                        value={todo.title}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateTodo({ ...todo, editing: false });
                          }
                        }}
                        onChange={(e) =>
                          updateTodo({ ...todo, title: e.target.value })
                        }
                        onBlur={() => updateTodo({ ...todo, editing: false })}
                      />
                    )}
                  </div>

                  {todo.completed && (
                    <Badge bg="success" className="me-2">
                      <FaCheck className="me-1" />
                      Done
                    </Badge>
                  )}

                  <ButtonGroup size="sm">
                    {!todo.editing ? (
                      <Button
                        variant="outline-primary"
                        onClick={() => editTodo(todo)}
                        title="Edit todo"
                      >
                        <FaPencilAlt />
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => updateTodo({ ...todo, editing: false })}
                        title="Save changes"
                      >
                        <FaCheck />
                      </Button>
                    )}

                    <Button
                      variant="outline-warning"
                      onClick={() => removeTodo(todo)}
                      id="wd-remove-todo"
                      title="Remove todo (GET)"
                    >
                      <FaTrash />
                    </Button>

                    <Button
                      variant="outline-danger"
                      onClick={() => deleteTodo(todo)}
                      id="wd-delete-todo"
                      title="Delete todo (DELETE)"
                    >
                      <TiDelete className="fs-5" />
                    </Button>
                  </ButtonGroup>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
