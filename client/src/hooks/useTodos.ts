import {
  addTodo,
  deleteTodo,
  setTodos,
  toggleIsDone,
  updateTodo,
} from "../features/todoSlice";
import { useAppDispatch } from "../state/hooks";

const BASE_URL = "http://localhost:8000/api";

export const useTodos = () => {
  const dispatch = useAppDispatch();

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      dispatch(setTodos(result.data.rows));
    } catch (err) {
      console.error("fetchTodos failed:", err);
    }
  };

  interface IPostTodo {
    title: string;
    description?: string;
  }

  const postTodo = async (todo: IPostTodo) => {
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      dispatch(addTodo(result.data));
      return result;
    } catch (err) {
      console.error("postTodo failed:", err);
    }
  };

  const putTodo = async (id: string, title: string) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      dispatch(updateTodo(result.new));
    } catch (err) {
      console.error("putTodo failed:", err);
    }
  };

  const delTodo = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      if (response.status === 204) {
        // fetchTodos();
        dispatch(deleteTodo(id));
        return null;
      }
    } catch (err) {
      console.error("delTodo failed:", err);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}/toggle`, {
        method: "PATCH",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    
      dispatch(toggleIsDone(id));
    } catch (err) {
      console.error("toggleTodo failed:", err);
    }
  };

  return { fetchTodos, postTodo, putTodo, delTodo, toggleTodo };
};
