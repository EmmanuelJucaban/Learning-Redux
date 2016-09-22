var redux = require('redux');
var axios = require('axios');

console.log('Yee');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();
//
//
// var stateDefault = {
//   name: 'Anonymous',
//   hobbies: [],
//   movies: []
// };

// Gets called every time the state CHANGE_SEARCH_TEXT
// Subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();

  console.log('New state', store.getState());

  if (state.map.isFetching){
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a target="blank" href="' + state.map.url + '">View your location';
  }
});
// unsubscribe()

var currentState = store.getState();
console.log('Current state', currentState);


store.dispatch(actions.fetchLocation());


store.dispatch(actions.changeName('Emmanuel'));


store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.addHobby('Walking'));
store.dispatch(actions.removeHobby(2));


store.dispatch(actions.addMovie('Harry Potter', 'Adventure'));
store.dispatch(actions.addMovie('Fight Club', 'Action'));
store.dispatch(actions.removeMovie(2));
