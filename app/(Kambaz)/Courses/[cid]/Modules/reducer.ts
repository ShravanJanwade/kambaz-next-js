"use client";

import { createSlice } from "@reduxjs/toolkit";
import { modules as seedModules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: seedModules as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      { payload: module }: { payload: { name: string; course: string } }
    ) => {
      const newModule = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
        editing: false,
      } as any;
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }: { payload: any }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
