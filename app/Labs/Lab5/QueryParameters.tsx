"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  const buildHref = (op: string) =>
    `${HTTP_SERVER}/lab5/calculator?operation=${encodeURIComponent(
      op
    )}&a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;

  return (
    <Container className="py-4" id="wd-query-parameters">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h3 className="mb-0">Query Parameters Calculator</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="wd-query-parameter-a">
                    First Number (A)
                  </Form.Label>
                  <Form.Control
                    id="wd-query-parameter-a"
                    value={a}
                    type="number"
                    onChange={(e) => setA(e.target.value)}
                    placeholder="Enter first number"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="wd-query-parameter-b">
                    Second Number (B)
                  </Form.Label>
                  <Form.Control
                    id="wd-query-parameter-b"
                    value={b}
                    type="number"
                    onChange={(e) => setB(e.target.value)}
                    placeholder="Enter second number"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    id="wd-query-parameter-add"
                    href={buildHref("add")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add {a} + {b}
                  </Button>

                  <Button
                    variant="warning"
                    size="lg"
                    id="wd-query-parameter-subtract"
                    href={buildHref("subtract")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subtract {a} - {b}
                  </Button>

                  <Button
                    variant="success"
                    size="lg"
                    id="wd-query-parameter-multiply"
                    href={buildHref("multiply")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Multiply {a} × {b}
                  </Button>

                  <Button
                    variant="info"
                    size="lg"
                    id="wd-query-parameter-divide"
                    href={buildHref("divide")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Divide {a} ÷ {b}
                  </Button>
                </div>
              </Form>

              <Alert variant="secondary" className="mt-4 mb-0">
                <small>
                  <strong>Server:</strong> <code>{HTTP_SERVER}</code>
                </small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
