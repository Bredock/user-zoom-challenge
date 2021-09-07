import {
  GET_GITAPI_ORG_SUCCESS,
  GET_GITAPI_REPO_LIST_SUCCESS,
  GET_GITAPI_COMMIT_LIST_SUCCESS,
  INIT_LOADING,
  END_LOADING,
} from '../actions/types';

const initialState = {
  loading: false,
  orgInfo: {},
  repoList: [],
  commitList: [],
  selectedRepo: {},
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
        loading: false,
      };
    }
    case GET_GITAPI_COMMIT_LIST_SUCCESS: {
      return {
        ...state,
        commitList: payload.commits,
        selectedRepo: payload.repo,
        loading: false,
      };
    }
    case INIT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case END_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default githubApiReducer;
