import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: "Todo",
  initialState: {
    loading: false,
    todos: [],
    error: {},
  },
  reducers: {
    taskLoading(state, { payload }) {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    addTask(state, { payload }) {
      if (state.loading === true) {
        state.loading = false;
        state.todos.push(payload);
      }
    },
    updateTask(state, { payload }) {
      if (state.loading === true) {
        state.loading = false;
        state.todos.filter((c, i) => {
          if (c._id === payload._id) {
            state.todos[i] = payload;
          }
        });
      }
    },
    deleteTask(state, { payload }) {
      if (state.loading === true) {
        state.loading = false;
        state.todos = state.todos.filter((c, i) => c._id !== payload);
      }
    },
  },
});

export const { taskLoading, addTask, updateTask, deleteTask } =
  TodoSlice.actions;
export default TodoSlice.reducer;
