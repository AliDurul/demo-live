import React from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  selectTodo,
  setTodo,
} from "../features/todoSlice";
import { useTodos } from "../hooks/useTodos";

export default function TodoForm() {
  const { postTodo, putTodo } = useTodos();

  const todo = useAppSelector(selectTodo);
  // console.log(todo);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.currentTarget[0] as HTMLInputElement).value;

    // validation for empty title
    if (!title.trim()) {
      alert("Please enter a valid todo title.");
      return;
    }

    if (!todo) {
      postTodo({ title });
    } else {
      putTodo(todo.id, title);
      dispatch(setTodo(null));
    }

    // reset the form after submission
    e.currentTarget.reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative grow">
          <input
            defaultValue={todo?.title}
            type="text"
            placeholder="What needs to be done?"
            className="input pr-10"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className={`btn ${todo ? "btn-success" : "btn-primary"} flex-grow sm:flex-none px-6`}
          >
            {todo ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Update
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Task
              </>
            )}
          </button>
          {todo && (
            <button
              type="button"
              onClick={() => dispatch(setTodo(null))}
              className="btn btn-secondary"
              title="Cancel editing"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
