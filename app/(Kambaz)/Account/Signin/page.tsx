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
} from "react-bootstrap";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import styles from "./signin.module.css";
import type { RootState } from "../../store";
import { clearAuthError, setAuthError, setCurrentUser } from "../reducer";
import * as client from "../client";

const DEMO_ACCOUNTS = [
  {
    role: "Faculty",
    username: "iron_man",
    password: "stark123",
    icon: "👨‍🏫",
    color: "primary",
  },
  {
    role: "Student",
    username: "dark_knight",
    password: "wayne123",
    icon: "👨‍🎓",
    color: "success",
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
        <div className={styles.inner}>
          <main className={styles.main}>
            <div className={styles.hero}>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <h1 className={styles.title}>Welcome Back</h1>
              </div>
              <p className={styles.subtitle}>
                Sign in to continue your learning journey
              </p>
            </div>

            <Card className={`${styles.formCard} shadow-lg border-0`}>
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSignIn} noValidate>
                  {error && (
                    <Alert
                      variant="danger"
                      onClose={() => dispatch(clearAuthError())}
                      dismissible
                      className="border-0 shadow-sm"
                    >
                      <strong>Error:</strong> {error}
                    </Alert>
                  )}

                  <Form.Group className="mb-4" controlId="username">
                    <Form.Label className={styles.label}>
                      <User size={16} className="me-2" />
                      Username
                    </Form.Label>
                    <div className={styles.inputWrap}>
                      <span className={styles.icon}>
                        <Mail size={18} />
                      </span>
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
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label className={styles.label}>
                      <Lock size={16} className="me-2" />
                      Password
                    </Form.Label>
                    <div className={styles.inputWrap}>
                      <span className={styles.icon}>
                        <Lock size={18} />
                      </span>
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
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    className={`${styles.submitBtn} w-100 py-3`}
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
                        <ArrowRight size={18} className="ms-2" />
                      </>
                    )}
                  </Button>
                </Form>

                <div className={styles.divider}>
                  <span className={styles.dividerText}>or</span>
                </div>

                <div className={styles.footerRow}>
                  <p className="mb-0 text-center">
                    <span className={styles.muted}>
                      {"Don't"} have an account?
                    </span>{" "}
                    <Link href="/Account/Signup" className={styles.link}>
                      Create one now
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            <Card className={`${styles.demoCard} mt-4 border-0 shadow-sm`}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h6 className={`${styles.demoTitle} mb-1`}>
                      Quick Demo Access
                    </h6>
                    <small className="text-muted">
                      Try the platform with sample credentials
                    </small>
                  </div>
                </div>

                <div className="row g-3">
                  {DEMO_ACCOUNTS.map((account) => (
                    <div key={account.username} className="col-md-6">
                      <Card
                        className={`${styles.demoAccountCard} h-100 border`}
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fs-4 me-2">{account.icon}</span>
                            <div>
                              <Badge bg={account.color} className="mb-1">
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
                            variant="outline-primary"
                            size="sm"
                            className={`${styles.useMeBtn} w-100 mt-3`}
                            onClick={() =>
                              handleUseDemoAccount(
                                account.username,
                                account.password
                              )
                            }
                            disabled={isLoading}
                          >
                            <ArrowRight size={14} className="me-1" />
                            Use This Account
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </main>
        </div>
      </Container>
    </div>
  );
}
