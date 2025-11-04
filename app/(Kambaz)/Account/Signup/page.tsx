"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { User, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import styles from "./signup.module.css";
import { users } from "../../Database";
import { setCurrentUser } from "../reducer";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (users.some((u) => u.username === formData.username)) {
      setError("Username already exists");
      return;
    }

    setIsLoading(true);

    const newUser = {
      _id: uuidv4(),
      username: formData.username,
      password: formData.password,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: "",
      role: "STUDENT" as const,
      loginId: `USER${Date.now()}`,
      section: "S101",
      lastActivity: new Date().toISOString(),
      totalActivity: "0:00:00",
    };

    users.push(newUser);
    dispatch(setCurrentUser(newUser));
    router.push("/Dashboard");
    setIsLoading(false);
  };

  return (
    <div>
      <Container className={styles.centerContent}>
        <div className={styles.centerContent}>
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold mt-3">Get Started</h1>
            <p className="text-muted mt-2">
              Join our community and start learning today
            </p>
          </div>

          {/* Form Card */}
          <Card className={`${styles.formCard} shadow-lg border-0`}>
            <Card.Body className="p-5">
              <Form onSubmit={handleSignUp}>
                {/* Error Alert */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Name Inputs */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-600">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={isLoading}
                        className={styles.input}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-600">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        disabled={isLoading}
                        className={styles.input}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Username Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">Username</Form.Label>
                  <div className={styles.inputGroup}>
                    <User size={18} className={styles.inputIcon} />
                    <Form.Control
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      disabled={isLoading}
                      className={styles.input}
                    />
                  </div>
                </Form.Group>

                {/* Email Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">Email</Form.Label>
                  <div className={styles.inputGroup}>
                    <Mail size={18} className={styles.inputIcon} />
                    <Form.Control
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
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
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      disabled={isLoading}
                      className={styles.input}
                    />
                  </div>
                </Form.Group>

                {/* Confirm Password Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">Confirm Password</Form.Label>
                  <div className={styles.inputGroup}>
                    <Lock size={18} className={styles.inputIcon} />
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account <ArrowRight size={18} className="ms-2" />
                    </>
                  )}
                </Button>
              </Form>

              {/* Sign In Link */}
              <div className="text-center border-top pt-4">
                <p className="text-muted mb-0">
                  Already have an account?{" "}
                  <Link href="/Account/Signin" className={styles.link}>
                    Sign in
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
