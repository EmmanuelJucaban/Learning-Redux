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

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


store.subscribe( () => {
  var state = store.getState();
  console.log("Current search is ", state.searchText)
  document.getElementById('app').innerHTML = state.searchText;
});


store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: "New Search Text"
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: "Cat"
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: "Dog"
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: "Mouse"
});
