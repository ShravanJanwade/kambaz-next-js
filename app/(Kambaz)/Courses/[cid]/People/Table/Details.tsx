"use client";

import { useEffect, useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import * as client from "./client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const currentUser = useSelector((s: RootState) => s.auth?.currentUser);
  const canModify = currentUser && currentUser?.role === "ADMIN";

  const fetchUser = async () => {
    if (!uid) return;
    try {
      const u = await client.findUserById(uid);
      if (!u) return;
      setUser(u);
      setName(`${u.firstName || ""} ${u.lastName || ""}`.trim());
      setEmail(u.email || "");
      setRole(u.role || "");
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid || !user) return null;

  const saveUser = async () => {
    if (!canModify) {
      alert("You do not have permission to edit users.");
      return;
    }
    const parts = name.trim().split(/\s+/);
    const firstName = parts.shift() || "";
    const lastName = parts.join(" ") || "";
    const updatedUser = { ...user, firstName, lastName, email, role };
    try {
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
      onClose();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const confirmAndDelete = async () => {
    if (!canModify) {
      alert("You do not have permission to delete users.");
      return;
    }
    const ok = confirm(
      `Delete user ${user.firstName} ${user.lastName}? This cannot be undone.`
    );
    if (!ok) return;
    try {
      await client.deleteUser(uid);
      onClose();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <>
            {user.firstName} {user.lastName}
            {canModify && (
              <Button
                size="sm"
                variant="link"
                className="ms-2"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
          </>
        )}
        {editing && canModify && (
          <FormControl
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
            className="mb-2"
          />
        )}
      </div>
      <div className="mb-2">
        <b>Roles:</b>{" "}
        {!editing ? (
          <span className="wd-roles">{user.role}</span>
        ) : (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select w-100"
            disabled={!canModify}
          >
            <option value="STUDENT">Student</option>
            <option value="TA">Assistant</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrator</option>
          </select>
        )}
      </div>
      <div className="mb-2">
        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      </div>
      <div className="mb-2">
        <b>Section:</b> <span className="wd-section">{user.section}</span>
      </div>
      <div className="mb-2">
        <b>Email:</b>{" "}
        {!editing ? (
          <span className="wd-email">{user.email}</span>
        ) : (
          <FormControl
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!canModify}
          />
        )}
      </div>
      <div className="mb-3">
        <b>Total Activity:</b>{" "}
        <span className="wd-total-activity">{user.totalActivity}</span>
      </div>
      {editing && canModify && (
        <div className="d-flex gap-2 mb-3">
          <Button onClick={saveUser} variant="primary">
            Save
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setEditing(false);
              setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
              setEmail(user.email || "");
              setRole(user.role || "");
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      <hr />
      <div className="d-flex justify-content-between">
        {canModify ? (
          <>
            <Button variant="danger" onClick={confirmAndDelete}>
              Delete
            </Button>
            {!editing && (
              <Button
                variant="secondary"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit
              </Button>
            )}
          </>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
