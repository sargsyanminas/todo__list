import {combineReducers} from 'redux';

import tasksReducer from './task_items';

export default combineReducers({
  tasksReducer,
});
