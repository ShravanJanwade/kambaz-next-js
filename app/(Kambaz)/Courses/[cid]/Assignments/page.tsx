import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments" style={{ padding: "15px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <input
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          style={{
            flex: 1,
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
      </div>

      <h3 id="wd-assignments-title" style={{ marginBottom: "10px" }}>
        ASSIGNMENTS <small style={{ fontWeight: "normal" }}>40% of Total</small>
        <button style={{ marginLeft: "10px" }}>+</button>
      </h3>

      <ul id="wd-assignment-list" style={{ listStyle: "none", padding: 0 }}>
        <li className="wd-assignment-list-item" style={itemStyle}>
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            <b>A1 – ENV + HTML</b>
          </Link>
          <div style={metaStyle}>
            <span>
              Multiple Modules | Not available until May 6 at 12:00 am
            </span>
            <br />
            <span>Due May 13 at 11:59 pm | 100 pts</span>
          </div>
        </li>

        <li className="wd-assignment-list-item" style={itemStyle}>
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            <b>A2 – CSS + Bootstrap</b>
          </Link>
          <div style={metaStyle}>
            <span>Multiple Modules | Available from May 13</span>
            <br />
            <span>Due May 20 at 11:59 pm | 100 pts</span>
          </div>
        </li>

        <li className="wd-assignment-list-item" style={itemStyle}>
          <Link
            href="/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            <b>A3 – JavaScript + DOM</b>
          </Link>
          <div style={metaStyle}>
            <span>Multiple Modules | Available from May 20</span>
            <br />
            <span>Due May 27 at 11:59 pm | 100 pts</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

const itemStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "10px",
  background: "#fff",
};

const metaStyle: React.CSSProperties = {
  fontSize: "0.85em",
  color: "#555",
  marginTop: "4px",
};
