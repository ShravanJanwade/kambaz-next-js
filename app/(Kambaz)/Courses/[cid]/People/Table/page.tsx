"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import * as client from "../../../client";

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

  useEffect(() => {
    const load = async () => {
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
    load();
  }, [cid]);

  return (
    <div id="wd-people-table">
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
          ) : people.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted p-4">
                No people found
              </td>
            </tr>
          ) : (
            people.map((user: User, index) => (
              <tr key={user._id ?? index}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
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
