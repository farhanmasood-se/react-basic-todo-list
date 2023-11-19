import { useState } from "react";
import "./Todo.css";

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const initialData = {
    title: "",
    date: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleEdit = (id) => {
    setEditMode(true);

    const foundTodo = findTodoById(id);

    if (foundTodo) {
      setFormData(foundTodo);
      setEditTodoId(foundTodo.id);
    } else {
      alert("Todo not found");
      resetEditForm();
    }
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editTodoId ? formData : todo
    );
    setTodos(updatedTodos);
    exitEditMode();
    setFormData(initialData);
  };

  const handleCancelEdit = () => {
    exitEditMode();
    resetEditForm();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleSubmit = (e) => {
    if (editMode) {
      handleSaveEdit();
      return;
    }

    if (formData.title !== "" && formData.date !== "") {
      e.preventDefault();
      const newTask = createNewTask();
      setTodos([...todos, newTask]);
      resetEditForm();
    } else {
      alert("Please enter title and date");
    }
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEditTodoId(null);
  };

  const resetEditForm = () => {
    setFormData(initialData);
    exitEditMode();
  };

  const findTodoById = (id) => todos.find((todo) => todo.id === id);

  const createNewTask = () => ({
    id: Math.floor(Math.random() * (100 - 1) + 1),
    title: formData.title,
    date: formData.date,
  });

  return (
    <div className="todoMainDiv">
      <h1 className="todoHeading">Todo List</h1>

      <div className="todo">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>{editMode ? "Update" : "Save"}</button>
        {editMode && <button onClick={handleCancelEdit}>Cancel</button>}{" "}
      </div>

      <div className="todoStatsTable">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.title}</td>
                <td>{todo.date}</td>
                <td className="actions">
                  <FaRegEdit
                    className="actionBtn"
                    onClick={() => handleEdit(todo.id)}
                  />
                  <MdDelete
                    className="actionBtn"
                    onClick={() => handleDelete(todo.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
