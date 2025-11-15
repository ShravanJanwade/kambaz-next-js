"use client";
import { useParams, useRouter } from "next/navigation";
import type React from "react";

import { useState, useEffect } from "react";
import type { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/app/(Kambaz)/hooks";
import { addAssignment, updateAssignment } from "../reducer";
import * as client from "../client";
export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const assignments = useSelector(
    (state: RootState) => state.assignments.assignments
  );
  const assignment = assignments.find((a) => a._id == aid);
  const isNewAssignment = aid === "new";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 100,
    assignGroup: "ASSIGNMENTS",
    displayGradeAs: "Percentage",
    submissionType: "Online",
    assignTo: "Everyone",
    available: "",
    due: "",
    until: "",
    textEntry: false,
    websiteUrl: true,
    mediaRecordings: false,
    studentAnnotation: false,
    fileUpload: false,
  });

  useEffect(() => {
    if (assignment && !isNewAssignment) {
      setFormData({
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        assignGroup: "ASSIGNMENTS",
        displayGradeAs: "Percentage",
        submissionType: "Online",
        assignTo: "Everyone",
        available: assignment.available,
        due: assignment.due,
        until: assignment.until,
        textEntry: false,
        websiteUrl: true,
        mediaRecordings: false,
        studentAnnotation: false,
        fileUpload: false,
      });
    }
  }, [assignment, isNewAssignment]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value, type } = e.target as HTMLInputElement;

    const fieldMap: { [key: string]: string } = {
      "wd-name": "title",
      "wd-description": "description",
      "wd-points": "points",
      "wd-group": "assignGroup",
      "wd-display-grade-as": "displayGradeAs",
      "wd-submission-type": "submissionType",
      "wd-assign-to": "assignTo",
      "wd-due-date": "due",
      "wd-available-from": "available",
      "wd-available-until": "until",
      "wd-text-entry": "textEntry",
      "wd-website-url": "websiteUrl",
      "wd-media-recordings": "mediaRecordings",
      "wd-student-annotation": "studentAnnotation",
      "wd-file-upload": "fileUpload",
    };

    const fieldName = fieldMap[id] || id;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert("Assignment name is required");
      return;
    }

    try {
      if (isNewAssignment) {
        const newAssignmentPayload = {
          title: formData.title,
          description: formData.description,
          available: formData.available,
          due: formData.due,
          until: formData.until,
          points: formData.points,
        };
        const created = await client.createAssignmentForCourse(
          cid as string,
          newAssignmentPayload
        );
        dispatch(addAssignment(created));
      } else {
        const updatedAssignmentPayload = {
          _id: assignment!._id,
          title: formData.title,
          description: formData.description,
          course: assignment!.course,
          available: formData.available,
          due: formData.due,
          until: formData.until,
          points: formData.points,
        };
        const updated = await client.updateAssignment(updatedAssignmentPayload);
        dispatch(updateAssignment(updated));
      }

      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Failed to save assignment:", err);
      alert("Failed to save assignment. See console for details.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

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
          .row-label { text-align: left; }
          .col-field { justify-content: flex-start; }
          .compact { width: 100%; }
          .controls-box, .field-box, .full-span-box { width: 100%; }

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
            <input
              id="wd-name"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="form-row row-span mb-3">
        <div
          className="span-full full-span-box"
          style={{ background: "#fafafa" }}
        >
          <label
            htmlFor="wd-description"
            className="row-label assign-left d-block mb-2"
          >
            Description
          </label>
          <textarea
            id="wd-description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows={4}
          />
        </div>
      </div>

      <div className="form-row mb-3">
        <label htmlFor="wd-points" className="row-label">
          Points
        </label>
        <div className="col-field ms-4">
          <input
            id="wd-points"
            type="number"
            value={formData.points}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="form-row mb-3">
        <label htmlFor="wd-group" className="row-label">
          Assignment Group
        </label>
        <div className="col-field">
          <select
            id="wd-group"
            value={formData.assignGroup}
            onChange={handleChange}
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
            value={formData.displayGradeAs}
            onChange={handleChange}
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
                value={formData.submissionType}
                onChange={handleChange}
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
                    checked={formData.textEntry}
                    onChange={handleChange}
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
                    checked={formData.websiteUrl}
                    onChange={handleChange}
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
                    checked={formData.mediaRecordings}
                    onChange={handleChange}
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
                    checked={formData.studentAnnotation}
                    onChange={handleChange}
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
                    checked={formData.fileUpload}
                    onChange={handleChange}
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
                value={formData.assignTo}
                onChange={handleChange}
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
                value={formData.due}
                onChange={handleChange}
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
                  value={formData.available}
                  onChange={handleChange}
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
                  value={formData.until}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-3 actions">
        <button className="btn btn-light me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
