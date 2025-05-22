import { useState, useEffect } from 'react';

const useTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTaskIds, setCompletedTaskIds] = useState([]);
  const [filter, setFilter] = useState('all');
  const [deletedTask, setDeletedTask] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(['tasks', 'completedTaskIds'], (result) => {
      if (result.tasks) setAllTasks(result.tasks.map(task => ({ ...task, createdAt: new Date(task.createdAt) })));
      if (result.completedTaskIds) setCompletedTaskIds(result.completedTaskIds);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ tasks: allTasks.map(task => ({ ...task, createdAt: task.createdAt.toISOString() })) });
  }, [allTasks]);

  useEffect(() => {
    chrome.storage.local.set({ completedTaskIds });
  }, [completedTaskIds]);

  const addTask = (task) => setAllTasks(prev => [...prev, task]);
  const deleteTask = (id) => {
    setDeletedTask(allTasks.find(t => t.id === id));
    setAllTasks(prev => prev.filter(task => task.id !== id));
  };
  const undoDelete = () => {
    if (deletedTask) setAllTasks(prev => [...prev, deletedTask]);
    setDeletedTask(null);
  };
  const editTask = (id, text) => setAllTasks(prev => prev.map(task => task.id === id ? { ...task, text } : task));
  const toggleComplete = (id) => setCompletedTaskIds(prev => prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]);

  return {
    allTasks,
    completedTaskIds,
    filter,
    setFilter,
    addTask,
    deleteTask,
    undoDelete,
    editTask,
    toggleComplete,
  };
};

export default useTasks;
