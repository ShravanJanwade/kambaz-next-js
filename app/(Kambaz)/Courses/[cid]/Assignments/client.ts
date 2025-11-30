import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

const ASSIGNMENTS_API = "/api/assignments";
const COURSES_API = "/api/courses";

export const fetchAllAssignments = async () => {
  const { data } = await axiosWithCredentials.get(ASSIGNMENTS_API);
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`
  );
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};

export const fetchAssignmentById = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};
