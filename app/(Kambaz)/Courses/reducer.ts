import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

interface CoursesState {
  courses: Course[];
  enrolledCourses: string[]; // Array of course IDs the current user is enrolled in
}

const initialState: CoursesState = {
  courses: [],
  enrolledCourses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.courses.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    setEnrolledCourses: (state, action: PayloadAction<string[]>) => {
      state.enrolledCourses = action.payload;
    },
    enrollCourse: (state, action: PayloadAction<string>) => {
      if (!state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload);
      }
    },
    unenrollCourse: (state, action: PayloadAction<string>) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (courseId) => courseId !== action.payload
      );
    },
  },
});

export const {
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setEnrolledCourses,
  enrollCourse,
  unenrollCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
