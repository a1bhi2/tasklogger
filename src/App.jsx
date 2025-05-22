// src/App.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Button, Container, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, IconButton, Paper, Divider, ToggleButton, ToggleButtonGroup, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Chip, Fade, Tooltip, Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import StarIcon from '@mui/icons-material/Star';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import SummarySection from './components/SummarySection';
import Greeting from './components/Greeting';
import useTasks from './hooks/useTasks';
import useThemeMode from './hooks/useThemeMode';

// --- Icon Components (Copy these from your existing App.jsx) ---
// const CalendarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days mr-2 h-5 w-5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg> );
// const ListChecksIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-checks mr-2 h-5 w-5"><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" /><path d="M13 6h8" /><path d="M13 12h8" /><path d="M13 18h8" /></svg> );
// const PlusCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle mr-2 h-5 w-5"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="16" /><line x1="8" x2="16" y1="12" y2="12" /></svg> );
// const SparklesIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles mr-2 h-5 w-5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1-1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg> );
// const SettingsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings mr-2 h-5 w-5"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 .25 1l-.01.43a2 2 0 0 1-1.73 1L2 12.22v.44a2 2 0 0 0-2 2v-.18a2 2 0 0 1-1-1.73l.43-.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73-.73l-.22-.38a2 2 0 0 0 .73-2.73l-.15-.1a2 2 0 0 1-.25-1l.01-.43a2 2 0 0 1 1.73-1L12 2Z"/><circle cx="12" cy="12" r="3"/></svg>);
// const SaveIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save mr-2 h-5 w-5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>);


function App() {
    const [allTasks, setAllTasks] = useState([]);
    const [displayedTasks, setDisplayedTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('daily');
    const [loading, setLoading] = useState(true);

    const [geminiApiKey, setGeminiApiKey] = useState('');
    const [inputApiKey, setInputApiKey] = useState('');
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const [apiKeyMessage, setApiKeyMessage] = useState('');

    const [geminiSummary, setGeminiSummary] = useState('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [geminiError, setGeminiError] = useState(null);

    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [menuAnchor, setMenuAnchor] = useState(null);
    const taskInputRef = useRef(null);
    const [completedTaskIds, setCompletedTaskIds] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
    const [themeMode, setThemeMode] = useState('light');
    const [deletedTask, setDeletedTask] = useState(null);
    const [greeting, setGreeting] = useState('');

    // Load tasks and API key from chrome.storage.local
    useEffect(() => {
        chrome.storage.local.get(['tasks', 'geminiApiKey'], (result) => {
            if (chrome.runtime.lastError) {
                console.error("Error loading from chrome.storage:", chrome.runtime.lastError);
                setLoading(false);
                return;
            }
            const loadedTasks = result.tasks ? result.tasks.map(task => ({...task, createdAt: new Date(task.createdAt)})) : [];
            setAllTasks(loadedTasks);
            
            const storedApiKey = result.geminiApiKey || '';
            setGeminiApiKey(storedApiKey);
            setInputApiKey(storedApiKey); // Pre-fill input if key exists
            if (!storedApiKey) {
                setShowApiKeyModal(true); // Prompt for API key if not found
            }
            setLoading(false);
        });
    }, []);

    // Save tasks to chrome.storage.local whenever allTasks changes
    useEffect(() => {
        if (!loading) { // Avoid saving during initial load
            chrome.storage.local.set({ tasks: allTasks.map(task => ({...task, createdAt: task.createdAt.toISOString()})) }, () => {
                 if (chrome.runtime.lastError) {
                    console.error("Error saving tasks to chrome.storage:", chrome.runtime.lastError);
                } else {
                    console.log("Tasks saved to chrome.storage");
                }
            });
        }
    }, [allTasks, loading]);

    // Load completedTaskIds from chrome.storage.local
    useEffect(() => {
      chrome.storage.local.get(['completedTaskIds'], (result) => {
        if (result.completedTaskIds) setCompletedTaskIds(result.completedTaskIds);
      });
    }, []);

    // Save completedTaskIds to chrome.storage.local whenever it changes
    useEffect(() => {
      chrome.storage.local.set({ completedTaskIds });
    }, [completedTaskIds]);

    const handleSaveApiKey = () => {
        if (!inputApiKey.trim()) {
            setApiKeyMessage({ text: 'API Key cannot be empty.', type: 'error' });
            return;
        }
        chrome.storage.local.set({ geminiApiKey: inputApiKey.trim() }, () => {
            if (chrome.runtime.lastError) {
                setApiKeyMessage({ text: `Error saving API Key: ${chrome.runtime.lastError.message}`, type: 'error' });
            } else {
                setGeminiApiKey(inputApiKey.trim());
                setApiKeyMessage({ text: 'API Key saved successfully!', type: 'success' });
                setTimeout(() => {
                    setShowApiKeyModal(false);
                    setApiKeyMessage('');
                }, 1500);
            }
        });
    };

    const handleToggleComplete = (taskId) => {
        setCompletedTaskIds(prev => {
            const updated = prev.includes(taskId)
              ? prev.filter(id => id !== taskId)
              : [...prev, taskId];
            return updated;
          });
    };

    // --- Date Helper Functions ---
    const getStartOfDay = (date) => { const start = new Date(date); start.setHours(0, 0, 0, 0); return start; };
    const getEndOfDay = (date) => { const end = new Date(date); end.setHours(23, 59, 59, 999); return end; };
    const getStartOfWeek = (date) => { const start = new Date(date); const day = start.getDay(); const diff = start.getDate() - day + (day === 0 ? -6 : 1); start.setDate(diff); start.setHours(0, 0, 0, 0); return start; };
    const getEndOfWeek = (date) => { const currentSelectedDate = new Date(date); const startOfWeekDate = getStartOfWeek(currentSelectedDate); const end = new Date(startOfWeekDate); end.setDate(startOfWeekDate.getDate() + 6); end.setHours(23, 59, 59, 999); return end; };

    // --- Filter and Sort Tasks ---
    useEffect(() => {
        if (loading) return; // Don't filter until initial load is complete

        let filtered = [];
        if (viewMode === 'daily') {
            const start = getStartOfDay(selectedDate);
            const end = getEndOfDay(selectedDate);
            filtered = allTasks.filter(task => task.createdAt >= start && task.createdAt <= end);
        } else { // weekly
            const start = getStartOfWeek(selectedDate);
            const end = getEndOfWeek(selectedDate);
            filtered = allTasks.filter(task => task.createdAt >= start && task.createdAt <= end);
        }
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        setDisplayedTasks(filtered);
        setGeminiSummary('');
        setGeminiError(null);
    }, [allTasks, selectedDate, viewMode, loading]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const newTaskObject = { id: crypto.randomUUID(), text: newTask.trim(), createdAt: new Date() };
        setAllTasks(prevTasks => [...prevTasks, newTaskObject]);
        setNewTask('');
        setSnackbar({ open: true, message: 'Task added!', severity: 'success' });
        setTimeout(() => {
            const el = document.getElementById(`task-${newTaskObject.id}`);
            if (el) el.classList.add('highlight-task');
            setTimeout(() => el && el.classList.remove('highlight-task'), 1200);
        }, 100);
    };

    const handleDateChange = (e) => {
        setSelectedDate(new Date(e.target.value));
    };

    const formatDate = (dateObj) => new Date(dateObj).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formatTaskTimestamp = (dateObj) => new Date(dateObj).toLocaleString();
    const getWeekDisplay = (date) => `Week of ${getStartOfWeek(date).toLocaleDateString()} - ${getEndOfWeek(date).toLocaleDateString()}`;

    // --- Gemini API: Generate Enhanced Summary ---
    const handleGenerateEnhancedSummary = async () => {
        if (!geminiApiKey) {
            setGeminiError("Gemini API Key is not set. Please set it in the options.");
            setShowApiKeyModal(true);
            return;
        }
        if (displayedTasks.length === 0) {
            setGeminiError("No tasks to summarize.");
            return;
        }

        setIsGeneratingSummary(true);
        setGeminiSummary('');
        setGeminiError(null);

        const taskTexts = displayedTasks.map(task => task.text).join("\n- ");
        const periodType = viewMode === 'daily' ? `on ${formatDate(selectedDate)}` : `for the week of ${getWeekDisplay(selectedDate)}`;
        const prompt = `Provide a brief, insightful summary of the following tasks completed ${periodType}. Focus on key accomplishments and potential themes if any:\n- ${taskTexts}`;

        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            // const apiKey = geminiApiKey; // Use the stored API key
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API request failed: ${errorData?.error?.message || response.statusText}`);
            }
            const result = await response.json();
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                setGeminiSummary(result.candidates[0].content.parts[0].text);
            } else {
                throw new Error("Failed to parse summary from API response.");
            }
        } catch (error) {
            setGeminiError(error.message);
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const handleDeleteTask = (id) => {
      const task = allTasks.find(t => t.id === id);
      setDeletedTask(task);
      setAllTasks(prev => prev.filter(task => task.id !== id));
      setSnackbar({ open: true, message: 'Task deleted! Undo?', severity: 'info', action: 'undo' });
    };
    const handleUndoDelete = () => {
      if (deletedTask) {
        setAllTasks(prev => [...prev, deletedTask]);
        setDeletedTask(null);
        setSnackbar({ open: true, message: 'Task restored!', severity: 'success' });
      }
    };
    const handleEditTask = (task) => {
      setEditTaskId(task.id);
      setEditTaskText(task.text);
    };
    const handleEditTaskSave = () => {
      if (editTaskId && editTaskText.trim()) {
        setAllTasks(prev => prev.map(task => task.id === editTaskId ? { ...task, text: editTaskText.trim() } : task));
        setSnackbar({ open: true, message: 'Task updated!', severity: 'success' });
      }
      setEditTaskId(null);
      setEditTaskText('');
    };
    const handleEditTaskCancel = () => {
      setEditTaskId(null);
      setEditTaskText('');
    };

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') return;
      setSnackbar({ ...snackbar, open: false });
    };

    // Focus on task input when API key modal opens
    useEffect(() => {
        if (taskInputRef.current) taskInputRef.current.focus();
    }, [showApiKeyModal]);

    // Keyboard accessibility
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') {
                if (editTaskId) handleEditTaskCancel();
                if (showApiKeyModal) setShowApiKeyModal(false);
            }
            if (e.key === 'Enter' && document.activeElement === taskInputRef.current && !editTaskId && !showApiKeyModal) {
                handleAddTask(e);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    });

    // Personalized greeting
    useEffect(() => {
      const hour = new Date().getHours();
      let greet = 'Hello';
      if (hour < 12) greet = 'Good morning';
      else if (hour < 18) greet = 'Good afternoon';
      else greet = 'Good evening';
      setGreeting(`${greet}, Abhishek!`);
    }, []);

    const theme = createTheme({
      palette: {
        mode: themeMode,
        primary: { main: themeMode === 'light' ? '#1976d2' : '#90caf9' },
        background: { default: themeMode === 'light' ? '#f5f5f5' : '#121212' },
      },
      components: {
        MuiButton: { styleOverrides: { root: { transition: 'all 0.2s cubic-bezier(.4,2,.6,1)', boxShadow: 'none' } } },
        MuiIconButton: { styleOverrides: { root: { transition: 'all 0.2s cubic-bezier(.4,2,.6,1)', borderRadius: 12 } } },
        MuiPaper: { styleOverrides: { root: { transition: 'box-shadow 0.2s' } } },
      },
    });

    if (loading && !showApiKeyModal) { // Only show main loading if not prompting for API key
        return (
            <div className="flex items-center justify-center h-screen bg-slate-900 text-slate-100">
                <p>Loading tasks...</p>
            </div>
        );
    }
    
    // Filter displayedTasks based on filter state
    let filteredTasks = displayedTasks;
    if (filter === 'completed') {
      filteredTasks = displayedTasks.filter(task => completedTaskIds.includes(task.id));
    } else if (filter === 'active') {
      // Show all active tasks (not completed) for all dates, sorted by date descending
      filteredTasks = allTasks.filter(task => !completedTaskIds.includes(task.id));
      filteredTasks.sort((a, b) => b.createdAt - a.createdAt);
    }
    // For 'all', keep displayedTasks as is (filtered by date/viewMode)

    const handleExportTasks = () => {
      const exportData = allTasks.map(task => {
        const status = completedTaskIds.includes(task.id) ? 'Completed' : 'Active';
        return `Task: ${task.text}\nDate: ${formatTaskTimestamp(task.createdAt)}\nStatus: ${status}`;
      }).join('\n\n');
      navigator.clipboard.writeText(exportData);
      setSnackbar({ open: true, message: 'All tasks copied to clipboard!', severity: 'success' });
    };

    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs" sx={{ bgcolor: 'background.default', minHeight: 600, width: 400, p: 2, borderRadius: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', transition: 'background 0.3s' }}>
          <Header
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            onExport={handleExportTasks}
            menuAnchor={menuAnchor}
            onOpenMenu={e => setMenuAnchor(e.currentTarget)}
            onCloseMenu={() => setMenuAnchor(null)}
            onShowApiKey={() => { setShowApiKeyModal(true); setMenuAnchor(null); }}
            onAbout={() => { window.open('https://github.com/', '_blank'); setMenuAnchor(null); }}
          />
          <Greeting />
          <TaskInput value={newTask} onChange={e => setNewTask(e.target.value)} onAdd={handleAddTask} />
          <TaskFilters
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            filter={filter}
            setFilter={setFilter}
          />
          <TaskList
            tasks={filteredTasks}
            completedTaskIds={completedTaskIds}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            loading={loading}
          />
          <SummarySection
            viewMode={viewMode}
            selectedDate={selectedDate}
            displayedTasks={displayedTasks}
            geminiApiKey={geminiApiKey}
            isGeneratingSummary={isGeneratingSummary}
            geminiError={geminiError}
            geminiSummary={geminiSummary}
            onGenerateSummary={handleGenerateEnhancedSummary}
          />
          <Dialog open={showApiKeyModal} onClose={() => setShowApiKeyModal(false)}>
              <DialogTitle>Gemini API Key Required</DialogTitle>
              <DialogContent>
                  <Typography variant="body2" mb={1}>Enter your Gemini API Key to enable summaries.</Typography>
                  <TextField
                      label="Gemini API Key"
                      type="password"
                      value={inputApiKey}
                      onChange={e => setInputApiKey(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                  />
                  {apiKeyMessage && <Alert severity={apiKeyMessage.type === 'success' ? 'success' : 'error'}>{apiKeyMessage.text}</Alert>}
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => setShowApiKeyModal(false)} color="inherit">Close</Button>
                  <Button onClick={handleSaveApiKey} variant="contained" color="primary" startIcon={<SaveIcon />}>Save Key</Button>
              </DialogActions>
          </Dialog>
          <Dialog open={!!editTaskId} onClose={handleEditTaskCancel} maxWidth="xs" fullWidth>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Task"
                type="text"
                fullWidth
                value={editTaskText}
                onChange={e => setEditTaskText(e.target.value)}
                inputProps={{ maxLength: 200 }}
                sx={{ mt: 1 }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleEditTaskSave();
                  if (e.key === 'Escape') handleEditTaskCancel();
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditTaskCancel} color="inherit">Cancel</Button>
              <Button onClick={handleEditTaskSave} variant="contained" color="primary" disabled={!editTaskText.trim()}>Save</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={snackbar.action === 'undo' ? 6000 : 2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              action={snackbar.action === 'undo' ? (
                <Button color="inherit" size="small" onClick={handleUndoDelete} sx={{ fontWeight: 700 }}>
                  Undo
                </Button>
              ) : null}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          <Box mt={2} textAlign="center">
              <Typography variant="caption" color="text.secondary">Task Logger Extension &copy; {new Date().getFullYear()}</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

export default App;