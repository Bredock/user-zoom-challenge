import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CustomSpinner from '../components/CustomSpinner';
import { trackRepo } from '../actions/repo-api';

import './Details.css';

const Details = ({ orgInfo, loading, loadingRepo, commitList, selectedRepo, trackRepo }) => {
  let history = useHistory();

  if (!orgInfo || Object.keys(orgInfo).length === 0) {
    history.push('/');
  }

  const filterLongText = (text) => {
    if (text.length <= 200) {
      return text;
    } else {
      return text.substring(0, 145) + ' (...)';
    }
  };

  const onTrackRepo = () => {
    trackRepo({ repo: selectedRepo, commits: commitList });
  };

  const commitListElement =
    (commitList !== null &&
      commitList.length > 0 &&
      commitList.map((commit) => {
        return (
          <div className='commit-element' key={commit.sha}>
            <div>
              <img
                src={commit.author.avatar_url}
                className='commit-image'
                alt='commit'
              />
            </div>
            <div className='commit-info'>
              <p>
                <strong>Message: </strong>{' '}
                {filterLongText(commit.commit.message)}
              </p>
              <p>
                <strong>Sha: </strong> {commit.sha}
              </p>
              <p>
                <strong>Author: </strong>{' '}
                {commit.author.login}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                {commit.author.email}
              </p>
              <p>
                <strong>Date: </strong>{' '}
                {commit.commit.committer.date}
              </p>
            </div>
          </div>
        );
      })) ||
    '';
  return (loading || loadingRepo) ? (
    <CustomSpinner />
  ) : (
    <div className='Details'>
      <Card>
        <Card.Body>
          <div className='row'>
            <div className='col-md-3'>
              <img src={orgInfo.avatar_url} className='repo-image' alt='repo' />
            </div>
            <div className='col-md-9'>
              <div className='org-info-wrapper'>
                <p>
                  <strong>Organization: </strong> {orgInfo.name}
                </p>
                <p>
                  <strong>Repositorie: </strong> {selectedRepo.name}
                </p>
                <p>
                  <strong>Description: </strong> {selectedRepo.description}
                </p>
                <p>
                  <strong>Last Updated: </strong>
                  {new Date(selectedRepo.updated_at).toLocaleString()}
                </p>
              </div>
              <div className='info-footer'>
                <div className='icons-wrapper'>
                  <i className='pi pi-star footer-icon'></i>{' '}
                  {selectedRepo.stars}
                  <i className='pi pi-share-alt footer-icon'></i>{' '}
                  {selectedRepo.forks}
                  <i className='pi pi-bell footer-icon'></i>{' '}
                  {selectedRepo.issues}
                </div>
                <Button
                  variant='primary'
                  id='track-button'
                  onClick={onTrackRepo}
                >
                  Track Repo
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      {commitListElement}
    </div>
  );
};

Details.propTypes = {
  orgInfo: PropTypes.object,
  commitList: PropTypes.array,
  selectedRepo: PropTypes.object,
  loading: PropTypes.bool,
  trackRepo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orgInfo: state.githubApi.orgInfo,
  commitList: state.githubApi.commitList,
  selectedRepo: state.githubApi.selectedRepo,
  loading: state.githubApi.loading,
  loadingRepo: state.repoApi.loadingRepo,
});

export default connect(mapStateToProps, { trackRepo })(Details);
