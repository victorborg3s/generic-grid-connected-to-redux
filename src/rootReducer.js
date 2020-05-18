import { combineReducers } from 'redux';
import { reducer as footballerReducer } from './footballer';
import { reducer as userReducer } from './user';

const entities = combineReducers({
  footballer: footballerReducer,
  user: userReducer,
});

/*
const ui = combineReducers({
});
*/

const rootReducer = combineReducers({
  entities,
  // ui,
});

export default rootReducer;