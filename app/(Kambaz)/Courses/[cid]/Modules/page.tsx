"use client";

import { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./LessonControlButtons";

import {
  addModule as addModuleAction,
  editModule,
  updateModule as updateModuleAction,
  deleteModule as deleteModuleAction,
  setModules,
} from "./reducer";
import type { RootState } from "../../../store";
import * as client from "../../client";

interface Lesson {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [addLessonForModule, setAddLessonForModule] = useState<string | null>(
    null
  );
  const [newLessonName, setNewLessonName] = useState("");
  const [editingLesson, setEditingLesson] = useState<{
    moduleId: string;
    lessonId: string;
  } | null>(null);
  const [editingLessonName, setEditingLessonName] = useState("");

  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules as Module[]
  );
  const dispatch = useDispatch();

  const refreshModules = async () => {
    if (!cid) return;
    try {
      const serverModules = await client.findModulesForCourse(String(cid));
      dispatch(setModules(Array.isArray(serverModules) ? serverModules : []));
    } catch (err) {
      console.error("Failed to fetch modules for course:", err);
    }
  };

  useEffect(() => {
    refreshModules();
  }, [cid]);

  const handleAddModule = async () => {
    if (!moduleName.trim() || !cid) return;
    try {
      await client.createModuleForCourse(String(cid), {
        name: moduleName.trim(),
        course: cid,
        description: "",
        lessons: [],
      });
      setModuleName("");
      await refreshModules();
    } catch (err) {
      console.error("Failed to create module:", err);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      await refreshModules();
    } catch (err) {
      console.error("Failed to delete module:", err);
    }
  };

  const saveModuleToServer = async (updatedModule: Module) => {
    dispatch(updateModuleAction(updatedModule));
    try {
      await client.updateModule(updatedModule);
      await refreshModules();
    } catch (err) {
      console.error("Failed to save module:", err);
    }
  };

  const handleAddLesson = async (moduleObj: Module) => {
    const name = newLessonName.trim();
    if (!name) return;

    const newLesson: Lesson = {
      id: uuidv4(),
      name,
      description: "",
      module: moduleObj._id,
    };

    const updatedModule: Module = {
      ...moduleObj,
      lessons: [...(moduleObj.lessons || []), newLesson],
    };

    dispatch(updateModuleAction(updatedModule));
    setNewLessonName("");
    setAddLessonForModule(null);

    try {
      await client.updateModule(updatedModule);
      await refreshModules();
    } catch (err) {
      console.error("Failed to add lesson:", err);
    }
  };

  const handleDeleteLesson = async (moduleObj: Module, lessonId: string) => {
    const updatedModule: Module = {
      ...moduleObj,
      lessons: (moduleObj.lessons || []).filter((l) => l.id !== lessonId),
    };

    dispatch(updateModuleAction(updatedModule));
    try {
      await client.updateModule(updatedModule);
      await refreshModules();
    } catch (err) {
      console.error("Failed to delete lesson:", err);
    }
  };

  const handleStartEditLesson = (moduleObj: Module, lessonId: string) => {
    const lesson = (moduleObj.lessons || []).find((l) => l.id === lessonId);
    if (!lesson) return;
    setEditingLesson({ moduleId: moduleObj._id, lessonId });
    setEditingLessonName(lesson.name);
  };

  const handleSaveEditLesson = async (moduleObj: Module, lessonId: string) => {
    const name = editingLessonName.trim();
    if (!name) return;

    const updatedModule: Module = {
      ...moduleObj,
      lessons: (moduleObj.lessons || []).map((l) =>
        l.id === lessonId ? { ...l, name } : l
      ),
    };

    dispatch(updateModuleAction(updatedModule));
    setEditingLesson(null);
    setEditingLessonName("");

    try {
      await client.updateModule(updatedModule);
      await refreshModules();
    } catch (err) {
      console.error("Failed to save edited lesson:", err);
    }
  };

  const handleFinishEditModule = async (moduleObj: Module, newName: string) => {
    const updatedModule: Module = {
      ...moduleObj,
      name: newName,
      editing: false,
    };
    await saveModuleToServer(updatedModule);
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={handleAddModule}
      />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((m) => m.course === cid)
          .map((module) => (
            <ListGroupItem
              key={module._id ?? module.name}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && (
                    <span className="fw-semibold fs-5">{module.name}</span>
                  )}

                  {module.editing && (
                    <FormControl
                      aria-label="Edit module name"
                      style={{
                        width: "420px",
                        minWidth: "240px",
                        marginLeft: 8,
                      }}
                      defaultValue={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModuleAction({
                            ...module,
                            name: e.target.value,
                          })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleFinishEditModule(
                            module,
                            (e.target as HTMLInputElement).value
                          );
                        }
                      }}
                    />
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {currentUser?.role === "FACULTY" && (
                    <ModuleControlButtons
                      moduleId={module._id}
                      isAddOpen={addLessonForModule === module._id}
                      onToggleAdd={() =>
                        setAddLessonForModule((prev) =>
                          prev === module._id ? null : module._id
                        )
                      }
                      deleteModule={(moduleId) => handleDeleteModule(moduleId)}
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
                  )}
                </div>
              </div>

              {addLessonForModule === module._id && (
                <div className="p-3 bg-light border-bottom">
                  <div className="d-flex gap-2 align-items-center">
                    <FormControl
                      placeholder="New lesson name"
                      value={newLessonName}
                      onChange={(e) => setNewLessonName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddLesson(module);
                        if (e.key === "Escape") {
                          setAddLessonForModule(null);
                          setNewLessonName("");
                        }
                      }}
                      style={{ maxWidth: 520 }}
                    />
                    <Button
                      onClick={() => handleAddLesson(module)}
                      variant="primary"
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setAddLessonForModule(null);
                        setNewLessonName("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {module.lessons && module.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson.id ?? lesson.name}
                      className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <BsGripVertical className="me-2 fs-3" />
                        {editingLesson &&
                        editingLesson.moduleId === module._id &&
                        editingLesson.lessonId === lesson.id ? (
                          <div className="d-flex gap-2 align-items-center">
                            <FormControl
                              value={editingLessonName}
                              onChange={(e) =>
                                setEditingLessonName(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleSaveEditLesson(module, lesson.id);
                                if (e.key === "Escape") setEditingLesson(null);
                              }}
                              style={{ minWidth: 220 }}
                            />
                            <Button
                              size="sm"
                              onClick={() =>
                                handleSaveEditLesson(module, lesson.id)
                              }
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => setEditingLesson(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <span>{lesson.name}</span>
                        )}
                      </div>

                      {currentUser?.role === "FACULTY" && (
                        <div>
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              variant="link"
                              id={`dropdown-${lesson.id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                                cursor: "pointer",
                              }}
                            >
                              <span style={{ fontSize: 18 }}>⋮</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  handleStartEditLesson(module, lesson.id)
                                }
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleDeleteLesson(module, lesson.id)
                                }
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
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
