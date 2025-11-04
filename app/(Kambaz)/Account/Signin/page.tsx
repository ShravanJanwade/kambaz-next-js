"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { Mail, Lock, ArrowRight } from "lucide-react";
import styles from "./signin.module.css";
import type { RootState } from "../../store";
import { clearAuthError, setAuthError, setCurrentUser } from "../reducer";
import { users } from "../../Database";

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
    setIsLoading(true);
    dispatch(clearAuthError());

    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      dispatch(setAuthError("Invalid username or password"));
      setIsLoading(false);
      return;
    }

    dispatch(setCurrentUser(user));
    router.push("/Dashboard");
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <Container className={styles.container}>
        <div className={styles.inner}>
          <main className={styles.main}>
            <div className={styles.hero}>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>
                Sign in to continue your learning journey
              </p>
            </div>

            <Card className={`${styles.formCard} shadow-sm border-0`}>
              <Card.Body className="p-4">
                <Form onSubmit={handleSignIn} noValidate>
                  {error && (
                    <Alert
                      variant="danger"
                      onClose={() => dispatch(clearAuthError())}
                      dismissible
                    >
                      {error}
                    </Alert>
                  )}

                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className={styles.label}>Username</Form.Label>
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
                    <Form.Label className={styles.label}>Password</Form.Label>
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
                  <p className="mb-0">
                    <span className={styles.muted}>Don't have an account?</span>{" "}
                    <Link href="/Account/Signup" className={styles.link}>
                      Create one
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            <Card className={`${styles.demoCard} mt-4 border-0`}>
              <Card.Body className="p-3">
                <p className={`${styles.demoTitle} mb-2`}>Demo Credentials</p>
                <div className="row">
                  <div className="col-6">
                    <small className={styles.demoLabel}>Faculty</small>
                    <div className={styles.demoCred}>iron_man / stark123</div>
                  </div>
                  <div className="col-6">
                    <small className={styles.demoLabel}>Student</small>
                    <div className={styles.demoCred}>
                      dark_knight / wayne123
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </main>
        </div>
      </Container>
    </div>
  );
}
