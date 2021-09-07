import { combineReducers } from 'redux';
import alert from './alert';
import githubApi from './github-api';
import repoApi from './repo-api';

export default combineReducers({alert, githubApi, repoApi});
