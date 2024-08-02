import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

// Async thunks for API calls
export const fetchTodoById = createAsyncThunk(
  "todos/fetchTodoById",
  async (id) => {
    const response = await axios.get(
      `https://claw-three.vercel.app/todos/${id}`
    );
    console.log("slice", response.data);

    return response.data;
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const response = await axios.post(
    `https://claw-three.vercel.app/todos`,
    newTodo
  );
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    const { id, ...todoData } = updatedTodo; // Extract ID and rest of the data
    const response = await axios.put(
      `https://claw-three.vercel.app/todos/${id}`,
      todoData
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`https://claw-three.vercel.app/todos/${id}`);
  return id;
});

// Create slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoById.pending, (state) => {
        state.status = "loading";
        console.log("bbb", "load");
      })
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
        // // Replace or add the fetched TODO to the state
        // const existingTodo = state.todos.find(
        //   (todo) => todo.id === action.payload.id
        // );
        // console.log("bbb", "suc", existingTodo);
        // if (existingTodo) {
        //   // Update the existing todo
        //   Object.assign(existingTodo, action.payload);
        //   console.log("bbb", "suc", existingTodo, action.payload);
        // } else {
        //   // Add the fetched todo
        //   state.todos.push(action.payload);
        //   console.log("bbb", "suc", state.todos);
        // }
      })
      .addCase(fetchTodoById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log("adda", state.todos);

        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => {
          todo.id !== action.payload;
          console.log(todo);
        });
      });
  },
});

export default todosSlice.reducer;
