// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  actor: {}
};

// Reducer
export default function ActorEditReducer(state = initialState, action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
    case types.FINDBYCAST_FILM_SUCCESS:
      return { ...state, listFilm: action.payload };
    case types.GET_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
    case types.UPDATE_ACTOR_SUCCESS:
      return { ...state, actor: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}