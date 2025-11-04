"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  LogOut,
  Edit2,
  Save,
} from "lucide-react";
import styles from "./profile.module.css";
import { RootState } from "../../store";
import { logout, updateUserProfile } from "../reducer";

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaving(true);
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/Account/signin");
  };

  const handleCancel = () => {
    setFormData(currentUser);
    setIsEditing(false);
  };

  return (
    <div>
      <Container className={styles.centerContent}>
        <Link href="/dashboard" className={styles.backLink}>
          ← Back to Dashboard
        </Link>

        <div className="mt-5">
          {/* Header */}
          <div className="mb-5">
            <h1 className="display-4 fw-bold">My Profile</h1>
            <p className="text-muted">Manage your account information</p>
          </div>

          {/* Main Card */}
          <Card className={`${styles.profileCard} shadow-lg border-0`}>
            {/* Avatar Section */}
            <Card.Body className={`${styles.avatarSection} p-5 border-bottom`}>
              <Row className="align-items-center">
                <Col md="auto" className="text-center text-md-start">
                  <div className={styles.avatar}>
                    <User size={40} />
                  </div>
                </Col>
                <Col md className="mt-3 mt-md-0">
                  <h2 className="h3 fw-bold mb-1">
                    {currentUser.firstName} {currentUser.lastName}
                  </h2>
                  <p className="text-muted mb-2">@{currentUser.username}</p>
                  <span className={`badge ${styles.roleBadge}`}>
                    {currentUser.role}
                  </span>
                </Col>
              </Row>
            </Card.Body>

            {/* Form Section */}
            <Card.Body className="p-5">
              <Form>
                {/* Name Fields */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-600">
                        <User size={16} className="me-2" />
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.firstName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={styles.input}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-600">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.lastName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        disabled={!isEditing}
                        className={styles.input}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Username Field (Read-only) */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">
                    <User size={16} className="me-2" />
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.username || ""}
                    disabled
                    className={`${styles.input} bg-light`}
                  />
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">
                    <Mail size={16} className="me-2" />
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </Form.Group>

                {/* Date of Birth */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">
                    <Calendar size={16} className="me-2" />
                    Date of Birth
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dob || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </Form.Group>

                {/* Role Field (Read-only) */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-600">
                    <BookOpen size={16} className="me-2" />
                    Role
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.role || "STUDENT"}
                    disabled
                    className={`${styles.input} bg-light`}
                  >
                    <option>STUDENT</option>
                    <option>FACULTY</option>
                    <option>TA</option>
                    <option>ADMIN</option>
                  </Form.Control>
                </Form.Group>

                {/* Additional Info */}
                <Row className="mb-4 pt-4 border-top">
                  <Col md={6}>
                    <p className="text-muted small mb-1">Login ID</p>
                    <p className="fw-600 font-monospace">
                      {currentUser.loginId}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p className="text-muted small mb-1">Section</p>
                    <p className="fw-600">{currentUser.section}</p>
                  </Col>
                </Row>
              </Form>

              {/* Action Buttons */}
              <div className="d-flex gap-2 mt-5 pt-4 border-top">
                {!isEditing ? (
                  <>
                    <Button
                      className={`${styles.editBtn} flex-grow-1`}
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 size={18} className="me-2" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="flex-grow-1"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} className="me-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={`${styles.saveBtn} flex-grow-1`}
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            className="me-2"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} className="me-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="flex-grow-1"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
