"use client";

import { Table, FormControl } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import * as client from "../../../client";
import PeopleDetails from "./Details";

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

  const loadPeople = async () => {
    if (!cid) return;
    setLoading(true);
    try {
      const data = await client.findPeopleForCourse(String(cid));
      setPeople(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch people for course:", err);
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
          (u.username || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [people, roleFilter, search]);

  const handleCloseDetails = async () => {
    setShowDetails(false);
    setSelectedUserId(null);
    await loadPeople();
  };

  return (
    <div id="wd-people-table">
      <div className="d-flex gap-2 mb-3 align-items-start">
        <FormControl
          placeholder="Search people by name, login ID or username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-25"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="form-select w-25"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      {showDetails && selectedUserId && (
        <PeopleDetails uid={selectedUserId} onClose={handleCloseDetails} />
      )}

      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
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
              <tr key={user._id ?? index}>
                <td
                  className="wd-full-name text-nowrap"
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="d-flex align-items-center"
                    onClick={() => {
                      setSelectedUserId(String(user._id));
                      setShowDetails(true);
                    }}
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
