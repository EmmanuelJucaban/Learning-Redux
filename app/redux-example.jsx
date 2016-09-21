var redux = require('redux');

console.log('Yee');


var reducer = (state = {name: 'Anonymous'}, action) => {
  console.log(action);

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


var store = redux.createStore(reducer);

var currentState = store.getState();

console.log(currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emmanuel'
});


console.log("Name should be Emmanuel", store.getState());
