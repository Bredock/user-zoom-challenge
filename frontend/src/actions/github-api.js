import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_GITAPI_ORG_SUCCESS,
  GET_GITAPI_REPO_LIST_SUCCESS,
  GET_GITAPI_COMMIT_LIST_SUCCESS,
} from './types';

const githubApiUrl = 'https://api.github.com/';

export const getGithubOrg =
  ({ org }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`${githubApiUrl}orgs/${org}`);

      dispatch({
        type: GET_GITAPI_ORG_SUCCESS,
        payload: res.data,
      });
      dispatch(getGithubOrgRepos({ org }));
    } catch (error) {
      dispatch(setAlert(error.message, 'danger'));
    }
  };

export const getGithubOrgRepos =
  ({ org, perPage = 10, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${githubApiUrl}orgs/${org}/repos?per_page=${perPage}&page=${page}&sort=updated`
      );

      const filteredRes = res.data.map((repo) => {
        return {
          name: repo.name,
          updated_at: repo.updated_at,
          language: repo.language,
          watchers: repo.watchers,
          forks: repo.forks,
        };
      });

      dispatch({
        type: GET_GITAPI_REPO_LIST_SUCCESS,
        payload: filteredRes,
      });
    } catch (error) {
      dispatch(setAlert(error.message, 'danger'));
    }
  };

export const getGithubRepoCommits =
  ({ org, repo }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${githubApiUrl}repos/${org}/${repo}/commits`
      );

      dispatch({
        type: GET_GITAPI_COMMIT_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(setAlert(error.message, 'danger'));
    }
  };
