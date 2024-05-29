import React, { useCallback, useEffect, useState } from 'react';
import './modal.css';

interface IProps {
  id?: string;
  className?: string;
  header?: string;
  todo?: { id?: number; title: string; description: string; status: string };
  onCloseModal: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onSave: (data: { id?: number; title: string; description: string; status: string }) => void;
}

const ReactCustomModal: React.FC<IProps> = ({ id, className, header, todo, onCloseModal, onSave }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [status, setStatus] = useState(todo?.status || 'Backlog');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    }
  }, [todo]);

  const closeCustomModal = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    onCloseModal(e);
  }, [onCloseModal]);

  const handleSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const todoData = {
      id: todo?.id || Date.now(), // Use existing ID or generate a new one
      title,
      description,
      status
    };

    onSave(todoData);

    // Close the modal after saving
    onCloseModal(e);
  }, [title, description, status, todo?.id, onSave, onCloseModal]);

  return (
    <div id={id} className="modal">
      <div className="modal-content text-center">
        <div className="modal-header text-center">
          <span className="close" onClick={closeCustomModal}> 
            &times;
          </span>
          <span className="header-text">{header || 'Create Todo'}</span>
        </div>
        <div>
           
          <div className="row">
            <div className="col-md-6">
              <div className="label">
                <label>Title</label>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="label">
                <label>Description</label>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="label">
                <label>Status</label>
              </div>
              <div className="custom-select">
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Backlog">Backlog</option>
                  <option value="ToDo">To Do</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="label">
                <label>Actions</label>
              </div>
              <div className="todo-btn">
                <button className="save-todo" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-todo" onClick={closeCustomModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactCustomModal;
