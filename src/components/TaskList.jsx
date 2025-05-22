import React from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Chip, Fade, TextField, Button, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskList = ({
  tasks,
  completedTaskIds,
  onToggleComplete,
  onDelete,
  onEdit,
  loading
}) => (
  <TransitionGroup>
    {tasks.length === 0 ? (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
        <Typography color="text.secondary" align="center">No tasks for this filter.<br/>Try another filter or add a task!</Typography>
      </Box>
    ) : (
      <Box sx={{ maxHeight: 250, overflow: 'auto', mb: 1 }}>
        <TransitionGroup>
          {tasks.map((task, idx) => (
            <CSSTransition key={task.id} timeout={400} classNames="task-anim">
              <Accordion id={`task-${task.id}`} sx={{ mb: 1, borderRadius: 2, boxShadow: 2, bgcolor: idx % 2 === 0 ? '#e3f2fd' : '#fffde7', transition: 'background 0.2s', width: '100%' }} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ alignItems: 'center', width: '100%' }}>
                  <IconButton size="small" onClick={e => { e.stopPropagation(); onToggleComplete(task.id); }} sx={{ mr: 2 }}>
                    {completedTaskIds.includes(task.id)
                      ? <AssignmentTurnedInIcon sx={{ color: 'green' }} />
                      : <AssignmentTurnedInIcon sx={{ color: '#1976d2' }} />}
                  </IconButton>
                  <Box flexGrow={1} display="flex" alignItems="center">
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ color: completedTaskIds.includes(task.id) ? 'grey.500' : '#263238', wordBreak: 'break-word', textDecoration: completedTaskIds.includes(task.id) ? 'line-through' : 'none', transition: 'color 0.2s', width: '100%' }}
                    >
                      {task.text}
                    </Typography>
                  </Box>
                  <Box className="quick-actions" sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton size="small" color="primary" onClick={e => { e.stopPropagation(); onEdit(task); }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton size="small" color="error" onClick={e => { e.stopPropagation(); onDelete(task.id); }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <b>Logged:</b> {new Date(task.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
                    (Expand for details or future actions)
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Box>
    )}
  </TransitionGroup>
);

export default TaskList;
