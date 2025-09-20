export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={containerStyle}>
      <h2 style={{ marginBottom: "10px" }}>Course Status</h2>

      {/* Publish / Unpublish */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button style={unpublishBtn}>Unpublish</button>
        <button style={publishBtn}>Publish</button>
      </div>

      {/* Action Buttons */}
      <div style={actionsStyle}>
        <button>Import Existing Content</button>
        <button>Import from Commons</button>
        <button>Choose Home Page</button>
        <button>View Course Stream</button>
        <button>New Announcement</button>
        <button>New Analytics</button>
        <button>View Course Notifications</button>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "15px",
  width: "250px",
};

const unpublishBtn: React.CSSProperties = {
  flex: 1,
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "6px",
};

const publishBtn: React.CSSProperties = {
  flex: 1,
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "6px",
};

const actionsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};
