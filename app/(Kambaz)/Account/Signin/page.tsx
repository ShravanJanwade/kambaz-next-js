"use client";
import Link from "next/link";
import { Card, Form, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "24rem" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Sign In</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button href="/Dashboard" variant="primary" className="w-100 mb-3">
            Sign In
          </Button>
          <div className="text-center">
            <small>
              Don’t have an account?{" "}
              <Link href="Signup" className="text-primary">
                Sign up
              </Link>
            </small>
          </div>
        </Form>
      </Card>
    </div>
  );
}
