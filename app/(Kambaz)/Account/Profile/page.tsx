"use client";
import Link from "next/link";
import { Card, Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "28rem" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Profile</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="shravan" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              defaultValue="123"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="Shravan" placeholder="First Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="Wonderland" placeholder="Last Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="2000-01-01" type="date" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              defaultValue="shravan@gmail.com"
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select defaultValue="FACULTY">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>
          <Button href="Signin" variant="danger" className="w-100">
            Sign Out
          </Button>
        </Form>
      </Card>
    </div>
  );
}
