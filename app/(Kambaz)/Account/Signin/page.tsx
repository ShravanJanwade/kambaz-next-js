"use client";
import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Spinner,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import styles from "./signin.module.css";
import type { RootState } from "../../store";
import { clearAuthError, setAuthError, setCurrentUser } from "../reducer";
import * as client from "../client";

const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    username: "ada",
    password: "123",
    icon: "👑",
    color: "primary",
    label: "Administrator",
  },
  {
    role: "Faculty",
    username: "iron_man",
    password: "stark123",
    icon: "👨‍🏫",
    color: "info",
    label: "Faculty Member",
  },
  {
    role: "Student",
    username: "dark_knight",
    password: "wayne123",
    icon: "👨‍🎓",
    color: "success",
    label: "Student Account",
  },
];

export default function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      dispatch(setAuthError("Please enter both username and password"));
      return;
    }
    setIsLoading(true);
    dispatch(clearAuthError());
    try {
      const user = await client.signin(credentials);

      if (!user) {
        dispatch(setAuthError("Invalid username or password"));
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (err: any) {
      console.error("Signin failed:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to sign in. Please try again later.";
      dispatch(setAuthError(msg));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseDemoAccount = (username: string, password: string) => {
    setCredentials({ username, password });
    dispatch(clearAuthError());
  };

  return (
    <div
      className={`${styles.page} d-flex align-items-center justify-content-center py-5`}
      style={{ minHeight: "100vh", backgroundColor: "#eceff1" }}
    >
      {/* Increased max-width to accommodate the side-by-side layout */}
      <Container style={{ maxWidth: "900px" }}>
        <main className={styles.main}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Row className="g-0">
              {/* LEFT SIDE: Login Form */}
              <Col md={7} className="bg-white p-4 p-md-5">
                <div className="d-flex flex-column h-100 justify-content-center">
                  <div className="mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3"
                      style={{ width: 56, height: 56 }}
                    >
                      <User size={28} className="text-primary" />
                    </div>
                    <h2
                      className="fw-bold mb-1"
                      style={{ letterSpacing: "-0.5px" }}
                    >
                      Welcome Back
                    </h2>
                    <p className="text-muted">
                      Sign in to continue to your dashboard
                    </p>
                  </div>

                  <Form onSubmit={handleSignIn} noValidate>
                    {error && (
                      <Alert
                        variant="danger"
                        onClose={() => dispatch(clearAuthError())}
                        dismissible
                        className="border-0 shadow-sm mb-4 rounded-3"
                      >
                        <div className="d-flex align-items-center">
                          <small className="fw-semibold">{error}</small>
                        </div>
                      </Alert>
                    )}

                    {/* Username Input */}
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label
                        className="text-uppercase text-muted fw-bold"
                        style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
                      >
                        Username
                      </Form.Label>
                      <InputGroup className="border rounded-3 overflow-hidden bg-light transition-all">
                        <InputGroup.Text className="bg-light border-0 ps-3 text-secondary">
                          <Mail size={18} />
                        </InputGroup.Text>
                        <Form.Control
                          className="bg-light border-0 shadow-none ps-2 py-2 text-dark fw-medium"
                          type="text"
                          placeholder="Enter username"
                          value={credentials.username}
                          onChange={(e) =>
                            setCredentials({
                              ...credentials,
                              username: e.target.value,
                            })
                          }
                          disabled={isLoading}
                          autoComplete="username"
                          required
                          autoFocus
                          style={{ height: "48px" }}
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* Password Input */}
                    <Form.Group className="mb-4" controlId="password">
                      <Form.Label
                        className="text-uppercase text-muted fw-bold"
                        style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
                      >
                        Password
                      </Form.Label>
                      <InputGroup className="border rounded-3 overflow-hidden bg-light">
                        <InputGroup.Text className="bg-light border-0 ps-3 text-secondary">
                          <Lock size={18} />
                        </InputGroup.Text>
                        <Form.Control
                          className="bg-light border-0 shadow-none ps-2 py-2 text-dark fw-medium"
                          type="password"
                          placeholder="••••••••"
                          value={credentials.password}
                          onChange={(e) =>
                            setCredentials({
                              ...credentials,
                              password: e.target.value,
                            })
                          }
                          disabled={isLoading}
                          autoComplete="current-password"
                          required
                          style={{ height: "48px" }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 py-3 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                      disabled={isLoading}
                      style={{ letterSpacing: "0.5px" }}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            className="me-2"
                          />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In Now
                          <ArrowRight size={18} className="ms-2" />
                        </>
                      )}
                    </Button>
                  </Form>

                  <div className="mt-4 text-center">
                    <p className="mb-0 text-muted small">
                      Don't have an account?{" "}
                      <Link
                        href="/Account/Signup"
                        className="text-primary text-decoration-none fw-bold"
                      >
                        Create one here
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>

              {/* RIGHT SIDE: Demo Access Panel */}
              <Col
                md={5}
                className="bg-light p-4 p-md-5 border-start border-light"
              >
                <div className="d-flex flex-column h-100 justify-content-center">
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <ShieldCheck size={18} className="me-2" />
                      <span
                        className="small fw-bold text-uppercase"
                        style={{ letterSpacing: "1px" }}
                      >
                        Quick Access
                      </span>
                    </div>
                    <h4 className="fw-bold mb-2">Demo Accounts</h4>
                    <p className="text-muted small mb-0">
                      Select a profile below to auto-fill credentials for
                      testing.
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {DEMO_ACCOUNTS.map((account) => (
                      <Card
                        key={account.username}
                        className="border-0 shadow-sm rounded-3 overflow-hidden"
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.2s",
                        }}
                        onClick={() =>
                          handleUseDemoAccount(
                            account.username,
                            account.password
                          )
                        }
                      >
                        <div className="d-flex align-items-center p-3 bg-white hover-overlay">
                          {/* Icon Box */}
                          <div
                            className={`d-flex align-items-center justify-content-center rounded-3 bg-${account.color} bg-opacity-10 me-3`}
                            style={{ width: 48, height: 48, minWidth: 48 }}
                          >
                            <span className="fs-4">{account.icon}</span>
                          </div>

                          {/* Text Content */}
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="fw-bold mb-0 text-dark">
                                {account.role}
                              </h6>
                              <small
                                className={`text-${account.color} fw-bold`}
                              >
                                Demo
                              </small>
                            </div>
                            <small className="text-muted">
                              {account.username}
                            </small>
                          </div>

                          {/* Hover Arrow/Button */}
                          <div className="ms-2">
                            <Button
                              variant="light"
                              size="sm"
                              className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                              style={{ width: 32, height: 32 }}
                            >
                              <CheckCircle2
                                size={16}
                                className={`text-${account.color}`}
                              />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </main>
      </Container>
    </div>
  );
}
