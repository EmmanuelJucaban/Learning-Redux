var redux = require('redux');

console.log('Yee');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type){
    case 'CHANGE_NAME':
    // State is not an object anymore
      return action.name;
    default:
      return state;
  }
};

var hobbiesReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          title: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id);
    default:
      return state;
  }
}

var moviesReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter( (movie) => movie.id !== action.id);
    default:
      return state;
  }
};
var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


// Gets called every time the state CHANGE_SEARCH_TEXT
// Subscribe to changes
var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log('name is ', state.name);
  document.getElementById('app').innerHTML = state.name;
  console.log("New state", store.getState());
});
// unsubscribe()

var currentState = store.getState();
console.log('Current state', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emmanuel'
});


store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Harry Potter',
  genre: 'Adventure'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Fight Club',
  genre: 'Action'
});


store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});
