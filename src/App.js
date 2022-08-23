import React from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Pilates at 11am", done: false },
    { id: 2, text: "Lunch with Sydney at 2pm", done: false },
    { id: 3, text: "Pick up mike from doggy hotel", done: false }
  ]);

  return (
    <div>
      <div className="container">
        <h1>To do List</h1>
        <div className="list">
          <TodoList setTodos={setTodos} todos={todos} />
        </div>
        <div className="enter">
          <AddTodo setTodos={setTodos} />
        </div>
      </div>
      <div className="author">
        {" "}
        Designed and Coded by:
        <br />
        <a href="https://codepen.io/aswizle444" target="_blank">
          Alyssa Gordon
        </a>
      </div>
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span
      className="delete"
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "#6A8D73",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      x
    </span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input
        className="input"
        ref={inputRef}
        name="addTodo"
        placeholder="enter to do here"
      />
      <button className="button" type="submit">
        Add
      </button>
    </form>
  );
}
