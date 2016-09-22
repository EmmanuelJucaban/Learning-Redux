var redux = require('redux');

console.log('Yee');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state = stateDefault, action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ]
      };
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby) => { return hobby.id !== action.id})
      }
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter( (movie) => { return movie.id !== action.id} )
      }
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
  hobby: 'Hiking'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: "CHANGE_NAME",
  name: 'Manny'
});


store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Matrix',
  genre: 'Action'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Terminator',
  genre: 'Action'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});
