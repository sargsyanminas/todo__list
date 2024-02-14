export const addTask = task => ({
  type: 'ADD_TASK',
  payload: task,
});

export const editTask = (id, updatedTask) => ({
  type: 'EDIT_TASK',
  payload: {
    id,
    updatedTask,
  },
});

export const deleteTask = taskId => ({
  type: 'DELETE_TASK',
  payload: {
    taskId,
  },
});
