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
  UserIcon,
  Mail,
  Calendar,
  BookOpen,
  LogOut,
  Edit2,
  Save,
  ArrowLeft,
} from "lucide-react";
import styles from "./profile.module.css";
import type { RootState } from "../../store";
import type { User as UserType } from "../reducer";
import { logout, updateUserProfile } from "../reducer";

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const emptyUser: UserType = {
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT",
    loginId: "",
    section: "",
    lastActivity: "",
    totalActivity: "",
  };

  const [formData, setFormData] = useState<UserType>(currentUser ?? emptyUser);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setFormData(currentUser);
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
    if (isSaving) return;
    setIsSaving(true);

    dispatch(updateUserProfile(formData as Partial<UserType>));
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/Account/Signin");
  };

  const handleCancel = () => {
    setFormData(currentUser);
    setIsEditing(false);
  };

  return (
    <div className={styles.page}>
      <Container className={styles.container}>
        <Link href="/Dashboard" className={styles.backLink}>
          <ArrowLeft size={18} className="me-2" />
          Back to Dashboard
        </Link>

        <div className={styles.inner}>
          {/* Header */}
          <div className={styles.hero}>
            <h1 className={styles.title}>My Profile</h1>
            <p className={styles.subtitle}>Manage your account information</p>
          </div>

          {/* Main Card */}
          <Card className={`${styles.profileCard} border-0`}>
            {/* Avatar Section */}
            <Card.Body className={`${styles.avatarSection} border-bottom`}>
              <Row className="align-items-center">
                <Col md="auto" className="text-center text-md-start">
                  <div className={styles.avatar}>
                    <UserIcon size={40} />
                  </div>
                </Col>
                <Col md className="mt-3 mt-md-0">
                  <h2 className={styles.userName}>
                    {currentUser.firstName} {currentUser.lastName}
                  </h2>
                  <p className={styles.username}>@{currentUser.username}</p>
                  <span className={styles.roleBadge}>{currentUser.role}</span>
                </Col>
              </Row>
            </Card.Body>

            {/* Form Section */}
            <Card.Body className={styles.formBody}>
              <Form>
                {/* Name Fields */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className={styles.label}>
                        <UserIcon size={16} className="me-2" />
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.firstName}
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
                      <Form.Label className={styles.label}>
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.lastName}
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
                  <Form.Label className={styles.label}>
                    <UserIcon size={16} className="me-2" />
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.username}
                    disabled
                    className={`${styles.input} ${styles.inputDisabled}`}
                  />
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-4">
                  <Form.Label className={styles.label}>
                    <Mail size={16} className="me-2" />
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </Form.Group>

                {/* Date of Birth */}
                <Form.Group className="mb-4">
                  <Form.Label className={styles.label}>
                    <Calendar size={16} className="me-2" />
                    Date of Birth
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </Form.Group>

                {/* Role Field (Read-only) */}
                <Form.Group className="mb-4">
                  <Form.Label className={styles.label}>
                    <BookOpen size={16} className="me-2" />
                    Role
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.role}
                    disabled
                    className={`${styles.input} ${styles.inputDisabled}`}
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
                    <p className={styles.infoLabel}>Login ID</p>
                    <p className={styles.infoValue}>{currentUser.loginId}</p>
                  </Col>
                  <Col md={6}>
                    <p className={styles.infoLabel}>Section</p>
                    <p className={styles.infoValue}>{currentUser.section}</p>
                  </Col>
                </Row>
              </Form>

              {/* Action Buttons */}
              <div className={`${styles.actionButtons} mt-5 pt-4 border-top`}>
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
                      className={`${styles.logoutBtn} flex-grow-1`}
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
                    <Button className={styles.cancelBtn} onClick={handleCancel}>
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
