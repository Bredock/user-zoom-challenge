import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_GITAPI_ORG_SUCCESS,
  GET_GITAPI_REPO_LIST_SUCCESS,
  GET_GITAPI_COMMIT_LIST_SUCCESS,
  INIT_LOADING,
  END_LOADING,
} from './types';

const githubApiUrl = 'https://api.github.com/';

export const getGithubOrg =
  ({ org }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: INIT_LOADING,
      });
      const res = await axios.get(`${githubApiUrl}orgs/${org}`);

      dispatch({
        type: GET_GITAPI_ORG_SUCCESS,
        payload: res.data,
      });
      dispatch(getGithubOrgRepos({ org }));
    } catch (error) {
      dispatch(setAlert(error.message, 'danger'));
      dispatch({
        type: END_LOADING,
      });
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
          description: repo.description,
          stars: repo.stargazers_count,
          issues: repo.open_issues,
        };
      });

      dispatch({
        type: GET_GITAPI_REPO_LIST_SUCCESS,
        payload: filteredRes,
      });
    } catch (error) {
      dispatch(setAlert(error.message, 'danger'));
      dispatch({
        type: END_LOADING,
      });
    }
  };

export const getGithubRepoCommits =
  ({ org, repo }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: INIT_LOADING,
      });

      const res = await axios.get(
        `${githubApiUrl}repos/${org}/${repo.name}/commits`
      );

      dispatch({
        type: GET_GITAPI_COMMIT_LIST_SUCCESS,
        payload: {
          repo: repo,
          commits: res.data,
        },
      });
    } catch (error) {
      dispatch(setAlert(error.message, 'danger'));
      dispatch({
        type: END_LOADING,
      });
    }
  };
