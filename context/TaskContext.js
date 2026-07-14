import React, { createContext, useState, useContext } from 'react';

// -----------------------------------------------------------------------
// TaskContext
// -----------------------------------------------------------------------
// This is a small React Context used ONLY to pass task data + CRUD
// functions between the List screen and the Add/Edit screen without
// prop-drilling through navigation params.
//
// NOTE: This is NOT the "State Management" project requirement (that
// calls for Context/Redux as a taught pattern across the whole app).
// Here it's just a lightweight local data layer since this build only
// covers the Navigation + CRUD requirements, with no backend attached.
// Every task lives in memory (useState) and resets when the app reloads.
//
// Shape of a task object (for reference, since there are no types here):
//   { id: string, title: string, description: string, completed: boolean }
// -----------------------------------------------------------------------

const TaskContext = createContext(undefined);

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return ctx;
};

let nextId = 1; // simple incrementing id generator for demo purposes

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 'seed-1', title: 'Buy groceries', description: 'Milk, eggs, bread', completed: false },
    { id: 'seed-2', title: 'Finish React Native assignment', description: 'Navigation + CRUD screens', completed: false },
    { id: 'seed-3', title: 'Read a book', description: '30 minutes before bed', completed: true },
  ]);

  // ---- CREATE -----------------------------------------------------------
  const addTask = (title, description) => {
    const newTask = {
      id: `task-${Date.now()}-${nextId++}`,
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // ---- UPDATE (edit fields) ---------------------------------------------
  const updateTask = (id, title, description) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: title.trim(), description: description.trim() } : task
      )
    );
  };

  // ---- UPDATE (toggle complete) ------------------------------------------
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ---- DELETE -------------------------------------------------------------
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ---- READ (helper to fetch a single task by id) --------------------------
  const getTaskById = (id) => tasks.find((task) => task.id === id);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, toggleComplete, deleteTask, getTaskById }}
    >
      {children}
    </TaskContext.Provider>
  );
};
