var redux = require('redux');
var axios = require('axios');

console.log('Yee');


var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};


// Name reducer and action generators
// ----------------------------------


var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type){
    case 'CHANGE_NAME':
    // State is not an object anymore
      return action.name;
    default:
      return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  };
};


// Hobby reducer and action generators
// ----------------------------------

var nextHobbyId = 1;
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

var addHobby = (title) => {
  return {
    type: 'ADD_HOBBY',
    title
  };
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  };
};

// Movie reducer and movie generators
// ----------------------------------
var nextMovieId = 1;
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

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  };
};


var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
};


// Map reducer and action generators
// ----------------------------------

var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch(action.type){
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};


var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH',
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res){
    var loc = res.data.loc;
    var baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  });
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


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


fetchLocation();


store.dispatch(changeName('Emmanuel'));


store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));


store.dispatch(addMovie('Harry Potter', 'Adventure'));
store.dispatch(addMovie('Fight Club', 'Action'));
store.dispatch(removeMovie(2));
