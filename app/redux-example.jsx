var redux = require('redux');

console.log('Yee');

var reducer = (state = {name: 'Anonymous'}, action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


// Gets called every time the state CHANGE_SEARCH_TEXT
// Subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log('name is ', state.name);
  document.getElementById('app').innerHTML = state.name;
});
// unsubscribe()

var currentState = store.getState();
console.log('Current state', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emmanuel'
});

store.dispatch({
  type: "CHANGE_NAME",
  name: 'Manny'
});
