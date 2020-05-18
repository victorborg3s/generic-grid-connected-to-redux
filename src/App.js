import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { actions as userActions } from './user';
import { actions as footballerActions } from './footballer';

function App({ userData, userDataStatus, footballerData, footballerDataStatus, fetchUsers, fetchFootballer }) {
  useEffect(
    () => {
      if (userDataStatus === 0) {
        fetchUsers();
      }
      if (footballerDataStatus === 0) {
        fetchFootballer();
      }
    },
    [fetchFootballer, fetchUsers, footballerDataStatus, userDataStatus]
  );

  return (
    <div className="App">
      Users:<br/>
      {
        userData.map((user) => `${user}, `)
      }
      <br/><br/>
      Footballers:<br/>
      {
        footballerData.map((footballer) => `${footballer}, `)
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.entities.user.allIds,
  userDataStatus: state.entities.user.status,
  footballerData: state.entities.footballer.allIds,
  footballerDataStatus: state.entities.footballer.status,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(userActions.fetch()),
  fetchFootballer: () => dispatch(footballerActions.fetch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
