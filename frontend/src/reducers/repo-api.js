import {
  POST_REPOAPI_TRACK_INIT,
  POST_REPOAPI_TRACK_FAILED,
  POST_REPOAPI_TRACK_SUCCESS,
} from '../actions/types';

const initialState = {
  loadingRepo: false,
  errors: []
};

function repoApiReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_REPOAPI_TRACK_SUCCESS: {
      return {
        ...state,
        loadingRepo: false,
      };
    }
    case POST_REPOAPI_TRACK_FAILED: {
      return {
        ...state,
        loadingRepo: false,
      };
    }
    case POST_REPOAPI_TRACK_INIT: {
      return {
        ...state,
        loadingRepo: true,
      };
    }
    default:
      return state;
  }
}

export default repoApiReducer;
