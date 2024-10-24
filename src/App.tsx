import Checked from "./assets/checked.svg";
import Unchecked from "./assets/unchecked.svg";
import React from "react";
import User from "./assets/user.svg";
import Pro from "./assets/pro.svg";
import AddIcon from "./assets/add.svg";
import "./assets/css/design.css";

interface TaskProps {
  id: number;
  isCompleted: boolean;
  task: string;
  editTaskHandler?: () => void;
  toggleTaskCompleteHandler?: () => void;
}

function App() {
  const [todos, setTodos] = React.useState<TaskProps[]>([]);
  const [task, setTask] = React.useState<string>("");
  const [action, setAction] = React.useState<string>("");
  const [editId, setEditId] = React.useState<number | null>(null);

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { task, id: Date.now(), isCompleted: false }]);
      setTask("");
      setAction("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setAction("");
  };

  const editTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setTask(todo.task);
      setEditId(id);
      setAction("edit");
    }
  };

  const updateTodo = () => {
    if (editId !== null) {
      setTodos(
        todos.map((todo) => (todo.id === editId ? { ...todo, task } : todo))
      );
      setTask("");
      setEditId(null);
      setAction("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <div className="todo">
        <header className="header">
          <div className="user-info">
            <img src={User} width="50px" height="50px" alt="User" />
            <section>
              <p className="user-greeting">Hello, jhon</p>
              <p className="user-question">What are your plans for today?</p>
            </section>
          </div>
        </header>

        <div className="pro-section-container">
          <div className="pro-section">
            <img src={Pro} alt="Pro" />
            <span className="pro-text">Go Pro Upgrade Now</span>
            <span className="price-badge">$1</span>
          </div>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <Task
              key={todo.id}
              id={todo.id}
              isCompleted={todo.isCompleted}
              task={todo.task}
              editTaskHandler={() => editTodo(todo.id)}
              toggleTaskCompleteHandler={() => toggleComplete(todo.id)}
            />
          ))}

          <button className="add-button" onClick={() => setAction("create")}>
            <img src={AddIcon} alt="Add" />
          </button>
        </div>
      </div>

      {(action === "create" || action === "edit") && (
        <div className="edit-panel">
          <header className="edit-header">
            <span>Edit Task</span>
          </header>

          <div className="edit-content">
            <div className="task-input-group">
              <span className="task-input-label">Task Name</span>
              <input
                className="task-input"
                placeholder="Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>

            <div className="button-group">
              <button
                className="delete-button"
                onClick={() => editId && deleteTodo(editId)}
              >
                Delete
              </button>
              <button
                className="save-button"
                onClick={editId ? updateTodo : addTodo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Task = (props: TaskProps) => {
  return (
    <div className="task" key={props.id}>
      <img
        src={props.isCompleted ? Checked : Unchecked}
        onClick={props.toggleTaskCompleteHandler}
      />
      <p
        className={`task-text ${
          props.isCompleted ? "task-text-completed" : ""
        }`}
      >
        {props.task}
      </p>
      <button className="edit-button" onClick={props.editTaskHandler}>
        Edit
      </button>
    </div>
  );
};

export default App;
