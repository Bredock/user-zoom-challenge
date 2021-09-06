import { combineReducers } from 'redux';
import alert from './alert';
import githubApi from './github-api';

export default combineReducers({alert, githubApi});
