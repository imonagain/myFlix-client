import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

// visibilityFilter and movies - two functions called reducers 
// that takes a state and an action and if it's concerned by
// the action, it changes the state

// each reducer only cares about what it's responsible for

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default: return state;
    }
}

function moviesApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
    }
}


export default moviesApp;