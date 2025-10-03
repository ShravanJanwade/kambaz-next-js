import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus, FaBan } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckMark";

export default function ModulesControls() {
  return (
    <div
      id="wd-modules-controls"
      className="text-nowrap d-flex justify-content-end flex-wrap"
    >
      {/* Collapse All */}
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

      {/* View Progress */}
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

      {/* Publish / Unpublish dropdown */}
      <Dropdown className="me-2 d-none d-md-inline-block d-lg-none">
        <DropdownToggle
          variant="secondary"
          size="sm"
          id="wd-publish-all-btn-sm"
        >
          <GreenCheckmark /> Publish
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem>
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem>
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem>
            <FaBan className="text-danger me-2" /> Unpublish all modules and
            items
          </DropdownItem>
          <DropdownItem>
            <FaBan className="text-danger me-2" /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown className="me-2 d-none d-lg-inline-block">
        <DropdownToggle
          variant="secondary"
          size="lg"
          id="wd-publish-all-btn-lg"
        >
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem>
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem>
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem>
            <FaBan className="text-danger me-2" /> Unpublish all modules and
            items
          </DropdownItem>
          <DropdownItem>
            <FaBan className="text-danger me-2" /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Add Module */}
      <Button
        variant="danger"
        size="sm"
        className="me-1 d-none d-md-inline-block d-lg-none"
        id="wd-add-module-btn-sm"
      >
        <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} />
        Module
      </Button>
      <Button
        variant="danger"
        size="lg"
        className="me-1 d-none d-lg-inline-block"
        id="wd-add-module-btn-lg"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
    </div>
  );
}
