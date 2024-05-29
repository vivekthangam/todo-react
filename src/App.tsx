import { useEffect, useState } from "react";
import "./App.css";
import ReactCustomModal from "./components/modal/create-todo-modal";
import { dbWrapper } from "./lib/dbWrapperInitialization";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const showModalFn = (todo = null) => {
    setSelectedTodo(todo);
    setShowModal(!showModal);
  };

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await dbWrapper.openDatabase();
        console.log("Database initialized");

        // Getting all data from the database
        const allTodos = await dbWrapper.getAllData();
        setTodos(allTodos);
        console.log("All todos:", allTodos);
      } catch (error) {
        console.error(error);
      }
    };

    initializeDatabase();
  }, []);

  const handleSave = async (data) => {
    try {
      const todoData = {
        ...data,
        id: data.id || Date.now(), // Use an existing ID or generate a new one
      };
      await dbWrapper.putData(todoData);
      console.log("Data added or updated successfully");

      // Update the local state with the new/updated todo
      setTodos((prevTodos) => {
        const existingTodoIndex = prevTodos.findIndex(
          (todo) => todo.id === todoData.id
        );
        if (existingTodoIndex > -1) {
          const updatedTodos = [...prevTodos];
          updatedTodos[existingTodoIndex] = todoData;
          return updatedTodos;
        } else {
          return [...prevTodos, todoData];
        }
      });

      // Close the modal after saving
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dbWrapper.deleteData(id);
      console.log("Data deleted successfully");

      // Remove the todo from the local state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="todo-container">
        <div className="todo-search">
          <input type="text" />
          <button onClick={() => showModalFn(null)}>Add</button>
        </div>
        <div className="todo-list">
          {todos.map((todo) => (
            <div className="todo-item" key={todo.id}>
            
              <div className="todo-content">
                <div className="todo-title">
                  <span>{todo.title}</span>
                </div>
                <div className="todo-desc">
                  <span>{todo.description}</span>
                </div>
              </div>

              <div className="todo-status">
                
                  <span>{todo.status}</span>
                  
              </div>
              <div className="todo-btn-grp">
              <button className="btn-primary" onClick={() => showModalFn(todo)}>edit</button>
              <button className="btn-danger" onClick={() => handleDelete(todo.id)}>delete</button>
            </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <ReactCustomModal
          id={selectedTodo ? selectedTodo.id : ""}
          className=""
          header={selectedTodo ? "Edit Todo" : "Create Todo"}
          body={selectedTodo}
          onCloseModal={() => showModalFn(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default App;
