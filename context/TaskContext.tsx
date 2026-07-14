import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Task } from '../types';

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
// -----------------------------------------------------------------------

interface TaskContextValue {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: string, title: string, description: string) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const useTaskContext = (): TaskContextValue => {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return ctx;
};

let nextId = 1; // simple incrementing id generator for demo purposes

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'seed-1', title: 'Buy groceries', description: 'Milk, eggs, bread', completed: false },
    { id: 'seed-2', title: 'Finish React Native assignment', description: 'Navigation + CRUD screens', completed: false },
    { id: 'seed-3', title: 'Read a book', description: '30 minutes before bed', completed: true },
  ]);

  // ---- CREATE -----------------------------------------------------------
  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${nextId++}`,
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // ---- UPDATE (edit fields) ---------------------------------------------
  const updateTask = (id: string, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: title.trim(), description: description.trim() } : task
      )
    );
  };

  // ---- UPDATE (toggle complete) ------------------------------------------
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ---- DELETE -------------------------------------------------------------
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ---- READ (helper to fetch a single task by id) --------------------------
  const getTaskById = (id: string) => tasks.find((task) => task.id === id);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, toggleComplete, deleteTask, getTaskById }}
    >
      {children}
    </TaskContext.Provider>
  );
};
