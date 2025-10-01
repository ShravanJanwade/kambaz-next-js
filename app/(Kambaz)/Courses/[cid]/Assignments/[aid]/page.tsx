export default function AssignmentEditor() {
  return (
    <div
      id="wd-assignments-editor"
      style={{ padding: "20px", maxWidth: "800px" }}
    >
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label fw-bold">
          Assignment Name
        </label>
        <input id="wd-name" defaultValue="A1" className="form-control" />
      </div>

      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label fw-bold">
          Description
        </label>
        <div className="border rounded p-3" style={{ background: "#fafafa" }}>
          <p>
            The assignment is{" "}
            <span className="text-danger">available online</span>
          </p>
          <p>
            Submit a link to the landing page of your Web application running on
            Netlify.
          </p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>
            The Kanbas application should include a link to navigate back to the
            landing page.
          </p>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="wd-points" className="fw-bold d-block">
          Points
        </label>
        <input
          id="wd-points"
          defaultValue={100}
          className="form-control w-50"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-group" className="fw-bold d-block">
          Assignment Group
        </label>
        <select
          id="wd-group"
          defaultValue="ASSIGNMENTS"
          className="form-select w-50"
        >
          <option>ASSIGNMENTS</option>
          <option>QUIZZES</option>
          <option>EXAMS</option>
          <option>PROJECT</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="wd-display-grade-as" className="fw-bold d-block">
          Display Grade as
        </label>
        <select
          id="wd-display-grade-as"
          defaultValue="Percentage"
          className="form-select w-50"
        >
          <option>Percentage</option>
          <option>Points</option>
          <option>Complete/Incomplete</option>
          <option>Letter Grade</option>
        </select>
      </div>

      <div className="border rounded p-3 mb-4 w-75">
        <label htmlFor="wd-submission-type" className="fw-bold d-block mb-2">
          Submission Type
        </label>
        <select
          id="wd-submission-type"
          defaultValue="Online"
          className="form-select w-50 mb-3"
        >
          <option>Online</option>
          <option>On Paper</option>
          <option>External Tool</option>
        </select>

        <div>
          <div className="fw-bold mb-2">Online Entry Options</div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-text-entry"
            />
            <label className="form-check-label" htmlFor="wd-text-entry">
              Text Entry
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-website-url"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="wd-website-url">
              Website URL
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-media-recordings"
            />
            <label className="form-check-label" htmlFor="wd-media-recordings">
              Media Recordings
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-student-annotation"
            />
            <label className="form-check-label" htmlFor="wd-student-annotation">
              Student Annotation
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-file-upload"
            />
            <label className="form-check-label" htmlFor="wd-file-upload">
              File Uploads
            </label>
          </div>
        </div>
      </div>

      <div className="border rounded p-3 mb-4 w-75">
        <label className="fw-bold d-block mb-2">Assign</label>
        <div className="mb-3">
          <label htmlFor="wd-assign-to" className="fw-bold d-block">
            Assign To
          </label>
          <input
            id="wd-assign-to"
            defaultValue="Everyone"
            className="form-control w-50"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-due-date" className="fw-bold d-block">
            Due
          </label>
          <input
            type="datetime-local"
            id="wd-due-date"
            defaultValue="2024-05-13T23:59"
            className="form-control w-50"
          />
        </div>

        <div className="row g-3">
          <div className="col">
            <label htmlFor="wd-available-from" className="fw-bold d-block">
              Available from
            </label>
            <input
              type="datetime-local"
              id="wd-available-from"
              defaultValue="2024-05-06T00:00"
              className="form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="wd-available-until" className="fw-bold d-block">
              Until
            </label>
            <input
              type="datetime-local"
              id="wd-available-until"
              defaultValue="2024-05-28T23:59"
              className="form-control"
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-3 text-end">
        <button className="btn btn-light me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
