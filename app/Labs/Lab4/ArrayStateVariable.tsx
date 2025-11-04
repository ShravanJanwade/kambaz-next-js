import { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { RootState } from "./store";
import { useSelector } from "react-redux";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div
      id="wd-array-state-variables"
      className="p-3 border rounded"
      style={{ maxWidth: "250px" }}
    >
      <h5 className="mb-3">Array State Variable</h5>

      <Button variant="success" size="sm" onClick={addElement} className="mb-3">
        Add Element
      </Button>

      <ListGroup>
        {array.map((item, index) => (
          <ListGroupItem
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <span>{item}</span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteElement(index)}
            >
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
