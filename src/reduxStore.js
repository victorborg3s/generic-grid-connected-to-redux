import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const appKeyStore = 'apisdesk-ticket-ui-store';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(appKeyStore);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(appKeyStore, serializedState);
  } catch (err) {
    console.log(err);
  }
};

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk),
);

store.subscribe(() => saveState(store.getState()));

export default store;
