import {legacy_createStore as createStore} from 'redux';
import tasksReducer from '../store/reducers/index.js';

const store = createStore(tasksReducer);

export default store;
