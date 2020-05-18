const crudActionBuilder = (prefix, fakeData) => {
  const ADD = `${prefix}_ADD`;
  const REMOVE = `${prefix}_REMOVE`;
  const UPDATE = `${prefix}_UPDATE`;
  const LOAD = `${prefix}_LOAD`;
  const DATA_WAIT = `${prefix}_DATA_WAIT`;
  const DATA_ERROR = `${prefix}_DATA_ERROR`;

  const load = (entities) => ({ type: LOAD, entities });
  const add = (entity) => ({ type: ADD, entity });
  const remove = (entity) => ({ type: REMOVE, entity });
  const update = (entity) => ({ type: UPDATE, entity });
  const dataWait = () => ({ type: DATA_WAIT });
  const dataError = () => ({ type: DATA_ERROR });


  const simulateFetchFromApi = async () => {
    return new Promise((resolve, reject) => {
      (new Promise((ready) => setTimeout(ready, 3000)))
        .then(() => resolve(fakeData))
        .catch((err) => reject(err));
    });
  };

  const fetch = () => {
    return (dispatch) => new Promise((resolve, reject) => {
      dispatch(dataWait());
      simulateFetchFromApi()
        .then((data) => {
          dispatch(load(data));
          resolve(data);
        })
        .catch((err) => {
          dispatch(dataError());
          reject(err);
        });
    });
  };

  return {
    ADD,
    REMOVE,
    UPDATE,
    LOAD,
    DATA_WAIT,
    DATA_ERROR,
    
    load,
    add,
    remove,
    update,
    dataWait,
    dataError,
    
    fetch,
  }
};

export default crudActionBuilder;
