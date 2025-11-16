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

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Path Parameters Calculator</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="wd-path-parameter-a">
                    First Number (A)
                  </Form.Label>
                  <Form.Control
                    id="wd-path-parameter-a"
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="Enter first number"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="wd-path-parameter-b">
                    Second Number (B)
                  </Form.Label>
                  <Form.Control
                    id="wd-path-parameter-b"
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="Enter second number"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    id="wd-path-parameter-add"
                    href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
                  >
                    Add {a} + {b}
                  </Button>

                  <Button
                    variant="warning"
                    size="lg"
                    id="wd-path-parameter-subtract"
                    href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
                  >
                    Subtract {a} - {b}
                  </Button>

                  <Button
                    variant="success"
                    size="lg"
                    id="wd-path-parameter-multiply"
                    href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}
                  >
                    Multiply {a} × {b}
                  </Button>

                  <Button
                    variant="info"
                    size="lg"
                    id="wd-path-parameter-divide"
                    href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}
                  >
                    Divide {a} ÷ {b}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
