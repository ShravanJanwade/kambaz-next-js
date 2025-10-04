export default function AssignmentEditor() {
  return (
    <div
      id="wd-assignments-editor"
      style={{ padding: "20px", maxWidth: "800px" }}
    >
      <style>{`
        :root { --right-box-width: 540px; }

        .form-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          column-gap: 0; 
          row-gap: 12px;
          align-items: center;
        }

        .row-span > .span-full {
          grid-column: 1 / -1;
          width: 100%;
        }

        .row-label {
          text-align: right;
          font-weight: 400;
          margin: 0;
          line-height: 1.2;
        }

        .row-label.assign-left {
          text-align: left;
        }

        .row-label.label-top {
          align-self: start;
          padding-top: 6px;
          text-align: right;
        }

        .stacked-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .col-field {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .controls-box,
        .field-box {
          width: var(--right-box-width);
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.06);
          padding: 12px;
          background: #fff;
          text-align: left;
          box-sizing: border-box;
        }

        .full-span-box {
          width: 100%;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.06);
          padding: 12px;
          background: #fff;
          text-align: left;
          box-sizing: border-box;
        }

        .field-box .form-control,
        .field-box .form-select {
          width: 100%;
        }

        .compact {
          width: calc(var(--right-box-width));
          max-width: 100%;
        }

        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }
        .checkbox-list .form-check { width: 100%; }

        .two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          width: 100%;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        @media (max-width: 767.98px) {
          .form-row {
            grid-template-columns: 1fr;
            column-gap: 0;
          }
          /* default mobile alignment for labels/fields */
          .row-label { text-align: left; }
          .col-field { justify-content: flex-start; }
          .compact { width: 100%; }
          .controls-box, .field-box, .full-span-box { width: 100%; }

          /* ensure labels that are 'label-top' (Submission Type, Assign) are left-aligned on mobile */
          .row-label.label-top,
          .row-label.label-top.assign-left {
            text-align: left;
          }
        }
      `}</style>

      <div className="form-row row-span mb-3">
        <div className="span-full ">
          <div className="stacked-field">
            <label htmlFor="wd-name" className="row-label assign-left">
              Assignment Name
            </label>
            <input id="wd-name" defaultValue="A1" className="form-control" />
          </div>
        </div>
      </div>

      <div className="form-row row-span mb-3">
        <div
          className="span-full full-span-box"
          style={{ background: "#fafafa" }}
        >
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

      <div className="form-row mb-3">
        <label htmlFor="wd-points" className="row-label">
          Points
        </label>
        <div className="col-field ms-4">
          <input id="wd-points" defaultValue={100} className="form-control" />
        </div>
      </div>

      <div className="form-row mb-3">
        <label htmlFor="wd-group" className="row-label">
          Assignment Group
        </label>
        <div className="col-field">
          <select
            id="wd-group"
            defaultValue="ASSIGNMENTS"
            className="form-select ms-4"
          >
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECT</option>
          </select>
        </div>
      </div>

      <div className="form-row mb-3">
        <label htmlFor="wd-display-grade-as" className="row-label">
          Display Grade as
        </label>
        <div className="col-field">
          <select
            id="wd-display-grade-as"
            defaultValue="Percentage"
            className="form-select ms-4"
          >
            <option>Percentage</option>
            <option>Points</option>
            <option>Complete/Incomplete</option>
            <option>Letter Grade</option>
          </select>
        </div>
      </div>

      <div className="form-row row-span mb-3">
        <label className="row-label label-top">Submission Type</label>
        <div className="col-field">
          <div className="controls-box">
            <div className="mb-2">
              <select
                id="wd-submission-type"
                defaultValue="Online"
                className="form-select mb-2"
              >
                <option>Online</option>
                <option>On Paper</option>
                <option>External Tool</option>
              </select>
            </div>

            <div>
              <div className="mb-2">Online Entry Options</div>
              <div className="checkbox-list">
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
                  <label
                    className="form-check-label"
                    htmlFor="wd-media-recordings"
                  >
                    Media Recordings
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-student-annotation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-student-annotation"
                  >
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
          </div>
        </div>
      </div>

      <div className="form-row row-span mb-3">
        <label className="row-label label-top assign-left">Assign</label>
        <div className="col-field">
          <div className="controls-box">
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="d-block mb-1">
                Assign To
              </label>
              <input
                id="wd-assign-to"
                defaultValue="Everyone"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="wd-due-date" className="d-block mb-1">
                Due
              </label>
              <input
                type="datetime-local"
                id="wd-due-date"
                defaultValue="2024-05-13T23:59"
                className="form-control"
              />
            </div>

            <div className="two-cols">
              <div>
                <label htmlFor="wd-available-from" className="d-block mb-1">
                  Available from
                </label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue="2024-05-06T00:00"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="wd-available-until" className="d-block mb-1">
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
        </div>
      </div>
      <hr />
      <div className="mt-3 actions">
        <button className="btn btn-light me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
