export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" style={{ padding: "20px" }}>
      <label htmlFor="wd-name">Assignment Name</label>
      <input
        id="wd-name"
        defaultValue="A1 - ENV + HTML"
        style={{ display: "block", width: "100%", marginBottom: "15px" }}
      />

      <label htmlFor="wd-description">Description</label>
      <textarea
        defaultValue={` What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
        id="wd-description"
        rows={6}
        style={{ display: "block", width: "100%", marginBottom: "15px" }}
      />

      <table style={{ width: "100%", borderSpacing: "10px" }}>
        <thead>
          <tr>
            <td align="right">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td align="right">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
                <option>Letter Grade</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>External Tool</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right">
              <label htmlFor="wd-submission-type">Online Entry options</label>
            </td>
            <td>
              <div style={{ marginTop: "10px" }}>
                <label>
                  <input type="checkbox" id="wd-text-entry" /> Text Entry
                </label>
                <br />
                <label>
                  <input type="checkbox" id="wd-website-url" /> Website URL
                </label>
                <br />
                <label>
                  <input type="checkbox" id="wd-media-recordings" /> Media
                  Recordings
                </label>
                <br />
                <label>
                  <input type="checkbox" id="wd-student-annotation" /> Student
                  Annotation
                </label>
                <br />
                <label>
                  <input type="checkbox" id="wd-file-upload" /> File Uploads
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td align="right">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input
                type="date"
                id="wd-available-from"
                defaultValue="2024-05-06"
              />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input
                type="date"
                id="wd-available-until"
                defaultValue="2024-05-28"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button style={{ marginRight: "10px" }}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}
