import { useEffect } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Header title="Todo Pro" />
        <div className="card p-6 sm:p-8 space-y-6">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
