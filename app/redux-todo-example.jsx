var redux = require('redux');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todo: []
};


var reducer = (state = stateDefault, action) => {
  return state;
}

var store = redux.createStore(reducer);




console.log("current state", store.getState());
