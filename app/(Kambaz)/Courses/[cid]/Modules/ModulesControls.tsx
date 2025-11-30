"use client";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaBan } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckMark";
import { useState } from "react";
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      id="wd-modules-controls"
      className="text-nowrap d-flex justify-content-end flex-nowrap"
      style={{ overflow: "visible" }}
    >
      <Button
        variant="secondary"
        size="sm"
        id="wd-collapse-all-sm"
        className="me-2 d-none d-md-inline-block d-lg-none"
      >
        Collapse
      </Button>

      <Button
        variant="secondary"
        size="lg"
        id="wd-collapse-all-lg"
        className="me-2 d-none d-lg-inline-block"
      >
        Collapse All
      </Button>

      <Button
        variant="secondary"
        size="lg"
        id="wd-collapse-all-mobile"
        className="me-2 d-inline-block d-md-none float-start"
      >
        Collapse All
      </Button>

      <Button
        variant="secondary"
        size="sm"
        className="me-2 d-none d-md-inline-block d-lg-none"
        id="wd-view-progress-sm"
      >
        Progress
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-2 d-none d-lg-inline-block"
        id="wd-view-progress-lg"
      >
        View Progress
      </Button>

      <Dropdown className="me-2 d-none d-md-inline-block d-lg-none">
        <Dropdown.Toggle
          variant="secondary"
          size="sm"
          id="wd-publish-all-btn-sm"
        >
          <GreenCheckmark /> Publish
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item>
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item>
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          <Dropdown.Item>
            <FaBan className="text-danger me-2" /> Unpublish all modules and
            items
          </Dropdown.Item>
          <Dropdown.Item>
            <FaBan className="text-danger me-2" /> Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="me-2 d-none d-lg-inline-block">
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          id="wd-publish-all-btn-lg"
        >
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item>
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item>
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          <Dropdown.Item>
            <FaBan className="text-danger me-2" /> Unpublish all modules and
            items
          </Dropdown.Item>
          <Dropdown.Item>
            <FaBan className="text-danger me-2" /> Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {currentUser?.role === "FACULTY" ||
        (currentUser?.role === "ADMIN" && (
          <Button
            variant="danger"
            size="sm"
            className="me-1 d-none d-md-inline-block d-lg-none"
            id="wd-add-module-btn-sm"
            onClick={handleShow}
          >
            <FaPlus
              className="position-relative me-1"
              style={{ bottom: "1px" }}
            />
            Module
          </Button>
        ))}

      {currentUser?.role === "FACULTY" ||
        (currentUser?.role === "ADMIN" && (
          <Button
            variant="danger"
            size="lg"
            className="me-1 d-none d-lg-inline-block"
            id="wd-add-module-btn-lg"
            onClick={handleShow}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Module
          </Button>
        ))}
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
