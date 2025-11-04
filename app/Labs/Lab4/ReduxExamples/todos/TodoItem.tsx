import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todoReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center justify-content-between">
      <div>{todo.title}</div>

      <div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          className="me-2"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}
