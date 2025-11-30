"use client";

import { useState, useMemo } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTie,
  FaUserGraduate,
  FaUserShield,
  FaPlus,
} from "react-icons/fa";

type Props = {
  show: boolean;
  onClose: () => void;
  onCreate: (user: any) => void;
};

const pillRoles = [
  { value: "STUDENT", label: "Student", icon: <FaUserGraduate /> },
  { value: "TA", label: "Assistant", icon: <FaUserTie /> },
  { value: "FACULTY", label: "Faculty", icon: <FaUser /> },
  { value: "ADMIN", label: "Admin", icon: <FaUserShield /> },
];

export default function CreateUserModal({ show, onClose, onCreate }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [section, setSection] = useState("S101");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return username.trim().length > 0 && password.trim().length >= 6;
  }, [username, password]);

  function initials() {
    const f = firstName.trim().charAt(0) || "";
    const l = lastName.trim().charAt(0) || "";
    return `${f}${l}`.toUpperCase() || "U";
  }

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("STUDENT");
    setSection("S101");
    setError(null);
  };

  const submit = async () => {
    setError(null);
    if (!isValid) {
      setError("Username required and password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const newUser = {
        username,
        password,
        firstName,
        lastName,
        email,
        role,
        loginId: username,
        section,
        totalActivity: "0",
      };
      await onCreate(newUser);
      resetForm();
    } catch (err: any) {
      console.error("Create user failed:", err);
      setError(err?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        if (!submitting) {
          onClose();
          resetForm();
        }
      }}
      centered
      size="lg"
    >
      <Modal.Header
        closeButton
        style={{ borderBottom: "none", paddingBottom: 0 }}
      >
        <div
          style={{
            width: "100%",
            padding: "22px 18px 12px 18px",
            borderRadius: 10,
            background: "linear-gradient(90deg,#0d6efd22,#6f42c122)",
            boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <h5 style={{ margin: 0, fontWeight: 600 }}>Create new user</h5>
              <div style={{ color: "#6c757d", fontSize: 13, marginTop: 4 }}>
                Add a new learner or staff member. Password must be at least 6
                characters.
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  resetForm();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body style={{ paddingTop: 18 }}>
        <Row>
          <Col
            md={4}
            className="d-flex flex-column align-items-center text-center"
            style={{ borderRight: "1px solid #eee" }}
          >
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: 18,
                background: "#f7f9fb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                color: "#0d6efd",
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(13,110,253,0.06)",
                marginBottom: 12,
              }}
            >
              {initials()}
            </div>
            <div style={{ fontWeight: 600 }}>
              {firstName || "First"} {lastName || "Last"}
            </div>
            <div style={{ color: "#6c757d", fontSize: 13 }}>
              {username || "username"}
            </div>

            <div style={{ marginTop: 16, width: "100%" }}>
              <small style={{ color: "#6c757d" }}>Role</small>
              <div
                className="d-flex flex-wrap gap-2 mt-2"
                style={{ justifyContent: "center" }}
              >
                {pillRoles.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    type="button"
                    className={`btn btn-sm ${
                      r.value === role ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{
                      minWidth: 100,
                      display: "inline-flex",
                      gap: 8,
                      alignItems: "center",
                      borderRadius: 999,
                      padding: "6px 10px",
                      boxShadow:
                        r.value === role
                          ? "0 6px 18px rgba(13,110,253,0.12)"
                          : "none",
                    }}
                  >
                    <span
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      {r.icon}
                    </span>
                    <span style={{ fontSize: 13 }}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Col>

          <Col md={8}>
            <Form>
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small text-muted">
                      First name
                    </Form.Label>
                    <Form.Control
                      value={firstName}
                      placeholder="Jane"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small text-muted">
                      Last name
                    </Form.Label>
                    <Form.Control
                      value={lastName}
                      placeholder="Doe"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small text-muted">
                      Username
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>@</InputGroup.Text>
                      <Form.Control
                        value={username}
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </InputGroup>
                    <div className="text-muted small mt-1">
                      This will be used as the login ID.
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small text-muted">
                      Section
                    </Form.Label>
                    <Form.Control
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small text-muted">Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        value={email}
                        placeholder="user@example.edu"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="small text-muted">
                      Password
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        value={password}
                        placeholder="At least 6 characters"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              {error && <div className="text-danger small mb-2">{error}</div>}

              <div
                className="d-flex justify-content-end gap-2"
                style={{ marginTop: 8 }}
              >
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={submit}
                  disabled={!isValid || submitting}
                >
                  {submitting ? (
                    <>
                      <Spinner animation="border" size="sm" /> &nbsp; Creating…
                    </>
                  ) : (
                    "Create user"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
