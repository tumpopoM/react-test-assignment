import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Person {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  nationality: string;
}

interface PersonState {
  list: Person[];
}

const initialState: PersonState = {
  list: [],
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPersons(state, action: PayloadAction<Person[]>) {
      state.list = action.payload;
    },
    addPerson(state, action: PayloadAction<Person>) {
      state.list.push(action.payload);
    },
    updatePerson(state, action: PayloadAction<Person>) {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deletePerson(state, action: PayloadAction<string>) {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    deleteMultiple(state, action: PayloadAction<string[]>) {
      state.list = state.list.filter((p) => !action.payload.includes(p.id));
    },
    clearAll(state) {
      state.list = [];
    },
  },
});

export const {
  setPersons,
  addPerson,
  updatePerson,
  deletePerson,
  deleteMultiple,
  clearAll,
} = personSlice.actions;

export default personSlice.reducer;
