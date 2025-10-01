import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

// JSON data (can also be moved to a separate file like people.json)
const people = [
  {
    firstName: "Tony",
    lastName: "Stark",
    loginId: "001234561S",
    section: "S101",
    role: "STUDENT",
    lastActivity: "2020-10-01",
    totalActivity: "10:21:32",
  },
  {
    firstName: "Bruce",
    lastName: "Wayne",
    loginId: "001234562B",
    section: "S102",
    role: "TEACHER",
    lastActivity: "2020-11-15",
    totalActivity: "25:12:45",
  },
  {
    firstName: "Steve",
    lastName: "Rogers",
    loginId: "001234563R",
    section: "S103",
    role: "STUDENT",
    lastActivity: "2020-12-05",
    totalActivity: "18:45:10",
  },
  {
    firstName: "Natasha",
    lastName: "Romanoff",
    loginId: "001234564N",
    section: "S104",
    role: "STUDENT",
    lastActivity: "2021-01-10",
    totalActivity: "12:34:56",
  },
  {
    firstName: "Peter",
    lastName: "Parker",
    loginId: "001234565P",
    section: "S105",
    role: "STUDENT",
    lastActivity: "2021-02-02",
    totalActivity: "08:15:20",
  },
  {
    firstName: "Clark",
    lastName: "Kent",
    loginId: "001234566C",
    section: "S106",
    role: "STUDENT",
    lastActivity: "2021-03-12",
    totalActivity: "14:50:33",
  },
  {
    firstName: "Diana",
    lastName: "Prince",
    loginId: "001234567D",
    section: "S107",
    role: "TEACHER",
    lastActivity: "2021-04-20",
    totalActivity: "20:10:05",
  },
];

export default function PeopleTable() {
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
          {people.map((person, index) => (
            <tr key={index}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{person.firstName}</span>{" "}
                <span className="wd-last-name">{person.lastName}</span>
              </td>
              <td className="wd-login-id">{person.loginId}</td>
              <td className="wd-section">{person.section}</td>
              <td className="wd-role">{person.role}</td>
              <td className="wd-last-activity">{person.lastActivity}</td>
              <td className="wd-total-activity">{person.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
