import axios from 'axios';
import { setAlert } from './alert';
import {
  POST_REPOAPI_TRACK_INIT,
  POST_REPOAPI_TRACK_FAILED,
  POST_REPOAPI_TRACK_SUCCESS,
} from './types';

export const trackRepo =
  ({ repo, commits }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_REPOAPI_TRACK_INIT,
      });

      console.log('Repo info -> ', repo);
      console.log('Commits -> ', commits);

      const body = {
        name: repo.name,
        repoIdentifier: repo.id,
        description: repo.description,
        lastUpdated: repo.updated_at,
        viewers: repo.watchers,
        stars: repo.stars,
        issues: repo.issues,
        commitHistory: '',
      };

      const res = await axios.post(`http://localhost:5000/api/repos`, body);

      dispatch({
        type: POST_REPOAPI_TRACK_SUCCESS,
      });
      dispatch(setAlert('Repo tracked successfully', 'success'));
    } catch (error) {
      console.log('Errors traking repo -> ', error.response.data);
      const errorMessages = error.response.data.errors;
      errorMessages &&
        errorMessages.length > 0 &&
        errorMessages.map((err) => {
          dispatch(setAlert(err.msg, 'danger'));
        });
      dispatch({
        type: POST_REPOAPI_TRACK_FAILED,
      });
    }
  };