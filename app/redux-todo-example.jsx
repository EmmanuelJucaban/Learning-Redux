var redux = require('redux');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todo: []
};


var reducer = (state = stateDefault, action) => {
  switch(action.type){
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};

var store = redux.createStore(reducer);

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: "New Search Text"
};

console.log("current state", store.getState());
store.dispatch(action)

console.log('Search text should be new', store.getState());
