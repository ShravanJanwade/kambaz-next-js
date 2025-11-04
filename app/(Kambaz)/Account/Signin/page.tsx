"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { Mail, Lock, ArrowRight } from "lucide-react";
import styles from "./signin.module.css";
import { RootState } from "../../store";
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
    <div>
      <Container className={styles.centerContent}>
        <div>
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold mt-3">Welcome Back</h1>
            <p className="text-muted mt-2">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Form Card */}
          <Card className={`${styles.formCard} shadow-lg border-0`}>
            <Card.Body className="p-5">
              <Form onSubmit={handleSignIn}>
                {/* Error Alert */}
                {error && (
                  <Alert
                    variant="danger"
                    onClose={() => dispatch(clearAuthError())}
                    dismissible
                  >
                    {error}
                  </Alert>
                )}

                {/* Username Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">Username</Form.Label>
                  <div className={styles.inputGroup}>
                    <Mail size={18} className={styles.inputIcon} />
                    <Form.Control
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
                      className={styles.input}
                    />
                  </div>
                </Form.Group>

                {/* Password Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">Password</Form.Label>
                  <div className={styles.inputGroup}>
                    <Lock size={18} className={styles.inputIcon} />
                    <Form.Control
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
                      className={styles.input}
                    />
                  </div>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className={`${styles.submitBtn} w-100 py-3 mb-4`}
                  disabled={isLoading}
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
                      Sign In <ArrowRight size={18} className="ms-2" />
                    </>
                  )}
                </Button>
              </Form>

              {/* Sign Up Link */}
              <div className="text-center border-top pt-4">
                <p className="text-muted mb-0">
                  {"Don't"} have an account?{" "}
                  <Link href="/Account/Signup" className={styles.link}>
                    Create one
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Demo Credentials */}
          <Card className={`${styles.demoCard} mt-5 border-0`}>
            <Card.Body className="p-4">
              <p className="fw-600 mb-3">Demo Credentials:</p>
              <div className="row">
                <div className="col-md-6 mb-3 mb-md-0">
                  <small className="text-muted d-block">Faculty User</small>
                  <code className="fw-600 text-muted">iron_man / stark123</code>
                </div>
                <div className="col-md-6">
                  <small className="text-muted d-block">Student User</small>
                  <code className="fw-600 text-muted">
                    dark_knight / wayne123
                  </code>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
