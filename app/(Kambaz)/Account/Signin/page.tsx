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
  Badge,
  InputGroup,
} from "react-bootstrap";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
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
    color: "secondary",
  },
  {
    role: "Faculty",
    username: "iron_man",
    password: "stark123",
    icon: "👨‍🏫",
    color: "secondary",
  },
  {
    role: "Student",
    username: "dark_knight",
    password: "wayne123",
    icon: "👨‍🎓",
    color: "secondary",
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
    <div className={styles.page}>
      <Container className={styles.container}>
        <main className={styles.main}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Welcome back</h1>
              <p className={styles.subtitle}>Sign in to continue</p>
            </div>
          </div>

          <Card className={`${styles.formCard} shadow-sm border-0`}>
            <Card.Body className="p-3 p-md-4">
              <Form onSubmit={handleSignIn} noValidate>
                {error && (
                  <Alert
                    variant="danger"
                    onClose={() => dispatch(clearAuthError())}
                    dismissible
                    className="border-0"
                  >
                    <strong>Error:</strong> {error}
                  </Alert>
                )}

                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className={styles.label}>Username</Form.Label>
                  <InputGroup className={styles.inputWrap}>
                    <InputGroup.Text className={styles.iconWrap}>
                      <Mail size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      className={styles.input}
                      type="text"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                      disabled={isLoading}
                      autoComplete="username"
                      aria-label="username"
                      required
                      autoFocus
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className={styles.label}>Password</Form.Label>
                  <InputGroup className={styles.inputWrap}>
                    <InputGroup.Text className={styles.iconWrap}>
                      <Lock size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      className={styles.input}
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                      disabled={isLoading}
                      autoComplete="current-password"
                      aria-label="password"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  className={`${styles.submitBtn} w-100 py-2`}
                  disabled={isLoading}
                  aria-live="polite"
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
                      Sign In
                      <ArrowRight size={16} className="ms-2" />
                    </>
                  )}
                </Button>
              </Form>

              <div className={styles.footerRow}>
                <p className="mb-0 text-center">
                  <span className={styles.muted}>Don't have an account?</span>{" "}
                  <Link href="/Account/Signup" className={styles.link}>
                    Create one now
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>

          <Card className={`${styles.demoCard} mt-3 border-0 shadow-sm`}>
            <Card.Body className="p-2">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div>
                  <h6 className={`${styles.demoTitle} mb-0`}>Quick demo</h6>
                  <small className="text-muted">Sample credentials</small>
                </div>
              </div>

              <div className="row g-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <div key={account.username} className="col-12 col-md-4">
                    <Card className={`${styles.demoAccountCard} h-100`}>
                      <Card.Body className="p-2">
                        <div className="d-flex align-items-center mb-2">
                          <div className={styles.demoIcon}>{account.icon}</div>
                          <div>
                            <Badge bg={account.color as any} className="mb-1">
                              {account.role}
                            </Badge>
                          </div>
                        </div>

                        <div className={styles.credentialsBox}>
                          <div className="mb-1">
                            <small className={styles.demoLabel}>
                              Username:
                            </small>
                            <div className={styles.demoCred}>
                              {account.username}
                            </div>
                          </div>
                          <div>
                            <small className={styles.demoLabel}>
                              Password:
                            </small>
                            <div className={styles.demoCred}>
                              {account.password}
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className={`${styles.useMeBtn} w-100 mt-2`}
                          onClick={() =>
                            handleUseDemoAccount(
                              account.username,
                              account.password
                            )
                          }
                          disabled={isLoading}
                        >
                          <ArrowRight size={14} className="me-1" />
                          Use
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </main>
      </Container>
    </div>
  );
}
