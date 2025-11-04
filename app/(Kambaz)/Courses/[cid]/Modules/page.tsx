"use client";

import { useState } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./LessonControlButtons";

import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import type { RootState } from "../../../store";

type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module: string;
};

type ModuleItem = {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
};

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          if (!moduleName.trim() || !cid) return;
          dispatch(addModule({ name: moduleName.trim(), course: String(cid) }));
          setModuleName("");
        }}
      />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((m: ModuleItem) => m.course === cid)
          .map((module: ModuleItem) => (
            <ListGroupItem
              key={module._id ?? module.name}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      defaultValue={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                    />
                  )}
                </div>

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id ?? lesson.name}
                      className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
         
    </div>
  );
}
