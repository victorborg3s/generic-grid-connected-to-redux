import { combineReducers } from 'redux';

const crudReducerBuilder = (actions) => {
  
  function addId(state, action) {
    const { id } = action.entity;
    return state.concat(id);
  }
  
  function removeId(state, action) {
    const { id } = action.entity;
    const index = state.indexOf(id);
    state.splice(index, 1);
    return state;
  }
  
  function loadIds(state, action) {
    const { entities } = action;
    return entities.map((entity) => entity.id);
  }
  
  function addEntry(state, action) {
    const { entity } = action;
    return {
      ...state,
      [entity.id]: entity,
    };
  }
  
  function removeEntry(state, action) {
    const { entity } = action;
    return {
      ...state,
      [entity.id]: undefined,
    };
  }
  
  function updateEntry(state, action) {
    const { entity } = action;
    return {
      ...state,
      [entity.id]: {
        ...state[entity.id],
        ...entity,
      },
    };
  }
  
  function loadEntries(state, action) {
    const newState = {};
    console.log(action);
    action.entities.forEach((entity) => {
      newState[entity.id] = entity;
    });
    return newState;
  }
  
  function allIds(state = [], action) {
    switch (action.type) {
    case actions.ADD: {
      return addId(state, action);
    }
    case actions.REMOVE: {
      return removeId(state, action);
    }
    case actions.LOAD: {
      return loadIds(state, action);
    }
    default: return state;
    }
  }
  
  function byId(state = {}, action) {
    switch (action.type) {
    case actions.ADD: {
      return addEntry(state, action);
    }
    case actions.REMOVE: {
      return removeEntry(state, action);
    }
    case actions.UPDATE: {
      return updateEntry(state, action);
    }
    case actions.LOAD: {
      return loadEntries(state, action);
    }
    default: return state;
    }
  }
  
  function dataStatus(state = 0, action) {
    switch (action.type) {
    case actions.DATA_WAIT: {
      return 1;
    }
    case actions.DATA_ERROR: {
      return -1;
    }
    case actions.LOAD: {
      return 2;
    }
    default: return state;
    }
  }
  
  return combineReducers({
    status: dataStatus,
    byId,
    allIds,
  });
};

export default crudReducerBuilder;
