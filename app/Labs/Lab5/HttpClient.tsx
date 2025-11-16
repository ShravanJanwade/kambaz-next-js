"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import * as client from "./Client";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };
  const fetchWelcomeOnLoad = async () => {
    const welcome = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(welcome);
  };
  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4">HTTP Client</h2>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Requesting on Click</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-3">
                Click the button below to fetch a welcome message from the
                server.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-3"
                onClick={fetchWelcomeOnClick}
              >
                Fetch Welcome
              </Button>

              {welcomeOnClick && (
                <Alert variant="success" className="mb-0">
                  <strong>Response from server:</strong>
                  <br />
                  <span className="fs-5">{welcomeOnClick}</span>
                </Alert>
              )}

              {!welcomeOnClick && (
                <Alert variant="light" className="mb-0 text-center">
                  <em>No response yet. Click the button to fetch data.</em>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Requesting on Load</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-3">
                This message is automatically fetched when the page loads.
              </p>

              {welcomeOnLoad ? (
                <Alert variant="success" className="mb-0">
                  <strong>Response from server:</strong>
                  <br />
                  <span className="fs-5">{welcomeOnLoad}</span>
                </Alert>
              ) : (
                <Alert variant="info" className="mb-0 text-center">
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Loading...
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
