"use client"; // Required for useState and useEffect

import { useState, useEffect } from 'react';
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react'; // Import icons

// Define priority levels
type Priority = 'Low' | 'Medium' | 'High';

// Define the structure of a task
interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string | null; // Store as ISO string (YYYY-MM-DD) or null
  priority: Priority | null;
}

// Helper function to get numerical priority value
const getPriorityValue = (priority: Priority | null): number => {
  switch (priority) {
    case 'High': return 3;
    case 'Medium': return 2;
    case 'Low': return 1;
    default: return 0; // Treat null/None as lowest
  }
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // State for inline editing
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState<string>(''); // Keep as string for input binding
  const [editPriority, setEditPriority] = useState<Priority | ''>(''); // Allow empty string for 'None'

  // --- NEW: State for sorting ---
  const [sortKey, setSortKey] = useState<'id' | 'dueDate' | 'priority'>('id'); // Default sort by creation (id)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Default ascending
  // --- END NEW ---

  // Load tasks from Local Storage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      // Ensure loaded tasks have all properties, providing defaults if missing
      const loadedTasks = JSON.parse(storedTasks).map((task: any) => ({
        id: task.id,
        text: task.text,
        completed: task.completed || false,
        dueDate: task.dueDate || null,
        priority: task.priority || null,
      }));
      setTasks(loadedTasks);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save tasks to Local Storage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) { // Only save if there are tasks to prevent overwriting with empty array initially
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        // If tasks array becomes empty, remove the item from local storage
        localStorage.removeItem('tasks');
    }
  }, [tasks]); // Dependency array ensures this runs whenever 'tasks' changes

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (newTaskText.trim() === '') return; // Don't add empty tasks

    const newTask: Task = {
      id: Date.now(), // Simple unique ID using timestamp
      text: newTaskText,
      completed: false,
      dueDate: null, // Initialize new properties
      priority: null, // Initialize new properties
    };

    setTasks([...tasks, newTask]);
    setNewTaskText(''); // Clear the input field
  };

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    // If the task being toggled is also being edited, cancel the edit
    if (id === editingTaskId) {
        handleCancelEdit();
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
     // If the task being deleted is also being edited, cancel the edit
    if (id === editingTaskId) {
        handleCancelEdit();
    }
  };

  // --- Edit Functions ---
  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
    setEditDueDate(task.dueDate || ''); // Set to empty string if null
    setEditPriority(task.priority || ''); // Set to empty string if null
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditText('');
    setEditDueDate('');
    setEditPriority('');
  };

  const handleSaveEdit = (id: number) => {
    if (editText.trim() === '') {
        // Optional: Prevent saving empty task text, maybe delete instead?
        // For now, just cancel edit if text is empty
        handleCancelEdit();
        return;
    }
    setTasks(tasks.map(task =>
      task.id === id
        ? {
            ...task,
            text: editText.trim(),
            dueDate: editDueDate || null, // Store null if empty string
            priority: editPriority || null, // Store null if empty string
          }
        : task
    ));
    handleCancelEdit(); // Exit edit mode
  };
  // --- End Edit Functions ---


  // Helper to format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + 'T00:00:00'); // Add time part to avoid timezone issues
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch (e) {
      return ''; // Handle invalid date string gracefully
    }
  };

  // Helper for priority styling
  const getPriorityClass = (priority: Priority | null) => {
    switch (priority) {
      case 'High': return 'text-red-600 dark:text-red-400 font-semibold';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 font-semibold';
      case 'Low': return 'text-blue-600 dark:text-blue-400 font-semibold';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  // --- NEW: Sorting Logic ---
  const sortedTasks = [...tasks].sort((a, b) => {
    let compareA: any;
    let compareB: any;
    let directionMultiplier = sortDirection === 'asc' ? 1 : -1;

    switch (sortKey) {
      case 'dueDate':
        // Handle null dates - place them at the end when ascending, beginning when descending
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : (sortDirection === 'asc' ? Infinity : -Infinity);
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : (sortDirection === 'asc' ? Infinity : -Infinity);
        compareA = dateA;
        compareB = dateB;
        break;
      case 'priority':
        compareA = getPriorityValue(a.priority);
        compareB = getPriorityValue(b.priority);
        break;
      case 'id': // Creation date (default)
      default:
        compareA = a.id;
        compareB = b.id;
        break;
    }

    if (compareA < compareB) {
      return -1 * directionMultiplier;
    }
    if (compareA > compareB) {
      return 1 * directionMultiplier;
    }
    return 0; // a and b are equal
  });
  // --- END NEW ---

  return (
    <main className="relative overflow-hidden flex min-h-screen flex-col items-center p-6 md:p-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* --- NEW: Background Shape Elements --- */}
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>
      {/* --- END NEW --- */}

      <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100">My To-Do List</h1>

      {/* Form to add new tasks */}
      <form onSubmit={handleAddTask} className="mb-8 w-full max-w-xl flex shadow-sm rounded-md">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center transition-colors"
          aria-label="Add task"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Sorting Controls */}
      <div className="w-full max-w-xl mb-5 flex justify-end gap-3 items-center">
        <label htmlFor="sort-key" className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</label>
        <select
          id="sort-key"
          value={sortKey}
          onChange={(e) => {
              const newKey = e.target.value as 'id' | 'dueDate' | 'priority';
              setSortKey(newKey);
              // Default to descending for priority, ascending for others
              setSortDirection(newKey === 'priority' ? 'desc' : 'asc');
          }}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm shadow-sm"
        >
          <option value="id">Creation Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
        <select
          id="sort-direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm shadow-sm"
          aria-label="Sort direction"
        >
          <option value="asc">{sortKey === 'priority' ? 'Low to High' : 'Ascending'}</option>
          <option value="desc">{sortKey === 'priority' ? 'High to Low' : 'Descending'}</option>
        </select>
      </div>

      {/* List of tasks */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks yet! Add one above.</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTasks.map((task, index) => (
              <li
                key={task.id}
                className={`py-4 px-2 transition-colors duration-150 ease-in-out ${
                  task.completed
                    ? 'bg-green-50/50 dark:bg-green-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/60'
                } ${
                  index > 0 ? '' : '' // No border-top needed due to divide-y
                }`}
              >
                {editingTaskId === task.id ? (
                  // --- Edit Mode ---
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                       <div className="flex-1">
                         <label htmlFor={`dueDate-${task.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                         <input
                           type="date"
                           id={`dueDate-${task.id}`}
                           value={editDueDate}
                           onChange={(e) => setEditDueDate(e.target.value)}
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
                         />
                       </div>
                       <div className="flex-1">
                         <label htmlFor={`priority-${task.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                         <select
                           id={`priority-${task.id}`}
                           value={editPriority}
                           onChange={(e) => setEditPriority(e.target.value as Priority | '')}
                           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
                         >
                           <option value="">None</option>
                           <option value="Low">Low</option>
                           <option value="Medium">Medium</option>
                           <option value="High">High</option>
                         </select>
                       </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => handleSaveEdit(task.id)}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                        aria-label="Save changes"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
                        aria-label="Cancel edit"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  // --- View Mode ---
                  <div className="flex items-center gap-4">
                     <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600 dark:ring-offset-gray-800 cursor-pointer"
                      />
                    <div className="flex-grow cursor-pointer group" onClick={() => handleStartEdit(task)}>
                      <span
                        id={`task-label-${task.id}`}
                        className={`text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${task.completed ? 'line-through text-gray-500 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400' : ''}`}
                      >
                        {task.text}
                      </span>
                      <div className="text-xs mt-1 flex items-center gap-3 text-gray-500 dark:text-gray-400">
                         {task.dueDate && (
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                {formatDate(task.dueDate)}
                            </span>
                         )}
                         {task.priority && (
                            <span className={`${getPriorityClass(task.priority)} flex items-center gap-1`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                {task.priority}
                            </span>
                         )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStartEdit(task); }}
                          className="p-1.5 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
                          aria-label={`Edit task: ${task.text}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
                          className="p-1.5 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded hover:bg-red-100 dark:hover:bg-gray-700 transition-colors"
                          aria-label={`Delete task: ${task.text}`}
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
