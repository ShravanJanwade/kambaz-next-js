import React from "react";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo, updateTodo } from "./todoReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex align-items-center gap-2">
      <FormControl
        value={todo.title || ""}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter todo"
        className="flex-grow-1"
        aria-label="todo-input"
      />

      <div className="d-flex">
        <Button
          variant="warning"
          size="sm"
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
          className="me-2"
        >
          Update
        </Button>

        <Button
          variant="success"
          size="sm"
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
        >
          Add
        </Button>
      </div>
    </ListGroupItem>
  );
}
