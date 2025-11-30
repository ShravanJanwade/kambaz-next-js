"use client";

import {
  Table,
  InputGroup,
  FormControl,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { FaUserCircle, FaPlus, FaSearch } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import * as client from "../../Account/client";
import PeopleDetails from "../../Courses/[cid]/People/Table/Details";
import CreateUserModal from "./CreateUserModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import * as courseClient from "../../Courses/client";

export interface User {
  _id: string | number;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email?: string;
  dob?: string;
  role: "FACULTY" | "STUDENT" | "ADMIN" | string;
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
}

export default function PeopleTable() {
  const { cid } = useParams();
  const [people, setPeople] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);

  const currentUser = useSelector((s: RootState) => s.auth?.currentUser);

  const loadPeople = async () => {
    setLoading(true);
    try {
      let data;
      if (cid) {
        data = await courseClient.findPeopleForCourse(String(cid));
      } else {
        data = await client.findAllUsers();
      }
      setPeople(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch people:", err);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, [cid]);

  const filteredPeople = useMemo(() => {
    let list = people || [];
    if (roleFilter) {
      list = list.filter(
        (u) => (u.role || "").toUpperCase() === roleFilter.toUpperCase()
      );
    }
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (u) =>
          `${u.firstName || ""} ${u.lastName || ""}`
            .toLowerCase()
            .includes(q) ||
          (u.loginId || "").toLowerCase().includes(q) ||
          (u.username || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [people, roleFilter, search]);

  const handleCloseDetails = async () => {
    setShowDetails(false);
    setSelectedUserId(null);
    await loadPeople();
  };

  const handleCreateUser = async (user: any) => {
    try {
      const created = await client.createUser(user);
      setPeople((prev) => [...prev, created]);
    } catch (err) {
      console.error("Failed to create user:", err);
      alert("Failed to create user. See console.");
    } finally {
      await loadPeople();
    }
  };

  const isAdmin = String(currentUser?.role || "").toUpperCase() === "ADMIN";

  return (
    <div>
      <Card
        className="mb-3"
        style={{ borderRadius: 8, boxShadow: "0 1px 4px rgba(20,20,30,0.04)" }}
      >
        <Card.Body
          className="d-flex align-items-center justify-content-between"
          style={{ gap: 12 }}
        >
          <div style={{ minWidth: 0 }}>
            <h4 className="mb-0" style={{ fontWeight: 600, fontSize: 18 }}>
              {cid ? "People in course" : "Users"}
            </h4>
            <div className="text-muted small" style={{ marginTop: 6 }}>
              {cid
                ? "Listing people enrolled in this course"
                : "All users in the system"}
            </div>
          </div>

          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <InputGroup style={{ width: 360, maxWidth: "55ch" }}>
              <InputGroup.Text
                style={{ background: "#f5f6f7", borderRight: 0 }}
              >
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search by name, username or login ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderLeft: 0 }}
              />
            </InputGroup>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-select"
              style={{
                width: 160,
                borderColor: "#e9ecef",
                background: "#fafbfc",
              }}
            >
              <option value="">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="TA">Assistants</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrators</option>
            </select>

            {!cid && isAdmin && (
              <Button
                variant="outline-primary"
                onClick={() => setShowCreate(true)}
                style={{ whiteSpace: "nowrap" }}
              >
                <FaPlus className="me-2" />
                New User
              </Button>
            )}

            <Badge
              bg="light"
              text="dark"
              style={{ border: "1px solid #e9ecef", padding: "0.45rem 0.6rem" }}
            >
              {filteredPeople.length} found
            </Badge>
          </div>
        </Card.Body>
      </Card>

      {showDetails && selectedUserId && (
        <PeopleDetails uid={selectedUserId} onClose={handleCloseDetails} />
      )}

      <Card
        style={{ borderRadius: 8, boxShadow: "0 1px 4px rgba(20,20,30,0.04)" }}
      >
        <Card.Body className="p-0">
          <Table
            striped
            hover
            bordered
            size="sm"
            responsive
            className="mb-0"
            style={{ borderRadius: 6 }}
          >
            <thead style={{ background: "#fafbfd" }}>
              <tr>
                <th style={{ padding: "12px 14px" }}>Name</th>
                <th style={{ padding: "12px 14px" }}>Login ID</th>
                <th style={{ padding: "12px 14px" }}>Section</th>
                <th style={{ padding: "12px 14px" }}>Role</th>
                <th style={{ padding: "12px 14px" }}>Last Activity</th>
                <th style={{ padding: "12px 14px" }}>Total Activity</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted p-4">
                    Loading...
                  </td>
                </tr>
              ) : filteredPeople.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted p-4">
                    No people found
                  </td>
                </tr>
              ) : (
                filteredPeople.map((user, index) => (
                  <tr key={user._id ?? index} style={{ background: "white" }}>
                    <td
                      className="wd-full-name text-nowrap"
                      style={{ cursor: "pointer", padding: "12px 14px" }}
                    >
                      <div
                        className="d-flex align-items-center"
                        onClick={() => {
                          setSelectedUserId(String(user._id));
                          setShowDetails(true);
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 8,
                            background: "#f6f7f8",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 12,
                            color: "#6c757d",
                          }}
                        >
                          <FaUserCircle />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="small text-muted">
                            {user.email || user.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "12px 14px" }}>
                      {user.loginId || "-"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {user.section || "-"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          borderRadius: 6,
                          background: "#f3f4f6",
                          color: "#4b5563",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "#6c757d" }}>
                      {user.lastActivity || "-"}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600 }}>
                      {user.totalActivity || "0"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <CreateUserModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
}
