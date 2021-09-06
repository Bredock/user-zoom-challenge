import {
  GET_GITAPI_ORG_SUCCESS,
  GET_GITAPI_REPO_LIST_SUCCESS,
  GET_GITAPI_COMMIT_LIST_SUCCESS
} from '../actions/types';

const initialState = {
  loading: true,
  orgInfo: {},
  repoList: [],
  commitList: []
};

function githubApiReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GITAPI_ORG_SUCCESS: {
      return {
        ...state,
        orgInfo: payload,
      };
    }
    case GET_GITAPI_REPO_LIST_SUCCESS: {
      return {
        ...state,
        repoList: payload,
      };
    }
    case GET_GITAPI_COMMIT_LIST_SUCCESS: {
      return {
        ...state,
        commitList: payload
      }
    }
    default:
      return state;
  }
}

export default githubApiReducer;
