import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";


// Define a type for the slice state
interface TodoState {
  todos: ITodo[];
  todo: ITodo | null;
}

// Define the initial state using that type
const initialState: TodoState = {
  todos: [],
  todo: null,
};

export const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    setTodos: (state, { payload }: PayloadAction<ITodo[]>) => {
      state.todos = payload;
    },
    addTodo: (state, { payload }: PayloadAction<ITodo>) => {
      state.todos.push(payload);
    },
    deleteTodo: (state, { payload }: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    updateTodo: (state, { payload }: PayloadAction<ITodo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload.id ? payload : todo,
      );
    },
    toggleIsDone: (state, { payload }: PayloadAction<string>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload ? { ...todo, isDone: !todo.isDone } : todo,
      );
    },
    setTodo: (state, { payload }: PayloadAction<ITodo | null>) => {
      state.todo = payload;
    }
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleIsDone, setTodo, setTodos } =
  TodoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodo = (state: RootState) => state.todos.todo;

export default TodoSlice.reducer;
