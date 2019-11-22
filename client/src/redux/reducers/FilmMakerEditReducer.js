// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  filmmaker: {}
};

// Reducer
export default function FilmMakerEditReducer(state = initialState, action) {
  switch (action.type) { 
    
    // Insert here your custom reducers


    // START REDUCERS
    case types.CREATE_FILMMAKER_SUCCESS:
      return { ...state, filmmaker: action.payload };
    case types.FINDBYFILMMAKER_FILM_SUCCESS:
      return { ...state, listFilm: action.payload };
    case types.GET_FILMMAKER_SUCCESS:
      return { ...state, filmmaker: action.payload };
    case types.UPDATE_FILMMAKER_SUCCESS:
      return { ...state, filmmaker: action.payload };
     // END REDUCERS
    
    default:
      return state;
  }
}